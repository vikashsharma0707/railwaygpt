const mongoose = require('mongoose');
const { PAYMENT_STATUS } = require('../constants');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', index: true },
  orderId: { type: String, required: true, unique: true },
  paymentId: String,
  signature: String,
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: PAYMENT_STATUS, default: 'created', index: true },
  paymentMethod: String,
  refundId: String,
  refundStatus: String,
  refundAmount: Number,
  failureReason: String,
  raw: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
