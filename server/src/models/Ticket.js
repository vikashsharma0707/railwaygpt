const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
  pnr: { type: String, required: true, index: true },
  qrCode: String, // data URL
  barcode: String,
  pdfPath: String,
  issuedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
