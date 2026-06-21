const mongoose = require('mongoose');

const agentLogSchema = new mongoose.Schema({
  agent: { type: String, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  input: mongoose.Schema.Types.Mixed,
  output: mongoose.Schema.Types.Mixed,
  toolCalls: mongoose.Schema.Types.Mixed,
  latencyMs: Number,
  tokensIn: Number,
  tokensOut: Number,
  success: { type: Boolean, default: true },
  error: String,
}, { timestamps: true });

module.exports = mongoose.model('AgentLog', agentLogSchema);
