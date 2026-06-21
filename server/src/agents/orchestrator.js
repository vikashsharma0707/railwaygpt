// // const openrouterService = require('../services/openrouter.service');
// // const tools = require('./tools.schema');
// // const executor = require('./tools.executor');
// // const agents = require('./agents.catalog');
// // const { Conversation, AgentLog } = require('../models');

// // /** Run an agent turn end-to-end (tools loop, max 4 hops). */
// // async function runAgent({ conversationId, userMessage, agentKey = 'railway-master', user }) {
// //   const agent = agents.byKey(agentKey);
// //   let convo = conversationId
// //     ? await Conversation.findById(conversationId)
// //     : await Conversation.create({ user: user?._id, title: userMessage.slice(0, 40), agent: agentKey, messages: [] });

// //   convo.messages.push({ role: 'user', content: userMessage });

// //   const systemMessage = { role: 'system', content: agent.prompt };
// //   const history = convo.messages.map(m => {
// //     const base = { role: m.role, content: m.content || '' };
// //     if (m.toolCalls) base.tool_calls = m.toolCalls;
// //     if (m.toolCallId) base.tool_call_id = m.toolCallId;
// //     if (m.name) base.name = m.name;
// //     return base;
// //   });

// //   const startedAt = Date.now();
// //   let messages = [systemMessage, ...history];
// //   let finalContent = '';
// //   let totalToolCalls = [];

// //   for (let hop = 0; hop < 4; hop++) {
// //     const resp = await openrouterService.chat({ messages, tools });
// //     const choice = resp.choices?.[0]?.message;
// //     if (!choice) break;

// //     if (choice.tool_calls?.length) {
// //       messages.push({ role: 'assistant', content: choice.content || '', tool_calls: choice.tool_calls });
// //       convo.messages.push({ role: 'assistant', content: choice.content || '', toolCalls: choice.tool_calls, agent: agentKey });
// //       for (const call of choice.tool_calls) {
// //         const name = call.function?.name;
// //         let args = {};
// //         try { args = JSON.parse(call.function?.arguments || '{}'); } catch (_) {}
// //         let result;
// //         try { result = await executor[name]?.(args, { user }) ?? { error: `Unknown tool: ${name}` }; }
// //         catch (e) { result = { error: e.message }; }
// //         totalToolCalls.push({ name, args, result });
// //         const toolContent = JSON.stringify(result);
// //         messages.push({ role: 'tool', tool_call_id: call.id, name, content: toolContent });
// //         convo.messages.push({ role: 'tool', toolCallId: call.id, name, content: toolContent });
// //       }
// //       continue;
// //     }

// //     finalContent = choice.content || '';
// //     convo.messages.push({ role: 'assistant', content: finalContent, agent: agentKey });
// //     break;
// //   }

// //   await convo.save();
// //   await AgentLog.create({
// //     agent: agentKey, user: user?._id, conversation: convo._id,
// //     input: userMessage, output: finalContent, toolCalls: totalToolCalls,
// //     latencyMs: Date.now() - startedAt, success: true,
// //   });

// //   return { conversation: convo, reply: finalContent, toolCalls: totalToolCalls };
// // }

// // module.exports = { runAgent };



// const openrouterService = require('../services/openrouter.service');
// const tools = require('./tools.schema');
// const executor = require('./tools.executor');
// const agents = require('./agents.catalog');
// const { Conversation, AgentLog } = require('../models');

// /**
//  * Run Agent with Tool Calling + RAG support (max 4 hops)
//  */
// async function runAgent({ conversationId, userMessage, agentKey = 'railway-master', user }) {
//   const agent = agents.byKey(agentKey);

//   // Get or create conversation
//   let conversation = conversationId
//     ? await Conversation.findById(conversationId)
//     : await Conversation.create({
//         user: user?._id,
//         title: userMessage.slice(0, 60),
//         agent: agentKey,
//         messages: []
//       });

//   // Add user message
//   conversation.messages.push({ role: 'user', content: userMessage });

//   const systemPrompt = { role: 'system', content: agent.prompt };

//   const history = conversation.messages.map(m => ({
//     role: m.role,
//     content: m.content || '',
//     ...(m.toolCalls && { tool_calls: m.toolCalls }),
//     ...(m.toolCallId && { tool_call_id: m.toolCallId }),
//     ...(m.name && { name: m.name })
//   }));

//   const startedAt = Date.now();
//   let messages = [systemPrompt, ...history];
//   let finalReply = '';
//   let totalToolCalls = [];

//   // Tool calling loop (max 4 hops)
//   for (let hop = 0; hop < 4; hop++) {
//     try {
//       const response = await openrouterService.chat({
//         messages,
//         tools,
//         temperature: 0.3,        // Low for accuracy
//         max_tokens: 800
//       });

//       const choice = response.choices?.[0]?.message;
//       if (!choice) break;

//       // Assistant replied with content
//       if (choice.content) {
//         finalReply = choice.content;
//         conversation.messages.push({
//           role: 'assistant',
//           content: finalReply,
//           agent: agentKey
//         });
//         break;
//       }

