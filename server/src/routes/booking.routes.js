const r = require('express').Router();
const c = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const validate = require('../middleware/validate');
const v = require('../validators');

r.post('/', protect, validate(v.bookingSchema), c.create);
r.get('/mine', protect, c.mine);
r.get('/pnr/:pnr', c.byPNR);
r.get('/:id', protect, c.byId);
r.post('/:id/cancel', protect, c.cancel);
r.get('/:id/ticket.pdf', protect, c.ticketPDF);
r.get('/', protect, requireRole('admin'), c.listAll);

module.exports = r;
