// const asyncHandler = require('../utils/asyncHandler');
// const apiResponse = require('../utils/ApiResponse');
// const paymentService = require('../services/payment.service');
// const notif = require('../services/notification.service');

// exports.createOrder = asyncHandler(async (req, res) => {
//   const out = await paymentService.createOrder(req.user._id, req.body.bookingId);
//   apiResponse(res, out, 'Order created');
// });

// exports.verify = asyncHandler(async (req, res) => {
//   const out = await paymentService.verify(req.body);
//   notif.create({
//     user: req.user._id, type: 'payment',
//     title: 'Payment successful', message: `PNR ${out.booking.pnr} confirmed.`,
//   });
//   apiResponse(res, out, 'Payment verified');
// });

// exports.webhook = asyncHandler(async (req, res) => {
//   const signature = req.headers['x-razorpay-signature'];
//   const out = await paymentService.webhook(req.rawBody || JSON.stringify(req.body), signature);
//   res.json(out);
// });

// exports.refund = asyncHandler(async (req, res) => apiResponse(res, await paymentService.refund(req.params.id), 'Refunded'));
// exports.mine = asyncHandler(async (req, res) => apiResponse(res, await paymentService.byUser(req.user._id)));
// exports.list = asyncHandler(async (req, res) => apiResponse(res, await paymentService.list()));



const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/ApiResponse');
const paymentService = require('../services/payment.service');
const notif = require('../services/notification.service');

exports.createOrder = asyncHandler(async (req, res) => {
  const result = await paymentService.createOrder(req.user._id, req.body.bookingId);
  apiResponse(res, result, 'Payment order created successfully');
});

exports.verify = asyncHandler(async (req, res) => {
  const result = await paymentService.verify(req.body);
  
  notif.create({
    user: req.user._id,
    type: 'payment',
    title: 'Payment Successful',
    message: `PNR ${result.booking.pnr} has been confirmed.`,
  });

  apiResponse(res, result, 'Payment verified and booking confirmed');
});

exports.webhook = asyncHandler(async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const result = await paymentService.webhook(req.rawBody || JSON.stringify(req.body), signature);
  res.json(result);
});

exports.mine = asyncHandler(async (req, res) => {
  const payments = await paymentService.byUser(req.user._id);
  apiResponse(res, payments);
});

exports.list = asyncHandler(async (req, res) => {
  const payments = await paymentService.list();
  apiResponse(res, payments);
});

exports.refund = asyncHandler(async (req, res) => {
  const result = await paymentService.refund(req.params.id);
  apiResponse(res, result, 'Refund processed');
});