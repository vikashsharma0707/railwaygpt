const { verifyAccess } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

// const { verifyAccess } = require('../utils/jwt');
// const ApiError = require('../utils/ApiError');
// const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token = null;

    // Check Authorization header (most common)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }

    if (!token) {
      throw new ApiError(401, 'No token provided');
    }

    const decoded = verifyAccess(token);
    const user = await User.findById(decoded.sub);

    if (!user) throw new ApiError(401, 'User not found');
    if (user.isBlocked) throw new ApiError(401, 'Account is blocked');

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, err.message || 'Not authenticated'));
  }
};

exports.optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (token) {
      const decoded = verifyAccess(token);
      const user = await User.findById(decoded.sub);
      if (user && !user.isBlocked) req.user = user;
    }
  } catch (_) { /* ignore */ }
  next();
};
