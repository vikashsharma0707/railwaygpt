const { AuditLog } = require('../models');

exports.log = async (req, { action, resource, resourceId, severity = 'info', metadata }) => {
  try {
    await AuditLog.create({
      actor: req.user?._id,
      actorRole: req.user?.role,
      action, resource, resourceId, severity, metadata,
      ip: req.ip, userAgent: req.headers['user-agent'],
    });
  } catch (_) { /* swallow */ }
};

exports.list = (q = {}) => AuditLog.find(q).sort('-createdAt').limit(500).populate('actor', 'name email role');
