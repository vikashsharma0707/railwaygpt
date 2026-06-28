/**
 * ragPipeline.js
 * server/src/services/rag/ragPipeline.js
 */

const OpenAI        = require('openai');
const fileProcessor = require('./fileProcessor');
const chunker       = require('./chunker');
const bm25          = require('./bm25');

const RagDocument = require('../../models/RagDocument');

// ── FIXED IMPORTS — destructure correctly ─────────────────────────────────────
const { RagChunk, RagConversation } = require('../../models/RagChunk');

const Policy = require('../../models/Policy');
const FAQ    = require('../../models/FAQ');
const { v4: uuidv4 } = require('uuid');

const openai = new OpenAI({ apiKey: process.env.OPENROUTER_API_KEY });

// Optional: Qdrant vector store
let embedder    = null;
let vectorStore = null;
try {
  embedder    = require('./embedder');
  vectorStore = require('./vectorStore');
  console.log('[RAG] Vector store (Qdrant) loaded');
} catch (_) {
  console.warn('[RAG] Qdrant not available — using MongoDB + BM25 only');
}

// Optional: Cohere reranker
let cohereClient = null;
try {
  if (process.env.COHERE_API_KEY) {
    const { CohereClient } = require('cohere-ai');
    cohereClient = new CohereClient({ token: process.env.COHERE_API_KEY });
  }
} catch (_) {}

// ─────────────────────────────────────────────────────────────────────────────
// SEARCH — MongoDB + BM25 (Qdrant optional)
// ─────────────────────────────────────────────────────────────────────────────
async function searchAll(query) {
  const words = query.toLowerCase().split(' ').filter(w => w.length > 2);
  const regex = words.length
    ? new RegExp(words.join('|'), 'i')
    : new RegExp(query.toLowerCase(), 'i');

  const [policies, faqs, chunks] = await Promise.all([
    Policy.find({
      isActive: true,
      $or: [
        { title:   { $regex: regex } },
        { content: { $regex: regex } },
        { tags:    { $in: [regex]  } },
      ],
    }).limit(3).lean(),

    FAQ.find({
      isActive: true,
      $or: [
        { question: { $regex: regex } },
        { answer:   { $regex: regex } },
        { tags:     { $in: [regex]  } },
      ],
    }).limit(4).lean(),

    RagChunk.find({ text: { $regex: regex } })
      .populate('documentId', 'originalName')
      .limit(4).lean(),
  ]);

  const bm25Results = bm25.search('__global__', query, [], 5);

  return { policies, faqs, chunks, bm25Results };
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT BUILDER
// ─────────────────────────────────────────────────────────────────────────────
function buildContext({ policies, faqs, chunks, bm25Results }) {
  let context = '';
  const sources = [];

  if (policies.length) {
    context += '=== RAILWAY POLICIES ===\n';
    policies.forEach(p => {
      context += `\n[Source ${sources.length + 1}] ${p.title}\n${p.content}\n`;
      sources.push({
        documentName: p.title,
        pageNumber:   1,
        snippet:      p.content.slice(0, 120) + '...',
      });
    });
  }

  if (faqs.length) {
    context += '\n=== FAQs ===\n';
    faqs.forEach(f => {
      context += `\n[Source ${sources.length + 1}] Q: ${f.question}\nA: ${f.answer}\n`;
      sources.push({
        documentName: 'FAQ: ' + f.question.slice(0, 45),
        pageNumber:   1,
        snippet:      f.answer.slice(0, 120) + '...',
      });
    });
  }

  // Combine DB chunks + BM25 chunks, deduplicate
  const seen        = new Set();
  const allChunks   = [
    ...chunks,
    ...bm25Results.map(r => ({
      text:       r.text,
      pageNumber: r.pageNumber,
      documentId: { originalName: r.fileName },
    })),
  ].filter(c => {
    const key = c.text.slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (allChunks.length) {
    context += '\n=== UPLOADED DOCUMENTS ===\n';
    allChunks.slice(0, 4).forEach(c => {
      const name = c.documentId?.originalName || 'Document';
      context += `\n[Source ${sources.length + 1}] ${name} (Page ${c.pageNumber})\n${c.text}\n`;
      sources.push({
        documentName: name,
        pageNumber:   c.pageNumber,
        snippet:      c.text.slice(0, 120) + '...',
      });
    });
  }

  return { context, sources };
}

// ─────────────────────────────────────────────────────────────────────────────
// QUERY REWRITER
// ─────────────────────────────────────────────────────────────────────────────
async function rewriteQuery(query, recentMessages) {
  if (!recentMessages.length || query.length > 100) return query;

  const history = recentMessages
    .slice(-4)
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini', temperature: 0, max_tokens: 80,
      messages: [{
        role: 'user',
        content: `Rewrite the follow-up as a standalone search query. Output ONLY the query.

HISTORY:
${history}

FOLLOW-UP: ${query}
STANDALONE QUERY:`,
      }],
    });
    return res.choices[0].message.content.trim() || query;
  } catch (_) { return query; }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ASK
// ─────────────────────────────────────────────────────────────────────────────
exports.ask = async ({ query, sessionId, userId }) => {

  // Get or create conversation session
  let conversation = await RagConversation.findOne({ sessionId, userId });
  if (!conversation) {
    conversation = await RagConversation.create({
      userId,
      sessionId,
      title:    query.slice(0, 55),
      messages: [],
    });
  }

  const recentMessages = conversation.messages.slice(-6);
  const rewrittenQuery = await rewriteQuery(query, recentMessages);

  // Search knowledge base
  const results = await searchAll(rewrittenQuery);
  const { context, sources } = buildContext(results);

  // Build system prompt
  const systemContent = context.trim()
    ? `You are RailwayGPT, an expert AI assistant for Indian Railways.
Answer ONLY using the information provided below. Reply in friendly Hinglish (Hindi + English mix).
Always cite sources using [Source N] notation.
If the answer is NOT in the context below, say: "Is baare mein mujhe database mein information nahi mili."

KNOWLEDGE BASE:
${context}`
    : `You are RailwayGPT, an expert AI assistant for Indian Railways.
Reply in friendly Hinglish. Answer from your general knowledge but recommend checking the official IRCTC website for policy information.`;

  // Call OpenAI
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemContent },
      ...recentMessages.slice(-4).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: rewrittenQuery },
    ],
    max_tokens: 700, temperature: 0.15,
  });

  const answer = completion.choices[0].message.content;

  // Save to conversation memory
  conversation.messages.push(
    { role: 'user',      content: query  },
    { role: 'assistant', content: answer, sources },
  );
  await conversation.save();

  return { answer, sources, sessionId: conversation.sessionId, cached: false };
};

