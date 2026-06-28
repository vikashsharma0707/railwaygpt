/**
 * fileProcessor.js
 * server/src/services/rag/fileProcessor.js
 */

// ─── pdf-parse fix — handles both old and new export styles ──────────────────
function getPdfParse() {
  try {
    const mod = require('pdf-parse');
    // Some versions export as { default: fn }, others export fn directly
    const fn = mod?.default || mod;
    if (typeof fn !== 'function') throw new Error('pdf-parse export is not a function');
    return fn;
  } catch (e) {
    throw new Error(`pdf-parse load failed: ${e.message}. Run: npm install pdf-parse`);
  }
}

function getMammoth() {
  try { return require('mammoth'); }
  catch (_) { throw new Error('mammoth not installed. Run: npm install mammoth'); }
}

function getTesseract() {
  try { return require('tesseract.js'); } catch (_) { return null; }
}

function getSharp() {
  try { return require('sharp'); } catch (_) { return null; }
}

function getOpenAI() {
  try {
    const OpenAI = require('openai');
    if (!process.env.OPENAI_API_KEY) return null;
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } catch (_) { return null; }
}

// ─── PDF ──────────────────────────────────────────────────────────────────────
async function extractFromPDF(buffer) {
  const pdfParse = getPdfParse();
  const pages    = [];
  let   currentPage = 0;

  // Try per-page extraction first
  try {
    const options = {
      pagerender: (pageData) => {
        currentPage++;
        const pageNum = currentPage;
        return pageData.getTextContent().then((tc) => {
          const text = tc.items.map(i => i.str).join(' ').replace(/\s+/g, ' ').trim();
          if (text.length > 20) pages.push({ text, pageNumber: pageNum, isImage: false });
        });
      },
    };
    await pdfParse(buffer, options);
  } catch (_) {
    // ignore per-page errors, try full extraction below
  }

  // Fallback — get all text at once
  if (pages.length === 0) {
    const result = await pdfParse(buffer);
    const text   = result.text.replace(/\s+/g, ' ').trim();
    if (text.length > 20) {
      pages.push({ text, pageNumber: 1, isImage: false });
    }
  }

  return pages.length ? pages : [{ text: 'Could not extract PDF text.', pageNumber: 1, isImage: false }];
}

// ─── DOCX ─────────────────────────────────────────────────────────────────────
async function extractFromDOCX(buffer) {
  const mammoth    = getMammoth();
  const result     = await mammoth.extractRawText({ buffer });
  const fullText   = result.value.replace(/\s+/g, ' ').trim();

  if (!fullText) return [{ text: 'Could not extract DOCX text.', pageNumber: 1, isImage: false }];

  const paragraphs = fullText.split(/\n{2,}/).filter(p => p.length > 30);
  if (!paragraphs.length) return [{ text: fullText, pageNumber: 1, isImage: false }];

  const PER_PAGE = 10;
  const pages    = [];
  for (let i = 0; i < paragraphs.length; i += PER_PAGE) {
    pages.push({
      text:       paragraphs.slice(i, i + PER_PAGE).join('\n\n'),
      pageNumber: Math.floor(i / PER_PAGE) + 1,
      isImage:    false,
    });
  }
  return pages;
}

// ─── IMAGE ────────────────────────────────────────────────────────────────────
async function extractFromImage(buffer, mimeType) {
  const Tesseract = getTesseract();
  const sharp     = getSharp();
  const openai    = getOpenAI();

  let ocrText           = '';
  let visualDescription = '';

  if (Tesseract) {
    try {
      let buf = buffer;
      if (sharp) buf = await sharp(buffer).grayscale().normalize().toBuffer();
      const { data: { text } } = await Tesseract.recognize(buf, 'eng');
      ocrText = text.replace(/\s+/g, ' ').trim();
    } catch (e) { console.warn('[RAG] OCR failed:', e.message); }
  }

  if (openai) {
    try {
      const dataUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      const res = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: dataUrl, detail: 'high' } },
            { type: 'text', text: 'Describe everything in this image for a railway information retrieval system. Include all text, numbers, tables, charts.' },
          ],
        }],
        max_tokens: 1000,
      });
      visualDescription = res.choices[0].message.content;
    } catch (e) { console.warn('[RAG] GPT-4V failed:', e.message); }
  }

  const combined = [
    ocrText           ? `[OCR TEXT]\n${ocrText}`                    : '',
    visualDescription ? `[IMAGE DESCRIPTION]\n${visualDescription}` : '',
  ].filter(Boolean).join('\n\n');

  return [{
    text:             combined || 'Image content could not be extracted.',
    pageNumber:       1,
    isImage:          true,
    imageDescription: visualDescription,
  }];
}

// ─── Plain text ───────────────────────────────────────────────────────────────
async function extractFromText(buffer) {
  const text = buffer.toString('utf-8').replace(/\s+/g, ' ').trim();
  return [{ text: text || 'Empty file.', pageNumber: 1, isImage: false }];
}

// ─── MAIN DISPATCHER ─────────────────────────────────────────────────────────
exports.extractText = async (buffer, mimeType) => {
  if (mimeType === 'application/pdf') return extractFromPDF(buffer);

  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  ) return extractFromDOCX(buffer);

  if (mimeType.startsWith('image/')) return extractFromImage(buffer, mimeType);

  if (mimeType === 'text/plain' || mimeType === 'text/markdown') return extractFromText(buffer);

  throw new Error(`Unsupported file type: ${mimeType}`);
};

exports.SUPPORTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'image/png', 'image/jpeg', 'image/jpg', 'image/webp',
  'text/plain', 'text/markdown',
];