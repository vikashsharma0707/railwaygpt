const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  path: String,
  ocrText: String,
  category: String,
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
