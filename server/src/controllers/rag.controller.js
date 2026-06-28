const asyncHandler      = require('../utils/asyncHandler');
const ApiResponse       = require('../utils/ApiResponse');
const ApiError          = require('../utils/ApiError');
const ragPipeline       = require('../services/rag/ragPipeline');
const { RagConversation } = require('../models/RagChunk');
const { v4: uuidv4 }   = require('uuid');

// ── POST /api/rag/ask ─────────────────────────────────────────────────────────
exports.ask = asyncHandler(async (req, res) => {
  const { query, sessionId } = req.body;
  if (!query?.trim()) throw new ApiError(400, 'Query is required');

  const result = await ragPipeline.ask({
    query,
    sessionId: sessionId || uuidv4(),
    userId:    req.user._id,
  });

  ApiResponse(res, result, 'Answer generated');
});

// ── GET /api/rag/conversations ────────────────────────────────────────────────
exports.listConversations = asyncHandler(async (req, res) => {
  const convs = await RagConversation.find({ userId: req.user._id })
    .select('sessionId title updatedAt')
    .sort({ updatedAt: -1 })
    .lean();
  ApiResponse(res, convs, 'Conversations fetched');
});

// ── GET /api/rag/conversations/:sessionId ─────────────────────────────────────
exports.getConversation = asyncHandler(async (req, res) => {
  const conv = await RagConversation.findOne({
    sessionId: req.params.sessionId,
    userId:    req.user._id,
  }).lean();
  if (!conv) throw new ApiError(404, 'Conversation not found');
  ApiResponse(res, conv, 'Conversation fetched');
});

// ── DELETE /api/rag/conversations/:sessionId ──────────────────────────────────
exports.deleteConversation = asyncHandler(async (req, res) => {
  await RagConversation.deleteOne({
    sessionId: req.params.sessionId,
    userId:    req.user._id,
  });
  ApiResponse(res, null, 'Conversation deleted');
});