// ─────────────────────────────────────────────────────────────────────────────
// INDEX POLICY / FAQ
// ─────────────────────────────────────────────────────────────────────────────
exports.indexPolicyOrFAQ = async ({ id, type, title, content, category }) => {
  // MongoDB text index handles search automatically
  // Qdrant vector index — optional
  if (embedder && vectorStore) {
    try {
      const text   = `${title}\n\n${content}`;
      const vector = await embedder.embedOne(text);
      await vectorStore.ensureCollection('global');
      await vectorStore.upsertChunks('global', [{
        text, pageNumber: 1, chunkIndex: 0,
        tokenCount: Math.ceil(text.length / 4),
        isImage: false, documentId: id, fileName: title,
      }], [vector]);
    } catch (e) {
      console.warn('[RAG] Vector index failed (non-fatal):', e.message);
    }
  }

  // Rebuild BM25
  await bm25.buildGlobalIndex();
  console.log(`[RAG] Indexed ${type}: ${title}`);
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE FROM INDEX
// ─────────────────────────────────────────────────────────────────────────────
exports.deleteFromIndex = async (id) => {
  if (vectorStore) {
    try { await vectorStore.deleteByDocument('global', id); } catch (_) {}
  }
  await bm25.buildGlobalIndex();
};

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT INGESTION (PDF/DOCX uploads)
// ─────────────────────────────────────────────────────────────────────────────
exports.ingestDocument = async (doc) => {
  try {
    console.log(`[RAG] Ingesting: ${doc.originalName}`);

    const pages  = await fileProcessor.extractText(doc.fileData, doc.mimeType);
    const chunks = chunker.chunkPages(pages, doc._id, doc.originalName);

    if (!chunks.length) throw new Error('No content extracted from file');

    // Save chunk metadata to MongoDB
    const chunkDocs = chunks.map(c => ({
      documentId: doc._id,
      text:       c.text,
      pageNumber: c.pageNumber,
      chunkIndex: c.chunkIndex,
      tokenCount: c.tokenCount,
      isImage:    c.isImage,
    }));
    await RagChunk.insertMany(chunkDocs);

    // Optional: also store in Qdrant
    if (embedder && vectorStore) {
      try {
        const embeddings = await embedder.embedBatch(chunks.map(c => c.text));
        await vectorStore.ensureCollection('global');
        await vectorStore.upsertChunks('global', chunks, embeddings);
      } catch (e) {
        console.warn('[RAG] Qdrant upsert failed (continuing):', e.message);
      }
    }

    // Mark document ready + free buffer memory
    await RagDocument.findByIdAndUpdate(doc._id, {
      $set:   { status: 'ready', pageCount: pages.length, chunkCount: chunks.length },
      $unset: { fileData: '' },
    });

    // Rebuild BM25
    await bm25.buildGlobalIndex();

    console.log(`[RAG] Ready: ${doc.originalName} | ${chunks.length} chunks`);
  } catch (err) {
    console.error('[RAG] Ingestion failed:', err.message);
    await RagDocument.findByIdAndUpdate(doc._id, {
      status: 'failed', errorMessage: err.message,
    });
  }
};

exports.deleteDocument = async (documentId) => {
  if (vectorStore) {
    try { await vectorStore.deleteByDocument('global', documentId); } catch (_) {}
  }
  await RagChunk.deleteMany({ documentId });
  await bm25.buildGlobalIndex();
};

// ─────────────────────────────────────────────────────────────────────────────
// STARTUP — rebuild BM25 after server restart
// ─────────────────────────────────────────────────────────────────────────────
exports.onStartup = async () => {
  try {
    await bm25.buildGlobalIndex();
    console.log('[RAG] Startup: BM25 global index ready');
  } catch (e) {
    console.warn('[RAG] Startup BM25 failed:', e.message);
  }
};