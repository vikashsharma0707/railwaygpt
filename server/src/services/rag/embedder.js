/**
 * embedder.js
 * server/src/services/rag/embedder.js
 *
 * OpenAI text-embedding-3-small
 * Batch size 100 to stay within rate limits
 *
 * Required: npm install openai
 */

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MODEL      = 'text-embedding-3-small';
const DIM        = 1536;
const BATCH_SIZE = 100;

/**
 * Embed a single text string
 * @param   {string}   text
 * @returns {Promise<number[]>}
 */
exports.embedOne = async (text) => {
  const clean = text.replace(/\n/g, ' ').slice(0, 8000);

  const res = await openai.embeddings.create({
    model: MODEL,
    input: clean,
  });

  return res.data[0].embedding;
};

/**
 * Embed an array of texts in batches
 * @param   {string[]}   texts
 * @returns {Promise<number[][]>}
 */
exports.embedBatch = async (texts) => {
  const all = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts
      .slice(i, i + BATCH_SIZE)
      .map(t => t.replace(/\n/g, ' ').slice(0, 8000));

    const res = await openai.embeddings.create({
      model: MODEL,
      input: batch,
    });

    // OpenAI returns in same order as input
    res.data.forEach(d => all.push(d.embedding));

    // Polite delay between batches to avoid rate limits
    if (i + BATCH_SIZE < texts.length) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  return all;
};

exports.MODEL = MODEL;
exports.DIM   = DIM;