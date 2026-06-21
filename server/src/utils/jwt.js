const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');

exports.signAccess = (payload) =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES });

exports.signRefresh = (payload) =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES });

exports.verifyAccess = (token) => jwt.verify(token, env.JWT_ACCESS_SECRET);
exports.verifyRefresh = (token) => jwt.verify(token, env.JWT_REFRESH_SECRET);

exports.hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
