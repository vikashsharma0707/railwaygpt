const crypto = require('crypto');
const { User, Session } = require('../models');
const { signAccess, signRefresh, verifyRefresh, hashToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const { sendMail } = require('../utils/mailer');
const env = require('../config/env');

async function issueTokens(user, req) {
  const access = signAccess({ sub: user._id.toString(), role: user.role });
  const refresh = signRefresh({ sub: user._id.toString() });
  await Session.create({
    user: user._id,
    refreshTokenHash: hashToken(refresh),
    ip: req?.ip, userAgent: req?.headers?.['user-agent'],
    expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
  });
  return { access, refresh };
}

exports.register = async (data, req) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new ApiError(409, 'Email already registered');
  const user = await User.create(data);
  const tokens = await issueTokens(user, req);
  return { user: sanitize(user), ...tokens };
};

exports.login = async ({ email, password }, req) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid credentials');
  if (user.isBlocked) throw new ApiError(403, 'Account blocked');
  const ok = await user.comparePassword(password);
  if (!ok) {
    user.loginAttempts += 1;
    if (user.loginAttempts >= 8) user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    throw new ApiError(401, 'Invalid credentials');
  }
  user.loginAttempts = 0; user.lastLoginAt = new Date();
  await user.save();
  const tokens = await issueTokens(user, req);
  return { user: sanitize(user), ...tokens };
};

exports.refresh = async (refreshToken, req) => {
  if (!refreshToken) throw new ApiError(401, 'No refresh token');
  let decoded;
  try { decoded = verifyRefresh(refreshToken); }
  catch { throw new ApiError(401, 'Invalid refresh token'); }
  const hash = hashToken(refreshToken);
  const session = await Session.findOne({ user: decoded.sub, refreshTokenHash: hash, revoked: false });
  if (!session) throw new ApiError(401, 'Session expired');
  // Rotate
  session.revoked = true; await session.save();
  const user = await User.findById(decoded.sub);
  if (!user || user.isBlocked) throw new ApiError(401, 'Account unavailable');
  const tokens = await issueTokens(user, req);
  return { user: sanitize(user), ...tokens };
};

exports.logout = async (refreshToken) => {
  if (!refreshToken) return;
  const hash = hashToken(refreshToken);
  await Session.updateMany({ refreshTokenHash: hash }, { revoked: true });
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return; // do not reveal
  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = hashToken(token);
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();
  const url = `${env.CLIENT_URL}/reset-password?token=${token}`;
  await sendMail({
    to: email, subject: 'Reset your RailwayGPT password',
    html: `<p>Reset link (valid 1h): <a href="${url}">${url}</a></p>`,
  });
};

exports.resetPassword = async ({ token, password }) => {
  const hash = hashToken(token);
  const user = await User.findOne({ passwordResetToken: hash, passwordResetExpires: { $gt: new Date() } }).select('+password');
  if (!user) throw new ApiError(400, 'Invalid or expired token');
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
};

exports.changePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new ApiError(404, 'User not found');
  const ok = await user.comparePassword(oldPassword);
  if (!ok) throw new ApiError(401, 'Old password incorrect');
  user.password = newPassword;
  await user.save();
};

function sanitize(u) {
  const o = u.toObject(); delete o.password; delete o.passwordResetToken; delete o.passwordResetExpires; delete o.sessions; return o;
}
exports.sanitize = sanitize;
