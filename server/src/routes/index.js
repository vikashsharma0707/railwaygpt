// const r = require('express').Router();

// r.get('/health', (req, res) => res.json({ ok: true, ts: Date.now() }));
// r.use('/auth', require('./auth.routes'));
// r.use('/trains', require('./train.routes'));
// r.use('/bookings', require('./booking.routes'));
// r.use('/payments', require('./payment.routes'));
// r.use('/ai', require('./ai.routes'));
// r.use('/knowledge', require('./knowledge.routes'));
// r.use('/notifications', require('./notification.routes'));
// r.use('/admin', require('./admin.routes'));
// r.use('/knowledge', require('./policy.routes'));
// r.use('/rag',       require('./rag.routes'));
// r.use('/tatkal', require('./tatkal.routes'));

// module.exports = r;



const r = require('express').Router();

r.get('/health', (req, res) => res.json({ ok: true, ts: Date.now() }));
r.use('/auth', require('./auth.routes'));
r.use('/trains', require('./train.routes'));
r.use('/bookings', require('./booking.routes'));
r.use('/payments', require('./payment.routes'));
r.use('/ai', require('./ai.routes'));
r.use('/knowledge', require('./knowledge.routes'));
r.use('/notifications', require('./notification.routes'));
r.use('/admin', require('./admin.routes'));
r.use('/knowledge', require('./policy.routes'));
r.use('/rag',       require('./rag.routes'));
r.use('/tatkal', require('./tatkal.routes'));

module.exports = r;
