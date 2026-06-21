const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['faq','policy','rule','document','manual'], default: 'document' },
  content: { type: String, required: true },
  tags: [String],
  version: { type: Number, default: 1 },
  source: String,
  sourceUrl: String,
  expiresAt: Date,
  isActive: { type: Boolean, default: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

knowledgeSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('KnowledgeBase', knowledgeSchema);
