/**
 * vectorStore.js
 * server/src/services/rag/vectorStore.js
 *
 * Qdrant vector database — per-user isolated collections
 * Collection naming: rag_user_{userId}
 *
 * Required: npm install @qdrant/js-client-rest uuid
 *
 * Start Qdrant locally:
 *   docker run -d -p 6333:6333 \
 *     -v $(pwd)/qdrant_data:/qdrant/storage \
 *     qdrant/qdrant
 *
 * .env:
 *   QDRANT_URL=http://localhost:6333
 *   QDRANT_API_KEY=          # empty for local
 */

const { QdrantClient } = require('@qdrant/js-client-rest');
const { v4: uuidv4 }   = require('uuid');
const embedder         = require('./embedder');

const client = new QdrantClient({
  url:    process.env.QDRANT_URL    || 'http://localhost:6333',
  apiKey: process.env.QDRANT_API_KEY || undefined,
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const collectionName = (userId) => `rag_user_${userId.toString()}`;
exports.collectionName = collectionName;

// ── Ensure collection exists ──────────────────────────────────────────────────
exports.ensureCollection = async (userId) => {
  const name = collectionName(userId);

  const { collections } = await client.getCollections();
  const exists = collections.some(c => c.name === name);

  if (!exists) {
    await client.createCollection(name, {
      vectors: {
        size:     embedder.DIM,   // 1536
        distance: 'Cosine',
      },
      // Performance tuning
      optimizers_config: { indexing_threshold: 20000 },
      hnsw_config:       { m: 16, ef_construct: 100  },
    });

    // Index on documentId for fast filtered search
    await client.createPayloadIndex(name, {
      field_name:   'documentId',
      field_schema: 'keyword',
    });

    console.log(`[Qdrant] Collection created: ${name}`);
  }

  return name;
};

// ── Upsert chunks into Qdrant ─────────────────────────────────────────────────
/**
 * @param {string}     userId
 * @param {Array}      chunks      — from chunker, each has .text, .pageNumber etc
 * @param {number[][]} embeddings  — parallel array from embedder
 * @returns {string[]}  qdrantPointIds in same order as chunks
 */
exports.upsertChunks = async (userId, chunks, embeddings) => {
  const name   = collectionName(userId);
  const points = chunks.map((chunk, i) => ({
    id:      uuidv4(),
    vector:  embeddings[i],
    payload: {
      documentId:       chunk.documentId.toString(),
      userId:           userId.toString(),
      text:             chunk.text,
      pageNumber:       chunk.pageNumber,
      chunkIndex:       chunk.chunkIndex,
      fileName:         chunk.fileName,
      isImage:          chunk.isImage  || false,
      imageDescription: chunk.imageDescription || '',
    },
  }));

  // Qdrant recommends batches of max 100
  const BATCH = 100;
  for (let i = 0; i < points.length; i += BATCH) {
    await client.upsert(name, {
      points: points.slice(i, i + BATCH),
      wait:   true,
    });
  }

  return points.map(p => p.id);
};

// ── Vector similarity search ──────────────────────────────────────────────────
/**
 * @param {string}   userId
 * @param {number[]} queryVector
 * @param {string[]} documentIds   — empty = search all user docs
 * @param {number}   topK
 */
exports.search = async (userId, queryVector, documentIds = [], topK = 10) => {
  const name = collectionName(userId);

  const filter = documentIds.length
    ? {
        must: [{
          key:   'documentId',
          match: { any: documentIds.map(id => id.toString()) },
        }],
      }
    : undefined;

  const results = await client.search(name, {
    vector:       queryVector,
    limit:        topK,
    with_payload: true,
    filter,
  });

  return results.map(r => ({
    qdrantPointId: r.id,
    score:         r.score,
    text:          r.payload.text,
    pageNumber:    r.payload.pageNumber,
    chunkIndex:    r.payload.chunkIndex,
    fileName:      r.payload.fileName,
    documentId:    r.payload.documentId,
    isImage:       r.payload.isImage,
  }));
};

// ── Delete all vectors for one document ──────────────────────────────────────
exports.deleteByDocument = async (userId, documentId) => {
  const name = collectionName(userId);

  await client.delete(name, {
    wait:   true,
    filter: {
      must: [{
        key:   'documentId',
        match: { value: documentId.toString() },
      }],
    },
  });
};

// ── Delete entire user collection ─────────────────────────────────────────────
exports.deleteCollection = async (userId) => {
  const name = collectionName(userId);
  try {
    await client.deleteCollection(name);
  } catch (_) {
    // OK if collection doesn't exist
  }
};

// ── Get collection info (admin stats) ────────────────────────────────────────
exports.getCollectionInfo = async (userId) => {
  const name = collectionName(userId);
  try {
    const info = await client.getCollection(name);
    return {
      vectorsCount: info.vectors_count,
      status:       info.status,
      dimension:    embedder.DIM,
    };
  } catch (_) {
    return { vectorsCount: 0, status: 'not_created', dimension: embedder.DIM };
  }
};