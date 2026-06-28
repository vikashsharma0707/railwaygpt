/**
 * chunker.js
 * server/src/services/rag/chunker.js
 *
 * Sliding window chunker — 512 tokens, 64 token overlap
 * Image pages are kept as single chunks (never split)
 */

// 1 token ≈ 4 chars for English/Hindi mixed text
const estimateTokens = (text) => Math.ceil(text.length / 4);

const CHUNK_TOKENS   = 512;
const OVERLAP_TOKENS = 64;

/**
 * Split text into sentences
 */
function splitSentences(text) {
  return text
    .replace(/([।.!?])\s+/g, '$1\n')  // Hindi danda + English punctuation
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 8);
}

/**
 * Main chunker
 *
 * @param {Array<{text, pageNumber, isImage, imageDescription}>} pages
 * @param {string} documentId   — MongoDB _id of RagDocument
 * @param {string} fileName     — display name for citations
 * @returns {Array<{text, pageNumber, chunkIndex, tokenCount, isImage, imageDescription, documentId, fileName}>}
 */
exports.chunkPages = (pages, documentId, fileName) => {
  const chunks      = [];
  let   globalIndex = 0;

  for (const page of pages) {

    // ── Image pages — single chunk, never split ───────────────────────────
    if (page.isImage) {
      chunks.push({
        text:             page.text,
        pageNumber:       page.pageNumber,
        chunkIndex:       globalIndex++,
        tokenCount:       estimateTokens(page.text),
        isImage:          true,
        imageDescription: page.imageDescription || '',
        documentId,
        fileName,
      });
      continue;
    }

    // ── Text pages — sliding window ───────────────────────────────────────
    const sentences     = splitSentences(page.text);
    let   currentChunk  = [];
    let   currentTokens = 0;

    for (const sentence of sentences) {
      const sentTokens = estimateTokens(sentence);

      // Flush when chunk is full
      if (currentTokens + sentTokens > CHUNK_TOKENS && currentChunk.length > 0) {
        const text = currentChunk.join(' ');
        chunks.push({
          text,
          pageNumber:       page.pageNumber,
          chunkIndex:       globalIndex++,
          tokenCount:       estimateTokens(text),
          isImage:          false,
          imageDescription: '',
          documentId,
          fileName,
        });

        // Keep last N sentences as overlap for next chunk
        const overlapBuf    = [];
        let   overlapTokens = 0;

        for (let i = currentChunk.length - 1; i >= 0; i--) {
          const t = estimateTokens(currentChunk[i]);
          if (overlapTokens + t > OVERLAP_TOKENS) break;
          overlapBuf.unshift(currentChunk[i]);
          overlapTokens += t;
        }

        currentChunk  = [...overlapBuf];
        currentTokens = overlapBuf.reduce((a, s) => a + estimateTokens(s), 0);
      }

      currentChunk.push(sentence);
      currentTokens += sentTokens;
    }

    // Flush remaining sentences
    if (currentChunk.length > 0) {
      const text = currentChunk.join(' ');
      chunks.push({
        text,
        pageNumber:       page.pageNumber,
        chunkIndex:       globalIndex++,
        tokenCount:       estimateTokens(text),
        isImage:          false,
        imageDescription: '',
        documentId,
        fileName,
      });
    }
  }

  return chunks;
};