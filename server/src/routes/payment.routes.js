const r = require('express').Router();
const c = require('../controllers/payment.controller');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const validate = require('../middleware/validate');
const v = require('../validators');

r.post('/order', protect, c.createOrder);
r.post('/verify', protect, validate(v.paymentVerifySchema), c.verify);
r.post('/webhook', c.webhook);
r.get('/mine', protect, c.mine);
r.get('/', protect, requireRole('admin'), c.list);
r.post('/:id/refund', protect, requireRole('admin'), c.refund);

module.exports = r;
