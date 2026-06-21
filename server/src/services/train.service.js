// const { Train } = require('../models');
// const ApiError = require('../utils/ApiError');





// exports.search = async (query) => {
//   const { sourceCode, destinationCode, date, class: travelClass } = query;

//   if (!sourceCode || !destinationCode) {
//     throw new Error("Source and Destination codes are required");
//   }

//   const dayName = new Date(date).toLocaleString('en-US', { weekday: 'short' });

//   const filter = {
//     isActive: true,
//     status: { $in: ['scheduled', 'running'] },
//     sourceCode: sourceCode.toUpperCase().trim(),
//     destinationCode: destinationCode.toUpperCase().trim(),
//     runningDays: { $in: [dayName] }
//   };

//   const trains = await Train.find(filter)
//     .select('number name type source sourceCode destination destinationCode departureTime arrivalTime durationMinutes distanceKm pantry inventory runningDays')
//     .lean();

//   // Enrich data for frontend
//   return trains.map(train => ({
//     ...train,
//     availableClasses: train.inventory?.map(inv => ({
//       class: inv.class,
//       available: inv.availableSeats || 0,
//       fare: inv.fare
//     })) || []
//   })).filter(Boolean);
// };

// // exports.search = async ({ from, to, date, class: klass }) => {
// //   const dayName = new Date(date).toLocaleString('en-US', { weekday: 'short' });
// //   const query = {
// //     isActive: true,
// //     'stops.code': { $all: [from.toUpperCase(), to.toUpperCase()] },
// //     runningDays: dayName,
// //   };
// //   const trains = await Train.find(query).lean();
// //   return trains
// //     .map(t => {
// //       const fromIdx = t.stops.findIndex(s => s.code === from.toUpperCase());
// //       const toIdx = t.stops.findIndex(s => s.code === to.toUpperCase());
// //       if (fromIdx === -1 || toIdx === -1 || fromIdx >= toIdx) return null;
// //       const inv = klass ? t.inventory.find(i => i.class === klass) : t.inventory[0];
// //       return {
// //         ...t,
// //         fromStop: t.stops[fromIdx],
// //         toStop: t.stops[toIdx],
// //         availableClasses: t.inventory.map(i => ({ class: i.class, available: i.availableSeats, fare: i.fare })),
// //         selectedInventory: inv,
// //       };
// //     })
// //     .filter(Boolean);
// // };

// exports.create = (data) => Train.create(data);
// exports.update = (id, data) => Train.findByIdAndUpdate(id, data, { new: true });
// exports.remove = (id) => Train.findByIdAndDelete(id);
// exports.get = (id) => Train.findById(id);
// exports.list = (q = {}) => Train.find(q).lean();
// exports.cancel = (id) => Train.findByIdAndUpdate(id, { status: 'cancelled', isActive: false }, { new: true });
// exports.suspend = (id) => Train.findByIdAndUpdate(id, { status: 'suspended', isActive: false }, { new: true });
// exports.reschedule = (id, { departureTime, arrivalTime }) =>
//   Train.findByIdAndUpdate(id, { departureTime, arrivalTime, status: 'rescheduled' }, { new: true });

// exports.bulkImport = async (rows) => {
//   const docs = rows.map(r => ({
//     number: r.number, name: r.name, type: r.type || 'express',
//     source: r.source, sourceCode: r.sourceCode,
//     destination: r.destination, destinationCode: r.destinationCode,
//     departureTime: r.departureTime, arrivalTime: r.arrivalTime,
//     durationMinutes: Number(r.durationMinutes) || 0,
//     distanceKm: Number(r.distanceKm) || 0,
//     inventory: [
//       { class: 'SL', totalSeats: 72, availableSeats: 72, fare: Number(r.fareSL) || 300 },
//       { class: '3A', totalSeats: 64, availableSeats: 64, fare: Number(r.fare3A) || 800 },
//       { class: '2A', totalSeats: 48, availableSeats: 48, fare: Number(r.fare2A) || 1200 },
//     ],
//     stops: [
//       { station: r.source, code: r.sourceCode, departureTime: r.departureTime, day: 1, distanceKm: 0 },
//       { station: r.destination, code: r.destinationCode, arrivalTime: r.arrivalTime, day: 1, distanceKm: Number(r.distanceKm) || 0 },
//     ],
//   }));
//   return Train.insertMany(docs, { ordered: false });
// };

// exports.updateInventory = async (trainId, klass, delta) => {
//   const t = await Train.findById(trainId);
//   if (!t) throw new ApiError(404, 'Train not found');
//   const inv = t.inventory.find(i => i.class === klass);
//   if (!inv) throw new ApiError(400, 'Invalid class');
//   inv.availableSeats = Math.max(0, inv.availableSeats + delta);
//   await t.save();
//   return t;
// };





const { Train } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get day abbreviation from a date string safely (no timezone shift).
 * new Date('2025-08-14') in UTC gives wrong local day — fix with UTC methods.
 */
function getDayAbbr(dateStr) {
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (!dateStr) return DAYS[new Date().getDay()];
  // Parse as local date to avoid UTC offset shifting the day
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day); // local midnight
  return DAYS[d.getDay()];
}

