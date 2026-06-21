const r = require('express').Router();
const c = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

r.use(protect, requireRole('admin'));
r.get('/dashboard', c.dashboard);
r.get('/analytics', c.analytics);
r.get('/users', c.users);
r.put('/users/:id', c.updateUser);
r.post('/users/:id/block', c.blockUser);
r.post('/users/:id/unblock', c.unblockUser);
r.get('/audit-logs', c.auditLogs);
r.get('/agent-logs', c.agentLogs);

module.exports = r;
