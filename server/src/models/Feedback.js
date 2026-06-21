const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  message: String,
  category: { type: String, enum: ['bug','feature','support','other'], default: 'other' },
  status: { type: String, enum: ['open','in-progress','resolved','closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
