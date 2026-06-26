const router = require('express').Router();
const { protect } = require('../middleware/auth');
const predictionController = require('../controllers/prediction.controller');

router.post('/waitlist-predict', protect, predictionController.predictWaitlist);

module.exports = router;