// const crypto = require('crypto');
// const razorpay = require('../config/razorpay');
// const env = require('../config/env');
// const { Payment, Booking } = require('../models');
// const ApiError = require('../utils/ApiError');
// const bookingService = require('./booking.service');
// const ticketService = require('./ticket.service');

// exports.createOrder = async (userId, bookingId) => {
//   const b = await Booking.findById(bookingId);
//   if (!b) throw new ApiError(404, 'Booking not found');
//   if (String(b.user) !== String(userId)) throw new ApiError(403, 'Forbidden');

//   const order = await razorpay.orders.create({
//     amount: b.totalAmount * 100,
//     currency: 'INR',
//     receipt: `bk_${b._id}`,
//     notes: { bookingId: String(b._id), pnr: b.pnr },
//   });
//   const payment = await Payment.create({
//     user: userId, booking: b._id,
//     orderId: order.id, amount: b.totalAmount, currency: 'INR', status: 'created', raw: order,
//   });
//   return { order, payment, keyId: env.RAZORPAY_KEY_ID };
// };

// exports.verify = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId }) => {
//   const expected = crypto
//     .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest('hex');
//   if (expected !== razorpay_signature) throw new ApiError(400, 'Invalid payment signature');

//   const payment = await Payment.findOneAndUpdate(
//     { orderId: razorpay_order_id },
//     { paymentId: razorpay_payment_id, signature: razorpay_signature, status: 'paid' },
//     { new: true }
//   );
//   if (!payment) throw new ApiError(404, 'Payment not found');

//   const booking = await bookingService.confirm(bookingId, payment._id);
//   const ticket = await ticketService.issue(booking);
//   return { payment, booking, ticket };
// };

// exports.webhook = async (body, signature) => {
//   const expected = crypto.createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET).update(body).digest('hex');
//   if (expected !== signature) throw new ApiError(400, 'Invalid webhook signature');
//   const evt = JSON.parse(body);
//   if (evt.event === 'payment.failed') {
//     const orderId = evt?.payload?.payment?.entity?.order_id;
//     await Payment.findOneAndUpdate({ orderId }, { status: 'failed', failureReason: evt?.payload?.payment?.entity?.error_description });
//   }
//   return { ok: true };
// };

// exports.refund = async (paymentId) => {
//   const p = await Payment.findById(paymentId);
//   if (!p) throw new ApiError(404, 'Payment not found');
//   const refund = await razorpay.payments.refund(p.paymentId, { amount: p.amount * 100 });
//   p.status = 'refunded'; p.refundId = refund.id; p.refundAmount = p.amount; p.refundStatus = refund.status;
//   await p.save();
//   return p;
// };

// exports.list = (q = {}) => Payment.find(q).sort('-createdAt').populate('user booking');
// exports.byUser = (userId) => Payment.find({ user: userId }).sort('-createdAt').populate('booking');






const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const env = require('../config/env');
const { Payment, Booking } = require('../models');
const ApiError = require('../utils/ApiError');
const bookingService = require('./booking.service');

exports.createOrder = async (userId, bookingId) => {
  if (!bookingId) throw new ApiError(400, 'Booking ID is required');

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, 'Booking not found');

  if (String(booking.user) !== String(userId)) {
    throw new ApiError(403, 'You can only pay for your own booking');
  }

  if (booking.status === 'confirmed') {
    throw new ApiError(400, 'Booking is already confirmed');
  }

  // Create Razorpay Order
  const order = await razorpay.orders.create({
    amount: booking.totalAmount * 100,   // paise mein
    currency: 'INR',
    receipt: `bk_${booking._id}`,
    notes: { 
      bookingId: String(booking._id), 
      pnr: booking.pnr 
    },
  });

  // Save Payment Record
  const payment = await Payment.create({
    user: userId,
    booking: booking._id,
    orderId: order.id,
    amount: booking.totalAmount,
    currency: 'INR',
    status: 'created',
    raw: order,
  });

  return {
    order,
    payment,
    keyId: env.RAZORPAY_KEY_ID
  };
};

exports.verify = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId }) => {
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, 'Invalid payment response');
  }

  // Verify Signature
  const expectedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, 'Invalid payment signature');
  }

  // Update Payment
  const payment = await Payment.findOneAndUpdate(
    { orderId: razorpay_order_id },
    { 
      paymentId: razorpay_payment_id, 
      signature: razorpay_signature, 
      status: 'paid' 
    },
    { new: true }
  );

  if (!payment) throw new ApiError(404, 'Payment record not found');

  // Confirm Booking
  const booking = await bookingService.confirm(bookingId, payment._id);

  return { payment, booking };
};

exports.webhook = async (body, signature) => {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new ApiError(400, 'Invalid webhook signature');
    }

    const event = JSON.parse(body);

    if (event.event === 'payment.failed') {
      const orderId = event?.payload?.payment?.entity?.order_id;
      if (orderId) {
        await Payment.findOneAndUpdate(
          { orderId }, 
          { status: 'failed', failureReason: event?.payload?.payment?.entity?.error_description }
        );
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Webhook Error:', error);
    return { success: false };
  }
};

exports.refund = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new ApiError(404, 'Payment not found');

  const refund = await razorpay.payments.refund(payment.paymentId, {
    amount: payment.amount * 100,
  });

  payment.status = 'refunded';
  payment.refundId = refund.id;
  payment.refundAmount = payment.amount;
  payment.refundStatus = refund.status;
  await payment.save();

  return payment;
};

exports.byUser = (userId) => 
  Payment.find({ user: userId }).sort('-createdAt').populate('booking');

exports.list = (query = {}) => 
  Payment.find(query).sort('-createdAt').populate('user booking');