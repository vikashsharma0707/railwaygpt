const mongoose = require('mongoose');

const embeddingSchema = new mongoose.Schema({
  knowledge: { type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeBase', index: true },
  chunkIndex: Number,
  text: { type: String, required: true },
  vector: { type: [Number], required: true }, // dense vector
  tokens: Number,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

embeddingSchema.index({ text: 'text' });

module.exports = mongoose.model('Embedding', embeddingSchema);
