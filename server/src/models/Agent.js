const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: String,
  category: String,
  description: String,
  systemPrompt: String,
  model: String,
  enabled: { type: Boolean, default: true },
  promptVersion: { type: Number, default: 1 },
  promptHistory: [{ version: Number, prompt: String, updatedAt: Date, updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  retryPolicy: { maxRetries: { type: Number, default: 2 }, backoffMs: { type: Number, default: 500 } },
  fallbackAgent: String,
  requiresHumanApproval: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
