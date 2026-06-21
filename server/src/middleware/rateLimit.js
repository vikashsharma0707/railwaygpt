const rateLimit = require('express-rate-limit');
const env = require('../config/env');

exports.globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts. Try later.' },
});

exports.aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});
