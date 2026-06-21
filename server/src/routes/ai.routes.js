const r = require('express').Router();
const c = require('../controllers/ai.controller');
const { protect, optionalAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validators');
const { aiLimiter } = require('../middleware/rateLimit');

r.get('/agents', c.agents);
r.post('/chat', aiLimiter, optionalAuth, validate(v.chatSchema), c.send);
r.post('/chat/stream', aiLimiter, optionalAuth, validate(v.chatSchema), c.stream);
r.get('/conversations', protect, c.conversations);
r.get('/conversations/:id', protect, c.conversation);
r.delete('/conversations/:id', protect, c.deleteConversation);

module.exports = r;
