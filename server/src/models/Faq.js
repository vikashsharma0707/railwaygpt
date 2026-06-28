const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  category: {
    type: String,
    enum: ['booking', 'payment', 'cancellation', 'pnr', 'tatkal', 'general'],
    default: 'general',
  },
  tags:     [String],
  isActive: { type: Boolean, default: true },
  addedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

faqSchema.index({ question: 'text', answer: 'text' });
faqSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('FAQ', faqSchema);