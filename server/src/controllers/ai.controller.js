// // const asyncHandler = require('../utils/asyncHandler');
// // const apiResponse = require('../utils/ApiResponse');
// // const { runAgent } = require('../agents/orchestrator');
// // const agents = require('../agents/agents.catalog');
// // const { Conversation } = require('../models');
// // const openrouterService = require('../services/openrouter.service');

// // exports.send = asyncHandler(async (req, res) => {
// //   const out = await runAgent({
// //     conversationId: req.body.conversationId,
// //     userMessage: req.body.message,
// //     agentKey: req.body.agent || 'railway-master',
// //     user: req.user,
// //   });
// //   apiResponse(res, {
// //     conversationId: out.conversation._id,
// //     reply: out.reply,
// //     toolCalls: out.toolCalls,
// //     messages: out.conversation.messages,
// //   });
// // });

// // exports.stream = asyncHandler(async (req, res) => {
// //   res.setHeader('Content-Type', 'text/event-stream');
// //   res.setHeader('Cache-Control', 'no-cache');
// //   res.setHeader('Connection', 'keep-alive');
// //   res.flushHeaders?.();

// //   const agent = agents.byKey(req.body.agent || 'railway-master');
// //   const messages = [
// //     { role: 'system', content: agent.prompt },
// //     { role: 'user', content: req.body.message },
// //   ];

// //   try {
// //     await openrouterService.streamChat({
// //       messages,
// //       onDelta: (txt) => res.write(`data: ${JSON.stringify({ delta: txt })}\n\n`),
// //     });
// //     res.write('data: [DONE]\n\n');
// //   } catch (e) {
// //     res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
// //   }
// //   res.end();
// // });

// // exports.conversations = asyncHandler(async (req, res) =>
// //   apiResponse(res, await Conversation.find({ user: req.user._id }).sort('-updatedAt').select('-messages.toolCalls')));

// // exports.conversation = asyncHandler(async (req, res) =>
// //   apiResponse(res, await Conversation.findOne({ _id: req.params.id, user: req.user._id })));

// // exports.deleteConversation = asyncHandler(async (req, res) => {
// //   await Conversation.deleteOne({ _id: req.params.id, user: req.user._id });
// //   apiResponse(res, null, 'Deleted');
// // });

// // exports.agents = asyncHandler(async (req, res) => apiResponse(res, agents));





// const asyncHandler = require('../utils/asyncHandler');
// const apiResponse = require('../utils/ApiResponse');
// const { runAgent } = require('../agents/orchestrator');
// const agents = require('../agents/agents.catalog');
// const { Conversation } = require('../models');

// /**
//  * Send Message (Main Endpoint)
//  */
// exports.send = asyncHandler(async (req, res) => {
//   const { conversationId, message, agent } = req.body;

//   if (!message?.trim()) {
//     return apiResponse(res, null, 'Message is required', 400);
//   }

//   const result = await runAgent({
//     conversationId,
//     userMessage: message,
//     agentKey: agent || 'railway-master',
//     user: req.user,
//   });

//   apiResponse(res, {
//     conversationId: result.conversation._id,
//     reply: result.reply,
//     toolCalls: result.toolCalls,
//     messages: result.conversation.messages,
//   });
// });

// /**
//  * Stream Response (Future Ready)
//  */
// exports.stream = asyncHandler(async (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.flushHeaders?.();

//   const { message, agent = 'railway-master' } = req.body;

//   if (!message?.trim()) {
//     res.write(`data: ${JSON.stringify({ error: 'Message is required' })}\n\n`);
//     return res.end();
//   }

//   try {
//     const agentInfo = agents.byKey(agent);

//     await openrouterService.streamChat({
//       messages: [
//         { role: 'system', content: agentInfo.prompt },
//         { role: 'user', content: message }
//       ],
//       onDelta: (chunk) => {
//         res.write(`data: ${JSON.stringify({ delta: chunk })}\n\n`);
//       }
//     });

//     res.write('data: [DONE]\n\n');
//   } catch (error) {
//     console.error("Streaming Error:", error);
//     res.write(`data: ${JSON.stringify({ error: error.message || 'Streaming failed' })}\n\n`);
//   } finally {
//     res.end();
//   }
// });

// /**
//  * Get All Conversations
//  */
// exports.conversations = asyncHandler(async (req, res) => {
//   const convos = await Conversation.find({ user: req.user._id })
//     .sort('-updatedAt')
//     .select('title agent updatedAt')
//     .lean();

//   apiResponse(res, convos);
// });

// /**
//  * Get Single Conversation
//  */
// exports.conversation = asyncHandler(async (req, res) => {
//   const convo = await Conversation.findOne({
//     _id: req.params.id,
//     user: req.user._id
//   });

