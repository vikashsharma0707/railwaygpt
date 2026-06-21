// const { Booking, Train } = require('../models');
// const ApiError = require('../utils/ApiError');
// const { generatePNR } = require('../utils/pnr');

// exports.createDraft = async (userId, data) => {
//   const train = await Train.findById(data.trainId);
//   if (!train) throw new ApiError(404, 'Train not found');
//   const inv = train.inventory.find(i => i.class === data.class);
//   if (!inv) throw new ApiError(400, 'Invalid class');
//   if (inv.availableSeats < data.passengers.length)
//     throw new ApiError(409, 'Not enough seats available');

//   const fromStop = train.stops.find(s => s.code === data.fromCode);
//   const toStop = train.stops.find(s => s.code === data.toCode);
//   if (!fromStop || !toStop) throw new ApiError(400, 'Invalid stations');

//   const total = inv.fare * data.passengers.length;
//   const passengers = data.passengers.map((p, i) => ({
//     ...p, status: 'pending',
//     coach: `${data.class}-${Math.ceil((i + 1) / 8)}`,
//     seatNumber: String(((inv.totalSeats - inv.availableSeats) + i + 1)),
//     allocatedBerth: p.berthPreference || 'any',
//   }));

//   return Booking.create({
//     pnr: generatePNR(),
//     user: userId,
//     train: train._id,
//     trainNumber: train.number,
//     trainName: train.name,
//     fromStation: fromStop.station, fromCode: fromStop.code,
//     toStation: toStop.station, toCode: toStop.code,
//     journeyDate: new Date(data.journeyDate),
//     class: data.class,
//     quota: data.quota || 'GN',
//     passengers,
//     totalAmount: total,
//     status: 'pending',
//   });
// };

// exports.confirm = async (bookingId, paymentId) => {
//   const b = await Booking.findById(bookingId).populate('train');
//   if (!b) throw new ApiError(404, 'Booking not found');
//   if (b.status === 'confirmed') return b;
//   // reduce inventory
//   const t = b.train;
//   const inv = t.inventory.find(i => i.class === b.class);
//   if (inv.availableSeats < b.passengers.length) {
//     b.status = 'waitlist';
//     b.passengers.forEach(p => p.status = 'waitlist');
//   } else {
//     inv.availableSeats -= b.passengers.length;
//     await t.save();
//     b.status = 'confirmed';
//     b.passengers.forEach(p => p.status = 'confirmed');
//   }
//   b.payment = paymentId;
//   await b.save();
//   return b;
// };

// exports.cancel = async (userId, bookingId) => {
//   const b = await Booking.findById(bookingId).populate('train');
//   if (!b) throw new ApiError(404, 'Booking not found');
//   if (String(b.user) !== String(userId)) throw new ApiError(403, 'Forbidden');
//   if (b.status === 'cancelled') return b;
//   // release seats
//   if (b.status === 'confirmed') {
//     const inv = b.train.inventory.find(i => i.class === b.class);
//     if (inv) { inv.availableSeats += b.passengers.length; await b.train.save(); }
//   }
//   b.status = 'cancelled';
//   b.cancelledAt = new Date();
//   b.refundAmount = Math.round(b.totalAmount * 0.85);
//   b.passengers.forEach(p => p.status = 'cancelled');
//   await b.save();
//   return b;
// };

// exports.byUser = (userId) => Booking.find({ user: userId }).sort('-createdAt').populate('train');
// exports.byPNR = (pnr) => Booking.findOne({ pnr }).populate('train user');
// exports.byId = (id) => Booking.findById(id).populate('train user');
// exports.list = (q = {}) => Booking.find(q).sort('-createdAt').populate('user train').limit(500);


const { Booking, Train } = require('../models');
const ApiError = require('../utils/ApiError');
const { generatePNR } = require('../utils/pnr');



