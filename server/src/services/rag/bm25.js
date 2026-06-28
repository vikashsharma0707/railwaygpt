/**
 * bm25.js
 * server/src/services/rag/bm25.js
 *
 * Pure JS BM25 — no external package needed
 */

// ── FIXED IMPORT ──────────────────────────────────────────────────────────────
// RagChunk.js exports { RagChunk, RagConversation } — destructure correctly
const { RagChunk } = require('../../models/RagChunk');

// userId → { docs, tokenizedDocs, idf, avgdl }
const _indexes = new Map();

// ── Tokenizer ─────────────────────────────────────────────────────────────────
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1);
}

// ── BM25 constants ────────────────────────────────────────────────────────────
const K1 = 1.5;
const B  = 0.75;

// ── Build IDF ─────────────────────────────────────────────────────────────────
function buildIDF(tokenizedDocs) {
  const N  = tokenizedDocs.length;
  const df = {};
  const idf = {};

  for (const tokens of tokenizedDocs) {
    const unique = new Set(tokens);
    for (const t of unique) df[t] = (df[t] || 0) + 1;
  }

  for (const [term, freq] of Object.entries(df)) {
    idf[term] = Math.log((N - freq + 0.5) / (freq + 0.5) + 1);
  }

  return idf;
}

// ── Score one document ────────────────────────────────────────────────────────
function scoreDoc(queryTokens, docTokens, idf, avgdl) {
  const dl    = docTokens.length;
  const freqs = {};
  for (const t of docTokens) freqs[t] = (freqs[t] || 0) + 1;

  let score = 0;
  for (const qt of queryTokens) {
    if (!idf[qt]) continue;
    const f   = freqs[qt] || 0;
    const num = f * (K1 + 1);
    const den = f + K1 * (1 - B + B * (dl / avgdl));
    score    += idf[qt] * (num / den);
  }
  return score;
}

// ── Build global index ────────────────────────────────────────────────────────
exports.buildGlobalIndex = async () => {
  try {
    const chunks = await RagChunk.find({})
      .populate('documentId', 'originalName')
      .select('text pageNumber chunkIndex documentId')
      .lean();

    if (!chunks.length) {
      _indexes.delete('__global__');
      console.log('[BM25] No chunks found — index cleared');
      return;
    }

    const tokenizedDocs = chunks.map(c => tokenize(c.text));
    const totalTokens   = tokenizedDocs.reduce((a, d) => a + d.length, 0);
    const avgdl         = totalTokens / tokenizedDocs.length;
    const idf           = buildIDF(tokenizedDocs);

    _indexes.set('__global__', { docs: chunks, tokenizedDocs, idf, avgdl });
    console.log(`[BM25] Global index built: ${chunks.length} chunks`);
  } catch (e) {
    console.error('[BM25] buildGlobalIndex error:', e.message);
  }
};

// ── Search ────────────────────────────────────────────────────────────────────
exports.search = (userId, query, documentIds = [], topK = 10) => {
  const entry = _indexes.get('__global__');
  if (!entry) return [];

  const { docs, tokenizedDocs, idf, avgdl } = entry;
  const queryTokens = tokenize(query);

  let results = docs.map((doc, i) => ({
    ...doc,
    bm25Score: scoreDoc(queryTokens, tokenizedDocs[i], idf, avgdl),
  })).filter(r => r.bm25Score > 0);

  if (documentIds.length) {
    const ids = new Set(documentIds.map(id => id.toString()));
    results = results.filter(r => {
      const docId = r.documentId?._id?.toString() || r.documentId?.toString();
      return ids.has(docId);
    });
  }

  return results
    .sort((a, b) => b.bm25Score - a.bm25Score)
    .slice(0, topK)
    .map(r => ({
      score:      r.bm25Score,
      text:       r.text,
      pageNumber: r.pageNumber,
      chunkIndex: r.chunkIndex,
      fileName:   r.documentId?.originalName || 'Document',
      documentId: r.documentId?._id?.toString() || r.documentId?.toString(),
      source:     'bm25',
    }));
};

exports.hasIndex  = () => _indexes.has('__global__');
exports.clearIndex = () => _indexes.delete('__global__');