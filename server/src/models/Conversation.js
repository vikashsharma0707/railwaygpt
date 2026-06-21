const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['system','user','assistant','tool'], required: true },
  content: String,
  toolCalls: mongoose.Schema.Types.Mixed,
  toolCallId: String,
  name: String,
  agent: String,
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const conversationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  title: { type: String, default: 'New Chat' },
  messages: [messageSchema],
  agent: { type: String, default: 'railway-master' },
  metadata: mongoose.Schema.Types.Mixed,
  archived: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