//   if (!convo) {
//     return apiResponse(res, null, 'Conversation not found', 404);
//   }

//   apiResponse(res, convo);
// });

// /**
//  * Delete Conversation
//  */
// exports.deleteConversation = asyncHandler(async (req, res) => {
//   const result = await Conversation.deleteOne({
//     _id: req.params.id,
//     user: req.user._id
//   });

//   if (result.deletedCount === 0) {
//     return apiResponse(res, null, 'Conversation not found', 404);
//   }

//   apiResponse(res, null, 'Conversation deleted successfully');
// });

// /**
//  * Get All Available Agents
//  */
// exports.agents = asyncHandler(async (req, res) => {
//   apiResponse(res, agents);
// });




const asyncHandler      = require('../utils/asyncHandler');
const apiResponse       = require('../utils/ApiResponse');
const { runAgent }      = require('../agents/orchestrator');
const agents            = require('../agents/agents.catalog');
const openrouterService = require('../services/openrouter.service'); // ← was missing in stream
const { Conversation }  = require('../models');

/* ─────────────────────────────────────────────────────────────────────────────
   Helper: strip internal tool/system messages before sending to the client.
   The frontend only needs role: user | assistant messages.
───────────────────────────────────────────────────────────────────────────── */
function publicMessages(messages = []) {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: m.content || '' }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/ai/chat
   Body: { message, agent?, conversationId? }
───────────────────────────────────────────────────────────────────────────── */
exports.send = asyncHandler(async (req, res) => {
  const { conversationId, message, agent } = req.body;

  if (!message?.trim()) {
    return apiResponse(res, null, 'Message is required', 400);
  }

  const result = await runAgent({
    conversationId,
    userMessage: message.trim(),
    agentKey:    agent || 'railway-master',
    user:        req.user,
  });

  return apiResponse(res, {
    conversationId: result.conversation._id,
    reply:          result.reply,
    toolCalls:      result.toolCalls,
    // Only expose user + assistant turns to the frontend
    messages:       publicMessages(result.conversation.messages),
  });
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/ai/stream
   Body: { message, agent? }
   Streams SSE deltas back to the client.
───────────────────────────────────────────────────────────────────────────── */
exports.stream = asyncHandler(async (req, res) => {
  // SSE headers
  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.flushHeaders?.();

  const { message, agent = 'railway-master' } = req.body;

  if (!message?.trim()) {
    res.write(`data: ${JSON.stringify({ error: 'Message is required' })}\n\n`);
    return res.end();
  }

  try {
    const agentInfo = agents.byKey(agent);

    await openrouterService.streamChat({
      messages: [
        { role: 'system', content: agentInfo.prompt },
        { role: 'user',   content: message.trim() },
      ],
      onDelta: (chunk) => {
        res.write(`data: ${JSON.stringify({ delta: chunk })}\n\n`);
      },
    });

    res.write('data: [DONE]\n\n');
  } catch (err) {
    console.error('[AI Controller] Streaming error:', err.message);
    res.write(
      `data: ${JSON.stringify({
        error: err.message || 'Streaming failed. Please try again.',
      })}\n\n`
    );
  } finally {
    res.end();
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/ai/conversations
───────────────────────────────────────────────────────────────────────────── */
exports.conversations = asyncHandler(async (req, res) => {
  const convos = await Conversation.find({ user: req.user._id })
    .sort('-updatedAt')
    .select('title agent updatedAt')
    .lean();

  return apiResponse(res, convos);
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/ai/conversations/:id
───────────────────────────────────────────────────────────────────────────── */
exports.conversation = asyncHandler(async (req, res) => {
  const convo = await Conversation.findOne({
    _id:  req.params.id,
    user: req.user._id,
  }).lean();

  if (!convo) {
    return apiResponse(res, null, 'Conversation not found', 404);
  }

  // Return only public-facing messages
  return apiResponse(res, {
    ...convo,
    messages: publicMessages(convo.messages),
  });
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/ai/conversations/:id
───────────────────────────────────────────────────────────────────────────── */
exports.deleteConversation = asyncHandler(async (req, res) => {
  const result = await Conversation.deleteOne({
    _id:  req.params.id,
    user: req.user._id,
  });

  if (result.deletedCount === 0) {
    return apiResponse(res, null, 'Conversation not found', 404);
  }

  return apiResponse(res, null, 'Conversation deleted successfully');
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/ai/agents
   Returns the full agents catalog (key, name, category only — no prompts).
───────────────────────────────────────────────────────────────────────────── */
exports.agents = asyncHandler(async (req, res) => {
  // Never expose system prompts to the client
  const safe = agents.map(({ key, name, category }) => ({ key, name, category }));
  return apiResponse(res, safe);
});