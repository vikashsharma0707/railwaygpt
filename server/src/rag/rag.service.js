// const { KnowledgeBase, Embedding } = require('../models');
// const { chunkText } = require('./chunker');
// const { embedMany, hashVector } = require('./embeddings');

// exports.ingest = async ({ title, content, category = 'document', tags = [], source, uploadedBy }) => {
//   const kb = await KnowledgeBase.create({ title, content, category, tags, source, uploadedBy });
//   const chunks = chunkText(content);
//   const vectors = await embedMany(chunks);
//   const docs = chunks.map((text, i) => ({
//     knowledge: kb._id, chunkIndex: i, text, vector: vectors[i], tokens: Math.ceil(text.length / 4),
//   }));
//   await Embedding.insertMany(docs);
//   return kb;
// };

// function cosine(a, b) {
//   const len = Math.min(a.length, b.length);
//   let dot = 0, na = 0, nb = 0;
//   for (let i = 0; i < len; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
//   return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
// }

// /** Semantic + keyword (hybrid) search. */
// exports.hybridSearch = async (query, topK = 5) => {
//   const [qVec] = await embedMany([query]);
//   // Pull candidate pool via text index, then rerank by cosine.
//   const textHits = await Embedding.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
//     .sort({ score: { $meta: 'textScore' } })
//     .limit(50)
//     .populate('knowledge');
//   let pool = textHits;
//   if (pool.length < topK) {
//     const extra = await Embedding.find().sort('-createdAt').limit(200).populate('knowledge');
//     pool = [...pool, ...extra];
//   }
//   const seen = new Set();
//   const scored = pool
//     .filter(e => { if (seen.has(String(e._id))) return false; seen.add(String(e._id)); return true; })
//     .map(e => ({
//       title: e.knowledge?.title || 'Knowledge',
//       text: e.text,
//       score: cosine(qVec, e.vector || hashVector(e.text, qVec.length)),
//       knowledgeId: e.knowledge?._id,
//     }))
//     .sort((a, b) => b.score - a.score)
//     .slice(0, topK);
//   return scored;
// };

// exports.list = (q = {}) => KnowledgeBase.find(q).sort('-createdAt');
// exports.remove = (id) => Promise.all([KnowledgeBase.findByIdAndDelete(id), Embedding.deleteMany({ knowledge: id })]);



const { KnowledgeBase, Embedding } = require('../models');
const { chunkText } = require('./chunker');
const { embedMany } = require('./embeddings');

exports.ingest = async ({ title, content, category = 'document', tags = [], source, uploadedBy }) => {
  const kb = await KnowledgeBase.create({ 
    title, 
    content, 
    category, 
    tags, 
    source, 
    uploadedBy 
  });

  const chunks = chunkText(content);
  const vectors = await embedMany(chunks);

  const docs = chunks.map((text, i) => ({
    knowledge: kb._id,
    chunkIndex: i,
    text,
    vector: vectors[i],
    tokens: Math.ceil(text.length / 4),
  }));

  await Embedding.insertMany(docs);
  return kb;
};

/** Hybrid Search: Keyword + Semantic */
exports.hybridSearch = async (query, topK = 6) => {
  if (!query?.trim()) return [];

  try {
    const [qVec] = await embedMany([query]);

    // Step 1: Get candidates from text search (fast)
    const textHits = await Embedding.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(30)
      .populate('knowledge', 'title category');

    // Step 2: Get recent documents as fallback
    let pool = textHits;
    if (pool.length < 15) {
      const recent = await Embedding.find()
        .sort('-createdAt')
        .limit(40)
        .populate('knowledge', 'title category');
      pool = [...pool, ...recent];
    }

    // Step 3: Score + Deduplicate + Rank
    const seen = new Set();
    const scoredResults = pool
      .filter(doc => {
        const id = String(doc._id);
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map(doc => {
        const similarity = cosineSimilarity(qVec, doc.vector);
        return {
          title: doc.knowledge?.title || 'Railway Knowledge',
          text: doc.text,
          score: similarity,
          category: doc.knowledge?.category,
          knowledgeId: doc.knowledge?._id,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scoredResults.filter(r => r.score > 0.35); // Minimum relevance threshold

  } catch (err) {
    console.error("Hybrid Search Error:", err);
    return [];
  }
};

/** Cosine Similarity */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB) || 1);
}

exports.list = (q = {}) => KnowledgeBase.find(q).sort('-createdAt');
exports.remove = (id) => Promise.all([
  KnowledgeBase.findByIdAndDelete(id),
  Embedding.deleteMany({ knowledge: id })
]);