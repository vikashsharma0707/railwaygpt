// const asyncHandler = require('../utils/asyncHandler');
// const apiResponse = require('../utils/ApiResponse');
// const bookingService = require('../services/booking.service');
// const ticketService = require('../services/ticket.service');
// const notif = require('../services/notification.service');

// exports.create = asyncHandler(async (req, res) => {
//   const b = await bookingService.createDraft(req.user._id, req.body);
//   apiResponse(res, b, 'Booking draft created', 201);
// });

// exports.mine = asyncHandler(async (req, res) => apiResponse(res, await bookingService.byUser(req.user._id)));
// exports.byId = asyncHandler(async (req, res) => apiResponse(res, await bookingService.byId(req.params.id)));
// exports.byPNR = asyncHandler(async (req, res) => apiResponse(res, await bookingService.byPNR(req.params.pnr)));

// exports.cancel = asyncHandler(async (req, res) => {
//   const b = await bookingService.cancel(req.user._id, req.params.id);
//   notif.create({ user: req.user._id, type: 'booking', title: 'Booking cancelled', message: `PNR ${b.pnr} cancelled. Refund ₹${b.refundAmount}` });
//   apiResponse(res, b, 'Cancelled');
// });

// exports.ticketPDF = asyncHandler(async (req, res) => {
//   const b = await bookingService.byId(req.params.id);
//   if (!b) return res.status(404).json({ success: false, message: 'Not found' });
//   const pdf = await ticketService.getPDF(b);
//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', `attachment; filename=ticket-${b.pnr}.pdf`);
//   res.end(pdf);
// });

// exports.listAll = asyncHandler(async (req, res) => apiResponse(res, await bookingService.list()));




const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/ApiResponse');
const bookingService = require('../services/booking.service');
const ticketService = require('../services/ticket.service');
const notif = require('../services/notification.service');

exports.create = asyncHandler(async (req, res) => {
  const booking = await bookingService.createDraft(req.user._id, req.body);
  apiResponse(res, booking, 'Booking draft created successfully', 201);
});

exports.mine = asyncHandler(async (req, res) => {
  const bookings = await bookingService.byUser(req.user._id);
  apiResponse(res, bookings);
});

exports.byId = asyncHandler(async (req, res) => {
  const booking = await bookingService.byId(req.params.id);
  if (!booking) return apiResponse(res, null, 'Booking not found', 404);
  apiResponse(res, booking);
});

exports.byPNR = asyncHandler(async (req, res) => {
  const booking = await bookingService.byPNR(req.params.pnr);
  if (!booking) return apiResponse(res, null, 'Booking not found', 404);
  apiResponse(res, booking);
});

exports.cancel = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancel(req.user._id, req.params.id);
  
  if (booking) {
    notif.create({
      user: req.user._id,
      type: 'booking',
      title: 'Booking Cancelled',
      message: `PNR ${booking.pnr} has been cancelled. Refund: ₹${booking.refundAmount || 0}`
    });
  }

  apiResponse(res, booking, 'Booking cancelled successfully');
});

exports.ticketPDF = asyncHandler(async (req, res) => {
  const booking = await bookingService.byId(req.params.id);
  if (!booking) {
    return apiResponse(res, null, 'Booking not found', 404);
  }

  const pdf = await ticketService.getPDF(booking);
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=ticket-${booking.pnr}.pdf`);
  res.end(pdf);
});

exports.listAll = asyncHandler(async (req, res) => {
  const bookings = await bookingService.list();
  apiResponse(res, bookings);
});