// const { Ticket } = require('../models');
// const { toDataURL } = require('../utils/qrcode');
// const { buildTicketPDF } = require('../utils/pdf');

// exports.issue = async (booking) => {
//   const qr = await toDataURL({ pnr: booking.pnr, train: booking.trainNumber, date: booking.journeyDate });
//   const existing = await Ticket.findOne({ booking: booking._id });
//   if (existing) { existing.qrCode = qr; await existing.save(); return existing; }
//   return Ticket.create({ booking: booking._id, pnr: booking.pnr, qrCode: qr, barcode: booking.pnr });
// };

// exports.getPDF = async (booking) => {
//   const ticket = await Ticket.findOne({ booking: booking._id });
//   const qr = ticket?.qrCode || await toDataURL({ pnr: booking.pnr });
//   return buildTicketPDF(booking, qr);
// };

// exports.byBooking = (id) => Ticket.findOne({ booking: id });


const { Ticket } = require('../models');
const { toDataURL } = require('../utils/qrcode');
const { buildTicketPDF } = require('../utils/pdf');

exports.issue = async (booking) => {
  if (!booking) throw new Error("Booking is required for ticket generation");

  let ticket = await Ticket.findOne({ booking: booking._id });

  const qrData = {
    pnr: booking.pnr,
    train: booking.trainNumber,
    date: new Date(booking.journeyDate).toDateString(),
    passengers: booking.passengers?.length || 0
  };

  const qrCode = await toDataURL(qrData);

  if (ticket) {
    ticket.qrCode = qrCode;
    ticket.barcode = booking.pnr;
    await ticket.save();
    return ticket;
  }

  ticket = await Ticket.create({
    booking: booking._id,
    pnr: booking.pnr,
    qrCode,
    barcode: booking.pnr,
    status: 'issued'
  });

  return ticket;
};

exports.getPDF = async (booking) => {
  if (!booking) throw new Error("Booking not found");

  let ticket = await Ticket.findOne({ booking: booking._id });
  
  if (!ticket || !ticket.qrCode) {
    ticket = await this.issue(booking);
  }

  return buildTicketPDF(booking, ticket.qrCode);
};

exports.byBooking = (id) => Ticket.findOne({ booking: id });