const r = require('express').Router();
const c = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

r.get('/', protect, c.list);
r.put('/:id/read', protect, c.markRead);
r.post('/broadcast', protect, requireRole('admin'), c.broadcast);

module.exports = r;
