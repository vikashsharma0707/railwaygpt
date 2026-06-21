const mongoose = require('mongoose');
const { NOTIFICATION_TYPES } = require('../constants');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  type: { type: String, enum: NOTIFICATION_TYPES, default: 'booking' },
  title: String,
  message: String,
  data: mongoose.Schema.Types.Mixed,
  isRead: { type: Boolean, default: false },
  isGlobal: { type: Boolean, default: false },
  priority: { type: String, enum: ['low','medium','high','critical'], default: 'medium' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
