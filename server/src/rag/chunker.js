/** Split text into overlapping chunks. */
exports.chunkText = (text, size = 800, overlap = 120) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  const chunks = [];
  let i = 0;
  while (i < clean.length) {
    chunks.push(clean.slice(i, i + size));
    i += size - overlap;
  }
  return chunks;
};
