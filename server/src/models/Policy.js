const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  title:    { type: String, required: true },
  category: {
    type: String,
    enum: ['refund', 'tatkal', 'concession', 'pnr', 'booking', 'general'],
    default: 'general',
  },
  content:  { type: String, required: true },
  tags:     [String],
  isActive: { type: Boolean, default: true },
  addedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

policySchema.index({ title: 'text', content: 'text', tags: 'text' });
policySchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Policy', policySchema);