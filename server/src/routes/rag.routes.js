const router = require('express').Router();
const c      = require('../controllers/rag.controller');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post  ('/ask',                          c.ask);
router.get   ('/conversations',                c.listConversations);
router.get   ('/conversations/:sessionId',     c.getConversation);
router.delete('/conversations/:sessionId',     c.deleteConversation);

module.exports = router;