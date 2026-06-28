/**
 * hybridSearch.js
 * server/src/services/rag/hybridSearch.js
 *
 * Reciprocal Rank Fusion (RRF) — combines:
 *   1. Qdrant vector similarity search
 *   2. BM25 keyword search
 *
 * RRF score = Σ  1 / (k + rank)
 * k = 60 (standard constant from original RRF paper)
 *
 * Falls back gracefully if Qdrant is not available
 */

const vectorStore = require('./vectorStore');
const bm25        = require('./bm25');
const embedder    = require('./embedder');

const RRF_K = 60;

// ── RRF fusion ────────────────────────────────────────────────────────────────
/**
 * @param {Array[]} lists  — array of result arrays, each sorted by relevance
 * @returns {Array}  fused results sorted by RRF score desc
 */
function reciprocalRankFusion(lists) {
  const scores = {};
  const docs   = {};

  for (const list of lists) {
    list.forEach((doc, rank) => {
      // Unique key: first 100 chars of text
      const key = doc.text.trim().slice(0, 100);

      scores[key] = (scores[key] || 0) + 1 / (RRF_K + rank + 1);

      // Prefer richer doc (vector result has qdrantPointId)
      if (!docs[key] || doc.qdrantPointId) {
        docs[key] = doc;
      }
    });
  }

  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([key, rrfScore]) => ({ ...docs[key], rrfScore }));
}

// ── Main hybrid search ────────────────────────────────────────────────────────
/**
 * @param {string}   userId
 * @param {string}   query
 * @param {string[]} documentIds   — empty = search all user's docs
 * @param {number}   topK          — results before reranking
 * @returns {Promise<Array>}
 */
exports.search = async (userId, query, documentIds = [], topK = 20) => {
  const vectorResults = [];
  const bm25Results   = bm25.search(userId, query, documentIds, topK);

  // Try vector search — graceful fallback if Qdrant down
  try {
    const queryVector = await embedder.embedOne(query);
    const results     = await vectorStore.search(userId, queryVector, documentIds, topK);
    vectorResults.push(...results);
  } catch (e) {
    console.warn('[RAG] Vector search failed, using BM25 only:', e.message);
  }

  // If both empty — return empty
  if (!vectorResults.length && !bm25Results.length) return [];

  // If only one source — return it directly
  if (!vectorResults.length) return bm25Results.slice(0, topK);
  if (!bm25Results.length)   return vectorResults.slice(0, topK);

  // Both available — RRF fusion
  const fused = reciprocalRankFusion([vectorResults, bm25Results]);
  return fused.slice(0, topK);
};

// ── Global search (no user isolation — for shared admin policies) ─────────────
/**
 * Used when searching admin-uploaded policies/FAQs
 * that should be available to ALL users
 */
exports.searchGlobal = async (query, topK = 20) => {
  const bm25Results   = bm25.search('__global__', query, [], topK);
  const vectorResults = [];

  try {
    // Use a shared collection name for global docs
    const queryVector = await embedder.embedOne(query);
    const results     = await vectorStore.search('global', queryVector, [], topK);
    vectorResults.push(...results);
  } catch (_) {}

  if (!vectorResults.length && !bm25Results.length) return [];
  if (!vectorResults.length) return bm25Results.slice(0, topK);
  if (!bm25Results.length)   return vectorResults.slice(0, topK);

  return reciprocalRankFusion([vectorResults, bm25Results]).slice(0, topK);
};