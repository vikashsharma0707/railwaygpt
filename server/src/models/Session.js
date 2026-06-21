const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  refreshTokenHash: { type: String, index: true },
  ip: String,
  userAgent: String,
  device: String,
  expiresAt: { type: Date, index: true },
  revoked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