exports.createDraft = async (userId, data) => {
  if (!data.trainId) throw new ApiError(400, 'Train ID is required');
  if (!data.fromCode || !data.toCode) throw new ApiError(400, 'From and To codes are required');
  if (!data.class) throw new ApiError(400, 'Travel class is required');
  if (!data.passengers?.length) throw new ApiError(400, 'At least one passenger is required');

  const train = await Train.findById(data.trainId);
  if (!train) throw new ApiError(404, 'Train not found');

  const inventory = train.inventory || [];
  const selectedInv = inventory.find(i => i.class === data.class);
  if (!selectedInv) throw new ApiError(400, `Class ${data.class} not available`);

  if (selectedInv.availableSeats < data.passengers.length) {
    throw new ApiError(409, 'Not enough seats available');
  }

  // Station fallback logic
  const stops = train.stops || [];
  let fromStop = stops.find(s => s.code === (data.fromCode || '').toUpperCase());
  let toStop = stops.find(s => s.code === (data.toCode || '').toUpperCase());

  if (!fromStop) fromStop = { station: train.source, code: train.sourceCode || data.fromCode };
  if (!toStop) toStop = { station: train.destination, code: train.destinationCode || data.toCode };

  const totalAmount = selectedInv.fare * data.passengers.length;

  const passengers = data.passengers.map((p, i) => ({
    ...p,
    status: 'pending',
    coach: `${data.class}-${Math.ceil((i + 1) / 8)}`,
    seatNumber: String(selectedInv.totalSeats - selectedInv.availableSeats + i + 1).padStart(3, '0'),
    allocatedBerth: p.berthPreference || 'lower',
  }));

  const booking = await Booking.create({
    pnr: generatePNR(),
    user: userId,
    train: train._id,
    trainNumber: train.number,
    trainName: train.name,
    fromStation: fromStop.station,
    fromCode: fromStop.code,
    toStation: toStop.station,
    toCode: toStop.code,
    journeyDate: new Date(data.journeyDate || data.date),
    class: data.class,
    quota: data.quota || 'GN',
    passengers,
    totalAmount,
    status: 'draft',           // Now allowed in model
  });

  return booking;
};



exports.confirm = async (bookingId, paymentId) => {
  const booking = await Booking.findById(bookingId).populate('train');
  if (!booking) throw new ApiError(404, 'Booking not found');

  if (booking.status === 'confirmed') return booking;

  const train = booking.train;
  if (!train) throw new ApiError(404, 'Train not found');

  const inventory = train.inventory || [];
  const invIndex = inventory.findIndex(i => i.class === booking.class);

  if (invIndex === -1) throw new ApiError(400, 'Class not found');

  if (inventory[invIndex].availableSeats < booking.passengers.length) {
    booking.status = 'waitlist';
    booking.passengers.forEach(p => p.status = 'waitlist');
  } else {
    inventory[invIndex].availableSeats -= booking.passengers.length;
    await train.save();

    booking.status = 'confirmed';
    booking.passengers.forEach(p => p.status = 'confirmed');
  }

  booking.payment = paymentId;
  await booking.save();
  return booking;
};

exports.cancel = async (userId, bookingId) => {
  const booking = await Booking.findById(bookingId).populate('train');
  if (!booking) throw new ApiError(404, 'Booking not found');

  if (String(booking.user) !== String(userId)) {
    throw new ApiError(403, 'You can only cancel your own booking');
  }

  if (booking.status === 'cancelled') return booking;

  // Release seats if booking was confirmed
  if (booking.status === 'confirmed' && booking.train) {
    const train = booking.train;
    const inventory = train.inventory || [];
    const inv = inventory.find(i => i.class === booking.class);

    if (inv) {
      inv.availableSeats += booking.passengers.length;
      await train.save();
    }
  }

  booking.status = 'cancelled';
  booking.cancelledAt = new Date();
  booking.refundAmount = Math.round(booking.totalAmount * 0.85); // 85% refund
  booking.passengers.forEach(p => p.status = 'cancelled');

  await booking.save();
  return booking;
};

// Query functions
exports.byUser = (userId) => 
  Booking.find({ user: userId })
    .sort('-createdAt')
    .populate('train', 'number name type');

exports.byPNR = (pnr) => 
  Booking.findOne({ pnr })
    .populate('train')
    .populate('user', 'name email');

exports.byId = (id) => 
  Booking.findById(id)
    .populate('train')
    .populate('user', 'name email');

exports.list = (query = {}) => 
  Booking.find(query)
    .sort('-createdAt')
    .populate('user', 'name email')
    .populate('train', 'number name')
    .limit(500);

exports.getDraft = (bookingId) => Booking.findById(bookingId);