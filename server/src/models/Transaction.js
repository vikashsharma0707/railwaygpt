const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  type: { type: String, enum: ['debit','credit','refund'], required: true },
  amount: Number,
  balanceAfter: Number,
  description: String,
  meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
