// const asyncHandler = require('../utils/asyncHandler');
// const apiResponse = require('../utils/ApiResponse');
// const authService = require('../services/auth.service');

// exports.register = asyncHandler(async (req, res) => {
//   const out = await authService.register(req.body, req);
//   apiResponse(res, out, 'Registered', 201);
// });

// exports.login = asyncHandler(async (req, res) => {
//   const out = await authService.login(req.body, req);
//   apiResponse(res, out, 'Logged in');
// });

// exports.refresh = asyncHandler(async (req, res) => {
//   const token = req.body.refreshToken || req.cookies?.refreshToken;
//   const out = await authService.refresh(token, req);
//   apiResponse(res, out, 'Token refreshed');
// });

// exports.logout = asyncHandler(async (req, res) => {
//   const token = req.body.refreshToken || req.cookies?.refreshToken;
//   await authService.logout(token);
//   apiResponse(res, null, 'Logged out');
// });

// exports.me = asyncHandler(async (req, res) => apiResponse(res, authService.sanitize(req.user)));

// exports.updateProfile = asyncHandler(async (req, res) => {
//   const allowed = ['name', 'phone', 'avatar', 'preferences', 'passengers'];
//   allowed.forEach(k => { if (req.body[k] !== undefined) req.user[k] = req.body[k]; });
//   await req.user.save();
//   apiResponse(res, authService.sanitize(req.user), 'Profile updated');
// });

// exports.forgot = asyncHandler(async (req, res) => {
//   await authService.forgotPassword(req.body.email);
//   apiResponse(res, null, 'If the email exists, a reset link was sent.');
// });

// exports.reset = asyncHandler(async (req, res) => {
//   await authService.resetPassword(req.body);
//   apiResponse(res, null, 'Password reset successful');
// });

// exports.changePassword = asyncHandler(async (req, res) => {
//   await authService.changePassword(req.user._id, req.body);
//   apiResponse(res, null, 'Password changed');
// });








const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

exports.register = asyncHandler(async (req, res) => {
  const out = await authService.register(req.body, req);
  apiResponse(res, out, 'Registered', 201);
});

exports.login = asyncHandler(async (req, res) => {
  const out = await authService.login(req.body, req);
  apiResponse(res, out, 'Logged in');
});

exports.refresh = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies?.refreshToken;
  const out = await authService.refresh(token, req);
  apiResponse(res, out, 'Token refreshed');
});

exports.logout = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies?.refreshToken;
  await authService.logout(token);
  apiResponse(res, null, 'Logged out');
});

exports.me = asyncHandler(async (req, res) => apiResponse(res, authService.sanitize(req.user)));

exports.updateProfile = asyncHandler(async (req, res) => {
  const allowed = ['name', 'phone', 'avatar', 'preferences', 'passengers'];
  allowed.forEach(k => { if (req.body[k] !== undefined) req.user[k] = req.body[k]; });
  await req.user.save();
  apiResponse(res, authService.sanitize(req.user), 'Profile updated');
});

exports.forgot = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  apiResponse(res, null, 'If the email exists, a reset link was sent.');
});

exports.reset = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body);
  apiResponse(res, null, 'Password reset successful');
});

exports.changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user._id, req.body);
  apiResponse(res, null, 'Password changed');
});
