const router = require('express').Router();
const { protect } = require('../middleware/auth');
const seatService = require('../services/seat.service');

router.get('/availability/:trainId', protect, async (req, res) => {
  const data = await seatService.getSeatAvailability(req.params.trainId, 45);
  apiResponse(res, data);
});

module.exports = router;