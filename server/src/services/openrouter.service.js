// const openrouter = require('../config/openrouter');
// const env = require('../config/env');
// const logger = require('../config/logger');

// /**
//  * Chat completion (non-streaming) via OpenRouter.
//  * messages: [{role, content, tool_call_id?, name?}]
//  * tools: OpenAI-style tool schema array
//  */
// exports.chat = async ({ messages, tools, toolChoice = 'auto', model, temperature = 0.4 }) => {
//   const body = {
//     model: model || env.OPENROUTER_MODEL,
//     messages,
//     temperature,
//   };
//   if (tools?.length) { body.tools = tools; body.tool_choice = toolChoice; }
//   const { data } = await openrouter.post('/chat/completions', body);
//   return data;
// };

// /**
//  * Streaming chat. onDelta(chunkText), onToolCall(call), returns final message.
//  */
// exports.streamChat = async ({ messages, tools, model, temperature = 0.4, onDelta, onToolCall }) => {
//   const body = {
//     model: model || env.OPENROUTER_MODEL,
//     messages, temperature, stream: true,
//   };
//   if (tools?.length) { body.tools = tools; body.tool_choice = 'auto'; }

//   const response = await openrouter.post('/chat/completions', body, { responseType: 'stream' });
//   let full = '';
//   const toolCalls = [];
//   await new Promise((resolve, reject) => {
//     let buf = '';
//     response.data.on('data', (chunk) => {
//       buf += chunk.toString();
//       const parts = buf.split('\n');
//       buf = parts.pop();
//       for (const line of parts) {
//         const trimmed = line.trim();
//         if (!trimmed || !trimmed.startsWith('data:')) continue;
//         const payload = trimmed.slice(5).trim();
//         if (payload === '[DONE]') continue;
//         try {
//           const json = JSON.parse(payload);
//           const delta = json.choices?.[0]?.delta;
//           if (delta?.content) { full += delta.content; onDelta?.(delta.content); }
//           if (delta?.tool_calls) {
//             for (const tc of delta.tool_calls) {
//               const idx = tc.index ?? toolCalls.length;
//               toolCalls[idx] = toolCalls[idx] || { id: '', type: 'function', function: { name: '', arguments: '' } };
//               if (tc.id) toolCalls[idx].id = tc.id;
//               if (tc.function?.name) toolCalls[idx].function.name += tc.function.name;
//               if (tc.function?.arguments) toolCalls[idx].function.arguments += tc.function.arguments;
//             }
//           }
//         } catch (e) { logger.debug('Stream parse skip: ' + e.message); }
//       }
//     });
//     response.data.on('end', resolve);
//     response.data.on('error', reject);
//   });
//   if (toolCalls.length) toolCalls.forEach((tc) => onToolCall?.(tc));
//   return { content: full, toolCalls };
// };

// exports.embed = async (input) => {
//   const body = { model: env.OPENROUTER_EMBED_MODEL, input };
//   const { data } = await openrouter.post('/embeddings', body);
//   return data.data.map((d) => d.embedding);
// };


const openrouter = require('../config/openrouter');
const env = require('../config/env');
const logger = require('../config/logger');

/**
 * Chat Completion - Enforced RAG + Low Hallucination
 */
exports.chat = async ({ messages, tools, toolChoice = 'auto', model, temperature = 0.25 }) => {
  // Force low temperature for factual answers
  const body = {
    model: model || env.OPENROUTER_MODEL,
    messages,
    temperature: temperature,        // Low = less creativity
    max_tokens: 800,
    top_p: 0.9,
  };

  if (tools?.length) {
    body.tools = tools;
    body.tool_choice = toolChoice;
  }

  try {
    const { data } = await openrouter.post('/chat/completions', body);
    return data;
  } catch (err) {
    logger.error("OpenRouter Chat Error:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Streaming Chat - Same strict settings
 */
exports.streamChat = async ({ messages, tools, model, temperature = 0.25, onDelta, onToolCall }) => {
  const body = {
    model: model || env.OPENROUTER_MODEL,
    messages,
    temperature,
    max_tokens: 1000,
    stream: true,
  };

  if (tools?.length) {
    body.tools = tools;
    body.tool_choice = 'auto';
  }

  const response = await openrouter.post('/chat/completions', body, { responseType: 'stream' });

  let fullContent = '';
  const toolCalls = [];

  await new Promise((resolve, reject) => {
    let buffer = '';

    response.data.on('data', (chunk) => {
      buffer += chunk.toString();

      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep incomplete line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        const payload = trimmed.slice(5).trim();
        if (payload === '[DONE]') continue;

        try {
          const json = JSON.parse(payload);
          const delta = json.choices?.[0]?.delta;

          if (delta?.content) {
            fullContent += delta.content;
            onDelta?.(delta.content);
          }

          if (delta?.tool_calls) {
            delta.tool_calls.forEach((tc) => {
              const idx = tc.index ?? toolCalls.length;
              toolCalls[idx] = toolCalls[idx] || { id: '', type: 'function', function: { name: '', arguments: '' } };
              if (tc.id) toolCalls[idx].id = tc.id;
              if (tc.function?.name) toolCalls[idx].function.name += tc.function.name;
              if (tc.function?.arguments) toolCalls[idx].function.arguments += tc.function.arguments;
            });
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    });

    response.data.on('end', resolve);
    response.data.on('error', reject);
  });

  if (toolCalls.length) toolCalls.forEach(tc => onToolCall?.(tc));

  return { content: fullContent, toolCalls };
};

/**
 * Embeddings
 */
exports.embed = async (input) => {
  try {
    const body = { 
      model: env.OPENROUTER_EMBED_MODEL, 
      input 
    };
    const { data } = await openrouter.post('/embeddings', body);
    return data.data.map(d => d.embedding);
  } catch (err) {
    logger.error("Embedding Error:", err.message);
    throw err;
  }
};