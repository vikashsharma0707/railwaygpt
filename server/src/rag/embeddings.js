const openrouterService = require('../services/openrouter.service');

/** Embed an array of text chunks; falls back to deterministic hash vectors if API unavailable. */
exports.embedMany = async (chunks) => {
  try {
    return await openrouterService.embed(chunks);
  } catch (_) {
    return chunks.map((c) => hashVector(c, 384));
  }
};

function hashVector(text, dim) {
  const v = new Array(dim).fill(0);
  for (let i = 0; i < text.length; i++) {
    v[i % dim] += text.charCodeAt(i);
  }
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map(x => x / norm);
}
exports.hashVector = hashVector;
