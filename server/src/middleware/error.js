const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

// 404
exports.notFound = (req, res, next) => next(new ApiError(404, `Route not found: ${req.originalUrl}`));

// Global error
exports.errorHandler = (err, req, res, next) => { // eslint-disable-line
  const status = err.statusCode || err.status || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal server error',
    ...(err.details ? { details: err.details } : {}),
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
  };
  if (status >= 500) logger.error(err);
  res.status(status).json(payload);
};
