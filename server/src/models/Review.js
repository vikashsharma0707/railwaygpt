const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  helpful: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
