const ApiError = require('../utils/ApiError');

exports.requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return next(new ApiError(401, 'Not authenticated'));
  if (!roles.includes(req.user.role)) return next(new ApiError(403, 'Forbidden'));
  next();
};
