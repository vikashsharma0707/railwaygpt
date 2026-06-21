const Razorpay = require('razorpay');
const env = require('./env');

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: env.RAZORPAY_KEY_SECRET || 'dummy',
});

module.exports = razorpay;
