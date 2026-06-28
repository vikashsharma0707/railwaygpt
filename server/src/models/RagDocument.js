const mongoose = require('mongoose');

// Stores metadata for PDF/DOCX files uploaded by admin
const ragDocumentSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileName:     { type: String, required: true },
  mimeType:     { type: String, required: true },
  size:         { type: Number, required: true },
  // Store file as base64 in MongoDB (no GridFS needed for small files <16MB)
  // For larger files use GridFS — swap this field with gridfsId
  fileData:     { type: Buffer },
  status:       {
    type:    String,
    enum:    ['processing', 'ready', 'failed'],
    default: 'processing',
  },
  pageCount:    { type: Number, default: 0 },
  chunkCount:   { type: Number, default: 0 },
  category:     {
    type:    String,
    enum:    ['refund', 'tatkal', 'concession', 'pnr', 'booking', 'general'],
    default: 'general',
  },
  errorMessage: { type: String },
  uploadedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('RagDocument', ragDocumentSchema);