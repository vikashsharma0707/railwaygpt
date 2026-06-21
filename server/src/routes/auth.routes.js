const r = require('express').Router();
const c = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const v = require('../validators');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');

r.post('/register', authLimiter, validate(v.registerSchema), c.register);
r.post('/login', authLimiter, validate(v.loginSchema), c.login);
r.post('/refresh', c.refresh);
r.post('/logout', c.logout);
r.post('/forgot-password', authLimiter, validate(v.forgotSchema), c.forgot);
r.post('/reset-password', authLimiter, validate(v.resetSchema), c.reset);
r.post('/change-password', protect, validate(v.changePasswordSchema), c.changePassword);
r.get('/me', protect, c.me);
r.put('/profile', protect, c.updateProfile);

module.exports = r;
