const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  type: { type: String, enum: ['delay','confirmation','crowd','fare','demand'], required: true, index: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  inputs: mongoose.Schema.Types.Mixed,
  output: mongoose.Schema.Types.Mixed,
  confidence: Number,
  validUntil: Date,
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);