//       // Tool calls
//       if (choice.tool_calls?.length > 0) {
//         conversation.messages.push({
//           role: 'assistant',
//           content: choice.content || '',
//           toolCalls: choice.tool_calls,
//           agent: agentKey
//         });

//         for (const call of choice.tool_calls) {
//           const toolName = call.function?.name;
//           let args = {};
//           try {
//             args = JSON.parse(call.function?.arguments || '{}');
//           } catch (_) {}

//           let result;
//           try {
//             result = await executor[toolName]?.(args, { user }) || { error: `Tool ${toolName} not implemented` };
//           } catch (e) {
//             result = { error: e.message };
//           }

//           totalToolCalls.push({ tool: toolName, args, result });

//           // Add tool response to messages
//           messages.push({
//             role: 'tool',
//             tool_call_id: call.id,
//             name: toolName,
//             content: JSON.stringify(result)
//           });

//           conversation.messages.push({
//             role: 'tool',
//             toolCallId: call.id,
//             name: toolName,
//             content: JSON.stringify(result)
//           });
//         }
//         continue; // Continue loop for next assistant response
//       }

//     } catch (err) {
//       console.error("Agent execution error:", err);
//       finalReply = "Sorry, I'm having trouble processing your request right now.";
//       break;
//     }
//   }

//   // Save conversation
//   await conversation.save();

//   // Log
//   await AgentLog.create({
//     agent: agentKey,
//     user: user?._id,
//     conversation: conversation._id,
//     input: userMessage,
//     output: finalReply,
//     toolCalls: totalToolCalls,
//     latencyMs: Date.now() - startedAt,
//     success: true
//   });

//   return {
//     conversation,
//     reply: finalReply,
//     toolCalls: totalToolCalls
//   };
// }

// module.exports = { runAgent };



const openrouterService = require('../services/openrouter.service');
const tools             = require('./tools.schema');
const executor          = require('./tools.executor');
const agents            = require('./agents.catalog');
const kbService         = require('../services/knowledgeBase.service');
const { Conversation, AgentLog } = require('../models');

const MAX_HOPS = 5; // Max tool-call hops per request

/**
 * Build a strict no-hallucination system prompt.
 * Injects RAG context when available so the agent answers
 * ONLY from the knowledge base — never from training memory.
 */
function buildSystemPrompt(agentPrompt, ragContext = '') {
  const ragSection = ragContext
    ? `\n\n--- KNOWLEDGE BASE CONTEXT (use ONLY this to answer) ---\n${ragContext}\n--- END CONTEXT ---`
    : '';

  return (
    agentPrompt +
    ragSection +
    `\n\nABSOLUTE RULES:
1. NEVER answer from your training knowledge or memory.
2. If a tool is available for the question → call it FIRST, then answer from its result.
3. If RAG context is provided → answer ONLY from that context; cite the source title.
4. If neither a tool result nor RAG context covers the question, reply EXACTLY:
   "Yeh information abhi hamare database mein available nahi hai. Kripya baad mein try karein ya helpline 139 pe call karein."
5. Do NOT guess, estimate, or fabricate train numbers, PNRs, seats, fares, platforms, or schedules.`
  );
}

/**
 * Run a RAG pre-fetch before the agent loop.
 * Returns a formatted string of top chunks, or empty string if nothing relevant found.
 */
async function fetchRagContext(userMessage, agentCategory) {
  // Only RAG-category agents and master agent get RAG context
  const RAG_CATEGORIES = ['rag', 'master', 'trip', 'pnr'];
  if (!RAG_CATEGORIES.includes(agentCategory)) return '';

  try {
    const results = await kbService.hybridSearch(userMessage, 4, 0.38);
    if (!results.length) return '';

    return results
      .map(
        (r, i) =>
          `[${i + 1}] Source: "${r.title}"${r.category ? ` (${r.category})` : ''}\n${r.text}`
      )
      .join('\n\n');
  } catch (err) {
    console.warn('[Orchestrator] RAG fetch failed (non-fatal):', err.message);
    return '';
  }
}

/**
 * Serialize conversation messages into the format expected by the LLM.
 */
function serializeHistory(messages) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content || '',
    ...(m.toolCalls    && { tool_calls:   m.toolCalls }),
    ...(m.toolCallId   && { tool_call_id: m.toolCallId }),
    ...(m.name         && { name:         m.name }),
  }));
}

/**
 * Execute a single tool call safely.
 * Returns the result object (or an error object — never throws).
 */
async function executeTool(toolName, args, context) {
  const fn = executor[toolName];
  if (!fn) {
    console.warn(`[Orchestrator] Tool not implemented: ${toolName}`);
    return { error: `Tool "${toolName}" is not implemented yet.` };
  }
  try {
    const result = await fn(args, context);
    return result ?? { error: 'Tool returned no data.' };
  } catch (err) {
    console.error(`[Orchestrator] Tool "${toolName}" threw:`, err.message);
    return { error: err.message };
  }
}

