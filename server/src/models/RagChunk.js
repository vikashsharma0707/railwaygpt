const mongoose = require('mongoose');

// ── RagChunk — one per text chunk extracted from a document ──────────────────
const ragChunkSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'RagDocument', required: true },
  text:       { type: String, required: true },
  pageNumber: { type: Number, default: 1 },
  chunkIndex: { type: Number, required: true },
  tokenCount: { type: Number, default: 0 },
  // Qdrant vector ID — used for deletion
  vectorId:   { type: String },
  // For image/chart chunks
  isImage:    { type: Boolean, default: false },
}, { timestamps: true });

ragChunkSchema.index({ documentId: 1 });

// ── RagConversation — chat history per user session ───────────────────────────
const messageSchema = new mongoose.Schema({
  role:    { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  sources: [{ documentName: String, pageNumber: Number, snippet: String }],
}, { _id: false, timestamps: true });

const ragConversationSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, required: true, unique: true },
  title:     { type: String, default: 'New Conversation' },
  messages:  [messageSchema],
}, { timestamps: true });

ragConversationSchema.index({ userId: 1, updatedAt: -1 });

module.exports = {
  RagChunk:        mongoose.model('RagChunk',        ragChunkSchema),
  RagConversation: mongoose.model('RagConversation', ragConversationSchema),
};