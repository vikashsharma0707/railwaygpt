/**
 * tatkal.routes.js
 * server/src/routes/tatkal.routes.js
 */

const r = require('express').Router();
const c = require('../controllers/tatkal.controller');
const { protect } = require('../middleware/auth');

// Public — anyone can check availability/window before logging in
r.get('/availability',   c.availability);
r.get('/window-status',  c.windowStatus);

// Protected — booking requires login
r.post('/book', protect, c.book);

module.exports = r;