/**
 * Main agent runner.
 *
 * Flow:
 *  1. Resolve agent config.
 *  2. Load or create Conversation.
 *  3. Pre-fetch RAG context.
 *  4. Tool-calling loop (max MAX_HOPS hops).
 *  5. Persist conversation + agent log.
 *  6. Return { conversation, reply, toolCalls }.
 */
async function runAgent({ conversationId, userMessage, agentKey = 'railway-master', user }) {
  const agent = agents.byKey(agentKey);

  // ── 1. Get or create conversation ────────────────────────────────────────
  let conversation;
  if (conversationId) {
    conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`);
    }
  } else {
    conversation = await Conversation.create({
      user:     user?._id,
      title:    userMessage.slice(0, 60),
      agent:    agentKey,
      messages: [],
    });
  }

  // ── 2. Record the incoming user message ──────────────────────────────────
  conversation.messages.push({ role: 'user', content: userMessage });

  // ── 3. RAG pre-fetch ─────────────────────────────────────────────────────
  const ragContext  = await fetchRagContext(userMessage, agent.category);
  const systemMsg   = {
    role: 'system',
    content: buildSystemPrompt(agent.prompt, ragContext),
  };

  // ── 4. Tool-calling loop ──────────────────────────────────────────────────
  const history      = serializeHistory(conversation.messages);
  let   llmMessages  = [systemMsg, ...history];
  let   finalReply   = '';
  const totalToolCalls = [];
  const startedAt    = Date.now();

  for (let hop = 0; hop < MAX_HOPS; hop++) {
    let choice;

    try {
      // On hop 0: force tool_choice:'auto' so LLM calls a tool immediately
      // instead of asking the user for more details.
      // On subsequent hops (after tool results): let it reply freely.
      const response = await openrouterService.chat({
        messages:    llmMessages,
        tools,
        tool_choice: hop === 0 ? 'auto' : 'auto',
        temperature: 0.15,  // Very low → deterministic, tool-first
        max_tokens:  1200,
      });

      choice = response.choices?.[0]?.message;
      if (!choice) {
        console.warn('[Orchestrator] Empty LLM response at hop', hop);
        break;
      }
    } catch (err) {
      console.error('[Orchestrator] LLM call failed at hop', hop, err.message);
      finalReply =
        'Abhi server se response nahi aa raha. Kripya thodi der baad try karein.';
      break;
    }

    // ── Case A: Plain text reply ─────────────────────────────────────────
    if (choice.content && !choice.tool_calls?.length) {
      finalReply = choice.content;
      conversation.messages.push({
        role:    'assistant',
        content: finalReply,
        agent:   agentKey,
      });
      break;
    }

    // ── Case B: Tool calls ───────────────────────────────────────────────
    if (choice.tool_calls?.length) {
      // Save assistant turn with tool_calls
      conversation.messages.push({
        role:      'assistant',
        content:   choice.content || '',
        toolCalls: choice.tool_calls,
        agent:     agentKey,
      });

      // Push to LLM message list for next hop
      llmMessages.push({
        role:       'assistant',
        content:    choice.content || '',
        tool_calls: choice.tool_calls,
      });

      for (const call of choice.tool_calls) {
        const toolName = call.function?.name;
        let   args     = {};
        try { args = JSON.parse(call.function?.arguments || '{}'); } catch (_) {}

        const result = await executeTool(toolName, args, { user });
        totalToolCalls.push({ tool: toolName, args, result });

        const toolContent = JSON.stringify(result);

        // Add tool result to LLM context
        llmMessages.push({
          role:         'tool',
          tool_call_id: call.id,
          name:         toolName,
          content:      toolContent,
        });

        // Persist in conversation
        conversation.messages.push({
          role:       'tool',
          toolCallId: call.id,
          name:       toolName,
          content:    toolContent,
        });
      }

      // Continue loop so LLM can process tool results
      continue;
    }

    // ── Case C: Neither content nor tool_calls — break ───────────────────
    console.warn('[Orchestrator] LLM returned neither content nor tool_calls at hop', hop);
    break;
  }

  // If loop exhausted without a reply
  if (!finalReply) {
    finalReply =
      'Yeh information abhi hamare database mein available nahi hai. Kripya baad mein try karein ya helpline 139 pe call karein.';
    conversation.messages.push({
      role:    'assistant',
      content: finalReply,
      agent:   agentKey,
    });
  }

  // ── 5. Persist conversation ───────────────────────────────────────────────
  await conversation.save();

  // ── 6. Log ────────────────────────────────────────────────────────────────
  try {
    await AgentLog.create({
      agent:       agentKey,
      user:        user?._id,
      conversation: conversation._id,
      input:       userMessage,
      output:      finalReply,
      toolCalls:   totalToolCalls,
      ragUsed:     Boolean(ragContext),
      latencyMs:   Date.now() - startedAt,
      success:     true,
    });
  } catch (logErr) {
    // Logging failure must never break the user response
    console.error('[Orchestrator] AgentLog write failed:', logErr.message);
  }

  return {
    conversation,
    reply: finalReply,
    toolCalls: totalToolCalls,
  };
}

module.exports = { runAgent };