/**
 * Search trains between source and destination.
 *
 * Accepts BOTH parameter naming styles:
 *   { sourceCode, destinationCode, date }   ← trainService native
 *   { from, to, date }                      ← tool executor style (mapped below)
 */
exports.search = async (query) => {
  // Support both naming styles
  const sourceCode      = (query.sourceCode || query.from || '').toUpperCase().trim();
  const destinationCode = (query.destinationCode || query.to || '').toUpperCase().trim();
  const date            = query.date || new Date().toISOString().split('T')[0];
  const travelClass     = query.class || null;

  if (!sourceCode || !destinationCode) {
    throw new Error('Source aur destination station codes required hain.');
  }

  const dayAbbr = getDayAbbr(date);

  const filter = {
    isActive: true,
    status:   { $in: ['scheduled', 'running', 'rescheduled'] },
    sourceCode,
    destinationCode,
    runningDays: { $in: [dayAbbr] },
  };

  // Optional class filter — only apply if class requested AND inventory exists
  // (don't filter at DB level; filter in memory so we can show availability)

  const trains = await Train.find(filter)
    .select(
      'number name type source sourceCode destination destinationCode ' +
      'departureTime arrivalTime durationMinutes distanceKm pantry ' +
      'inventory runningDays status'
    )
    .lean();

  if (!trains.length) {
    // Try without runningDays filter as fallback (some DBs have inconsistent data)
    const fallback = await Train.find({
      isActive: true,
      sourceCode,
      destinationCode,
    })
      .select(
        'number name type source sourceCode destination destinationCode ' +
        'departureTime arrivalTime durationMinutes distanceKm pantry ' +
        'inventory runningDays status'
      )
      .lean();

    return enrichTrains(fallback, travelClass);
  }

  return enrichTrains(trains, travelClass);
};

/**
 * Enrich raw train documents with availableClasses and optional class filter.
 */
function enrichTrains(trains, travelClass) {
  return trains
    .map((train) => {
      const availableClasses = (train.inventory || []).map((inv) => ({
        class:     inv.class,
        available: inv.availableSeats ?? 0,
        fare:      inv.fare ?? 0,
      }));

      // If a specific class is requested and not available, skip this train
      if (travelClass) {
        const hasClass = availableClasses.some(
          (c) => c.class === travelClass && c.available > 0
        );
        if (!hasClass) return null;
      }

      return {
        ...train,
        availableClasses,
      };
    })
    .filter(Boolean);
}

exports.create  = (data) => Train.create(data);
exports.update  = (id, data) => Train.findByIdAndUpdate(id, data, { new: true });
exports.remove  = (id) => Train.findByIdAndDelete(id);
exports.get     = (id) => Train.findById(id);
exports.list    = (q = {}) => Train.find(q).lean();
exports.cancel  = (id) => Train.findByIdAndUpdate(id, { status: 'cancelled',  isActive: false }, { new: true });
exports.suspend = (id) => Train.findByIdAndUpdate(id, { status: 'suspended',  isActive: false }, { new: true });

exports.reschedule = (id, { departureTime, arrivalTime }) =>
  Train.findByIdAndUpdate(
    id,
    { departureTime, arrivalTime, status: 'rescheduled' },
    { new: true }
  );

exports.bulkImport = async (rows) => {
  const docs = rows.map((r) => ({
    number:          r.number,
    name:            r.name,
    type:            r.type || 'express',
    source:          r.source,
    sourceCode:      r.sourceCode,
    destination:     r.destination,
    destinationCode: r.destinationCode,
    departureTime:   r.departureTime,
    arrivalTime:     r.arrivalTime,
    durationMinutes: Number(r.durationMinutes) || 0,
    distanceKm:      Number(r.distanceKm)      || 0,
    runningDays:     r.runningDays || ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    inventory: [
      { class: 'SL', totalSeats: 72, availableSeats: 72, fare: Number(r.fareSL) || 300  },
      { class: '3A', totalSeats: 64, availableSeats: 64, fare: Number(r.fare3A) || 800  },
      { class: '2A', totalSeats: 48, availableSeats: 48, fare: Number(r.fare2A) || 1200 },
      { class: '1A', totalSeats: 24, availableSeats: 24, fare: Number(r.fare1A) || 2000 },
    ],
    stops: [
      { station: r.source,      code: r.sourceCode,      departureTime: r.departureTime, day: 1, distanceKm: 0                        },
      { station: r.destination, code: r.destinationCode, arrivalTime:   r.arrivalTime,   day: 1, distanceKm: Number(r.distanceKm) || 0 },
    ],
  }));
  return Train.insertMany(docs, { ordered: false });
};

exports.updateInventory = async (trainId, klass, delta) => {
  const t = await Train.findById(trainId);
  if (!t) throw new ApiError(404, 'Train not found');
  const inv = t.inventory.find((i) => i.class === klass);
  if (!inv) throw new ApiError(400, `Class ${klass} not found on this train`);
  inv.availableSeats = Math.max(0, inv.availableSeats + delta);
  await t.save();
  return t;
};