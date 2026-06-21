const { KnowledgeBase, Embedding } = require('../models');
const { chunkText } = require('../rag/chunker');
const { embedMany } = require('../rag/embeddings');

/**
 * Ingest a document into the knowledge base.
 * Chunks the content, embeds each chunk, and stores embeddings.
 */
exports.ingest = async ({
  title,
  content,
  category = 'document',
  tags = [],
  source,
  uploadedBy,
}) => {
  if (!title?.trim() || !content?.trim()) {
    throw new Error('Title and content are required for ingestion');
  }

  // 1. Persist the parent KnowledgeBase document
  const kb = await KnowledgeBase.create({
    title,
    content,
    category,
    tags,
    source,
    uploadedBy,
  });

  // 2. Chunk → embed → store
  const chunks = chunkText(content);
  if (!chunks.length) {
    console.warn(`[KnowledgeBase] No chunks produced for doc: ${kb._id}`);
    return kb;
  }

  const vectors = await embedMany(chunks);

  const docs = chunks.map((text, i) => ({
    knowledge: kb._id,
    chunkIndex: i,
    text,
    vector: vectors[i],
    tokens: Math.ceil(text.length / 4),
  }));

  await Embedding.insertMany(docs);
  console.log(`[KnowledgeBase] Ingested "${title}" → ${docs.length} chunks`);
  return kb;
};

/**
 * Hybrid Search: Keyword (MongoDB $text) + Semantic (cosine similarity).
 *
 * Steps:
 *  1. Run a fast $text search to get candidates.
 *  2. If not enough candidates, pad with recent embeddings.
 *  3. Score every candidate with cosine similarity against the query vector.
 *  4. Deduplicate, rank, filter by minimum relevance threshold, return top-K.
 *
 * @param {string} query      - User's natural language query
 * @param {number} topK       - Max results to return (default 6)
 * @param {number} threshold  - Minimum cosine score to include (default 0.35)
 * @returns {Promise<Array>}
 */
exports.hybridSearch = async (query, topK = 6, threshold = 0.35) => {
  if (!query?.trim()) return [];

  let qVec;
  try {
    [qVec] = await embedMany([query]);
  } catch (err) {
    console.error('[KnowledgeBase] Embedding error:', err.message);
    return [];
  }

  try {
    // ── Step 1: Keyword candidates ──────────────────────────────────────────
    const textHits = await Embedding.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(40)
      .populate('knowledge', 'title category source');

    // ── Step 2: Pad with recent docs if too few keyword hits ────────────────
    let pool = textHits;
    if (pool.length < 15) {
      const recent = await Embedding.find()
        .sort('-createdAt')
        .limit(50)
        .populate('knowledge', 'title category source');

      // Merge without duplicates
      const existingIds = new Set(pool.map((d) => String(d._id)));
      for (const doc of recent) {
        if (!existingIds.has(String(doc._id))) {
          pool.push(doc);
          existingIds.add(String(doc._id));
        }
      }
    }

    // ── Step 3: Cosine score + deduplicate ──────────────────────────────────
    const seen = new Set();
    const scored = pool
      .filter((doc) => {
        const id = String(doc._id);
        if (seen.has(id)) return false;
        seen.add(id);
        return doc.vector?.length > 0; // Skip docs without vectors
      })
      .map((doc) => ({
        title: doc.knowledge?.title || 'Railway Knowledge',
        source: doc.knowledge?.source || null,
        category: doc.knowledge?.category || null,
        knowledgeId: doc.knowledge?._id || null,
        chunkIndex: doc.chunkIndex,
        text: doc.text,
        score: cosineSimilarity(qVec, doc.vector),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter((r) => r.score >= threshold);

    if (!scored.length) {
      console.log(`[KnowledgeBase] No results above threshold ${threshold} for query: "${query}"`);
    }

    return scored;
  } catch (err) {
    console.error('[KnowledgeBase] Hybrid search error:', err.message);
    return [];
  }
};

/**
 * Cosine Similarity between two numeric vectors.
 * Returns 0 if vectors are null, undefined, or different lengths.
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot  += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

/** List all knowledge-base documents (optionally filtered). */
exports.list = (query = {}) =>
  KnowledgeBase.find(query).sort('-createdAt').lean();

/** Delete a document and all its embeddings. */
exports.remove = (id) =>
  Promise.all([
    KnowledgeBase.findByIdAndDelete(id),
    Embedding.deleteMany({ knowledge: id }),
  ]);

/** Expose for testing */
exports._cosineSimilarity = cosineSimilarity;