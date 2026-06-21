const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  actorRole: String,
  action: { type: String, index: true },
  resource: String,
  resourceId: String,
  ip: String,
  userAgent: String,
  metadata: mongoose.Schema.Types.Mixed,
  severity: { type: String, enum: ['info','warning','critical'], default: 'info' },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditSchema);
