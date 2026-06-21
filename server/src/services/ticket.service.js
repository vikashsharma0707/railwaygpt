const { Ticket } = require('../models');
const { toDataURL } = require('../utils/qrcode');
const { buildTicketPDF } = require('../utils/pdf');

exports.issue = async (booking) => {
  const qr = await toDataURL({ pnr: booking.pnr, train: booking.trainNumber, date: booking.journeyDate });
  const existing = await Ticket.findOne({ booking: booking._id });
  if (existing) { existing.qrCode = qr; await existing.save(); return existing; }
  return Ticket.create({ booking: booking._id, pnr: booking.pnr, qrCode: qr, barcode: booking.pnr });
};

exports.getPDF = async (booking) => {
  const ticket = await Ticket.findOne({ booking: booking._id });
  const qr = ticket?.qrCode || await toDataURL({ pnr: booking.pnr });
  return buildTicketPDF(booking, qr);
};

exports.byBooking = (id) => Ticket.findOne({ booking: id });
