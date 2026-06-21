// // const trainService = require('../services/train.service');
// // const bookingService = require('../services/booking.service');
// // const paymentService = require('../services/payment.service');
// // const ragService = require('../rag/rag.service');
// // const { Train, Booking } = require('../models');

// // /** Tool executor — maps tool name -> async fn(args, ctx). */
// // module.exports = {
// //   search_trains: async (args) => {
// //     const trains = await trainService.search(args);
// //     return trains.slice(0, 6).map(t => ({
// //       id: t._id, number: t.number, name: t.name,
// //       from: t.fromStop.station, to: t.toStop.station,
// //       departure: t.fromStop.departureTime, arrival: t.toStop.arrivalTime,
// //       classes: t.availableClasses,
// //     }));
// //   },

// //   check_pnr: async ({ pnr }) => {
// //     const b = await bookingService.byPNR(pnr);
// //     if (!b) return { error: 'PNR not found' };
// //     return {
// //       pnr: b.pnr, status: b.status, trainNumber: b.trainNumber, trainName: b.trainName,
// //       from: b.fromStation, to: b.toStation, journeyDate: b.journeyDate,
// //       class: b.class, quota: b.quota,
// //       passengers: b.passengers.map(p => ({ name: p.name, seat: p.seatNumber, coach: p.coach, status: p.status })),
// //       amount: b.totalAmount,
// //     };
// //   },

// //   create_booking_draft: async (args, ctx) => {
// //     if (!ctx.user) return { error: 'Login required' };
// //     const b = await bookingService.createDraft(ctx.user._id, args);
// //     return { bookingId: b._id, pnr: b.pnr, totalAmount: b.totalAmount, status: b.status };
// //   },

// //   create_payment_order: async ({ bookingId }, ctx) => {
// //     if (!ctx.user) return { error: 'Login required' };
// //     const { order, keyId } = await paymentService.createOrder(ctx.user._id, bookingId);
// //     return { orderId: order.id, amount: order.amount, currency: order.currency, keyId };
// //   },

// //   cancel_booking: async ({ bookingId }, ctx) => {
// //     if (!ctx.user) return { error: 'Login required' };
// //     const b = await bookingService.cancel(ctx.user._id, bookingId);
// //     return { pnr: b.pnr, status: b.status, refund: b.refundAmount };
// //   },

// //   rag_search: async ({ query, topK = 5 }) => {
// //     const results = await ragService.hybridSearch(query, topK);
// //     return results.map(r => ({ title: r.title, snippet: r.text.slice(0, 400), score: r.score }));
// //   },

// //   predict_confirmation: async ({ trainNumber, class: klass, waitlistPosition }) => {
// //     const t = await Train.findOne({ number: trainNumber });
// //     if (!t) return { error: 'Train not found' };
// //     const inv = t.inventory.find(i => i.class === klass);
// //     const rate = inv ? Math.max(0.05, Math.min(0.95, 1 - waitlistPosition / Math.max(20, inv.totalSeats))) : 0.3;
// //     return { probability: Number(rate.toFixed(2)), recommendation: rate > 0.6 ? 'Likely to confirm' : 'Consider alternates' };
// //   },

// //   predict_delay: async ({ trainNumber }) => {
// //     const t = await Train.findOne({ number: trainNumber });
// //     if (!t) return { error: 'Train not found' };
// //     const base = t.delayMinutes || 0;
// //     const noise = Math.floor(Math.random() * 25);
// //     return { expectedDelayMinutes: base + noise, status: t.status };
// //   },
// // };


// const trainService   = require('../services/train.service');
// const bookingService = require('../services/booking.service');
// const paymentService = require('../services/payment.service');
// const kbService      = require('../services/knowledgeBase.service'); // ← was wrong import
// const { Train, Booking } = require('../models');

// /**
//  * LUXURY train name keywords — used to filter when trainType = 'luxury'
//  */
// const LUXURY_KEYWORDS = [
//   'rajdhani', 'vande bharat', 'tejas', 'shatabdi', 'gatimaan',
//   'duronto', 'humsafar', 'antyodaya',
// ];

// const SUPERFAST_KEYWORDS = ['superfast', 'express', 'mail'];

// /**
//  * Filter trains by trainType field.
//  * Falls back to name-based matching if no trainType field on the document.
//  */
// function applyTrainTypeFilter(trains, trainType) {
//   if (!trainType || trainType === 'all') return trains;

//   return trains.filter((t) => {
//     const nameLower = (t.name || '').toLowerCase();
//     const typeLower = (t.trainType || t.type || '').toLowerCase();

//     if (trainType === 'luxury') {
//       return LUXURY_KEYWORDS.some((k) => nameLower.includes(k) || typeLower.includes(k));
//     }
//     if (trainType === 'superfast') {
//       return SUPERFAST_KEYWORDS.some((k) => nameLower.includes(k) || typeLower.includes(k));
//     }
//     if (trainType === 'express') {
//       return nameLower.includes('express') || nameLower.includes('mail') || typeLower.includes('express');
//     }
//     if (trainType === 'passenger') {
//       return typeLower.includes('passenger') || nameLower.includes('passenger');
//     }
//     return true;
//   });
// }

// /**
//  * Format a single train document into a clean client-facing object.
//  * trainService.search() returns: number, name, type, source, sourceCode,
//  * destination, destinationCode, departureTime, arrivalTime, durationMinutes,
//  * distanceKm, pantry, inventory, runningDays, availableClasses
//  */
// function formatTrain(t) {
//   return {
//     id:           String(t._id),
//     number:       t.number,
//     name:         t.name,
//     trainType:    t.type || 'express',
//     from:         t.source,
//     fromCode:     t.sourceCode,
//     to:           t.destination,
//     toCode:       t.destinationCode,
//     departure:    t.departureTime,
//     arrival:      t.arrivalTime,
//     duration:     t.durationMinutes ? `${Math.floor(t.durationMinutes/60)}h ${t.durationMinutes%60}m` : null,
//     distanceKm:   t.distanceKm || null,
//     pantry:       t.pantry || false,
//     runningDays:  t.runningDays || [],
//     classes:      (t.availableClasses || []).map(c => ({
//       class:     c.class,
//       available: c.available,
//       fare:      c.fare ? `₹${c.fare}` : 'N/A',
//     })),
//   };
// }

// /* ─────────────────────────────────────────────────────────────────────────────
//    Tool Executor Map
//    Each key matches a tool name in tools.schema.js.
//    Signature: async (args, ctx) → plain serialisable object
// ───────────────────────────────────────────────────────────────────────────── */
// module.exports = {

//   /* ── Search Trains ─────────────────────────────────────────────────────── */
//   search_trains: async (args) => {
//     const { from, to, date, class: travelClass, trainType = 'all', quota } = args;

//     // ── CRITICAL: trainService.search() uses sourceCode/destinationCode, NOT from/to
//     // Map common city names → station codes if user gave city names
//     const CITY_TO_CODE = {
//       'mumbai': 'CSTM', 'bombay': 'CSTM', 'mumbai central': 'BCT',
//       'delhi': 'NDLS', 'new delhi': 'NDLS', 'old delhi': 'DLI',
//       'pune': 'PUNE', 'bangalore': 'SBC', 'bengaluru': 'SBC',
//       'chennai': 'MAS', 'madras': 'MAS', 'kolkata': 'KOAA', 'calcutta': 'KOAA',
//       'hyderabad': 'HYB', 'ahmedabad': 'ADI', 'jaipur': 'JP',
//       'lucknow': 'LKO', 'agra': 'AGC', 'varanasi': 'BSB',
//       'patna': 'PNBE', 'bhopal': 'BPL', 'nagpur': 'NGP',
//       'surat': 'ST', 'indore': 'INDB', 'chandigarh': 'CDG',
//       'amritsar': 'ASR', 'goa': 'MAO', 'madgaon': 'MAO',
//       'kochi': 'ERS', 'ernakulam': 'ERS', 'trivandrum': 'TVC',
//       'coimbatore': 'CBE', 'vijayawada': 'BZA', 'visakhapatnam': 'VSKP',
//     };

//     const resolveCode = (input) => {
//       if (!input) return null;
//       const clean = input.trim().toUpperCase();
//       // If already looks like a station code (2-6 uppercase letters), use as-is
//       if (/^[A-Z]{2,6}$/.test(clean)) return clean;
//       // Try city name lookup
//       return CITY_TO_CODE[input.trim().toLowerCase()] || clean;
//     };

//     const sourceCode      = resolveCode(from);
//     const destinationCode = resolveCode(to);

//     // Use today's date if not provided
//     const journeyDate = date || new Date().toISOString().split('T')[0];

//     if (!sourceCode || !destinationCode) {
//       return { error: 'Source aur destination station codes required hain. Jaise: NDLS (Delhi), BCT (Mumbai), PUNE (Pune).' };
//     }

//     try {
//       // Pass using the exact parameter names trainService.search() expects
//       const raw = await trainService.search({
//         sourceCode,
//         destinationCode,
//         date: journeyDate,
//         class: travelClass,
//         quota,
//       });

//       if (!raw?.length) {
//         return {
//           found: 0,
//           message: `${from} se ${to} ke liye ${date} ko koi train nahi mili. Alag date ya route try karein.`,
//           trains: [],
//         };
//       }

//       // Apply client-side trainType filter (luxury / superfast / express)
//       const filtered = applyTrainTypeFilter(raw, trainType);

//       if (!filtered.length) {
//         return {
//           found: 0,
//           message: `${from} se ${to} ke liye ${trainType} trains nahi mili is date pe. Sabhi trains dekhne ke liye trainType hatao.`,
//           trains: [],
//         };
//       }

//       return {
//         found: filtered.length,
//         trains: filtered.slice(0, 8).map(formatTrain),
//       };
//     } catch (err) {
//       console.error('[Tool] search_trains error:', err.message);
//       return { error: 'Train search abhi available nahi hai. Thodi der baad try karein.' };
//     }
//   },

//   /* ── Check PNR ─────────────────────────────────────────────────────────── */
//   check_pnr: async ({ pnr }) => {
//     if (!pnr) return { error: 'PNR number required.' };

//     try {
//       const b = await bookingService.byPNR(String(pnr).trim());
//       if (!b) return { found: false, message: `PNR ${pnr} nahi mila. PNR number check karein.` };

//       return {
//         found:       true,
//         pnr:         b.pnr,
//         status:      b.status,
//         trainNumber: b.trainNumber,
//         trainName:   b.trainName,
//         from:        b.fromStation,
//         to:          b.toStation,
//         journeyDate: b.journeyDate,
//         class:       b.class,
//         quota:       b.quota,
//         passengers:  b.passengers.map((p) => ({
//           name:   p.name,
//           seat:   p.seatNumber  || 'Not assigned',
//           coach:  p.coach       || 'Not assigned',
//           status: p.status,
//         })),
//         totalAmount: b.totalAmount,
//       };
//     } catch (err) {
//       console.error('[Tool] check_pnr error:', err.message);
//       return { error: 'PNR check abhi nahi ho pa raha. Thodi der baad try karein.' };
//     }
//   },

//   /* ── Create Booking Draft ───────────────────────────────────────────────── */
//   create_booking_draft: async (args, ctx) => {
//     if (!ctx?.user) return { error: 'Booking ke liye login karein.' };

//     const required = ['trainId', 'journeyDate', 'class', 'fromCode', 'toCode', 'passengers'];
//     for (const f of required) {
//       if (!args[f]) return { error: `Missing required field: ${f}` };
//     }
//     if (!args.passengers?.length) return { error: 'Kam se kam ek passenger ki details dein.' };

//     try {
//       const b = await bookingService.createDraft(ctx.user._id, {
//         ...args,
//         quota: args.quota || 'GN',
//       });
//       return {
//         bookingId:   String(b._id),
//         pnr:         b.pnr,
//         totalAmount: b.totalAmount,
//         status:      b.status,
//         message:     `Draft booking taiyaar hai. Payment ke liye confirm karein. Total: ₹${b.totalAmount}`,
//       };
//     } catch (err) {
//       console.error('[Tool] create_booking_draft error:', err.message);
//       return { error: err.message || 'Booking draft create nahi hua. Dobara try karein.' };
//     }
//   },

//   /* ── Create Payment Order ───────────────────────────────────────────────── */
//   create_payment_order: async ({ bookingId }, ctx) => {
//     if (!ctx?.user) return { error: 'Payment ke liye login karein.' };
//     if (!bookingId) return { error: 'bookingId required.' };

//     try {
//       const { order, keyId } = await paymentService.createOrder(ctx.user._id, bookingId);
//       return {
//         orderId:  order.id,
//         amount:   order.amount,
//         currency: order.currency,
//         keyId,
//         message:  `Payment order ready. Amount: ₹${order.amount / 100}`,
//       };
//     } catch (err) {
//       console.error('[Tool] create_payment_order error:', err.message);
//       return { error: err.message || 'Payment order create nahi hua.' };
//     }
//   },

//   /* ── Cancel Booking ─────────────────────────────────────────────────────── */
//   cancel_booking: async ({ bookingId }, ctx) => {
//     if (!ctx?.user) return { error: 'Cancel karne ke liye login karein.' };
//     if (!bookingId) return { error: 'bookingId required.' };

//     try {
//       const b = await bookingService.cancel(ctx.user._id, bookingId);
//       return {
//         pnr:          b.pnr,
//         status:       b.status,
//         refundAmount: b.refundAmount,
//         message:      `Booking cancel ho gayi. Refund ₹${b.refundAmount} 3-7 business days mein aayega.`,
//       };
//     } catch (err) {
//       console.error('[Tool] cancel_booking error:', err.message);
//       return { error: err.message || 'Booking cancel nahi hui.' };
//     }
//   },

//   /* ── RAG / Knowledge Base Search ───────────────────────────────────────── */
//   rag_search: async ({ query, topK = 5 }) => {
//     if (!query?.trim()) return { error: 'Query required.' };

//     try {
//       const results = await kbService.hybridSearch(query.trim(), topK, 0.30);

//       if (!results.length) {
//         return {
//           found: 0,
//           message: 'Yeh policy/rule hamare knowledge base mein nahi mili. Helpline 139 pe call karein.',
//           results: [],
//         };
//       }

//       return {
//         found:   results.length,
//         results: results.map((r) => ({
//           title:   r.title,
//           source:  r.source  || null,
//           snippet: r.text.slice(0, 500),
//           score:   Number(r.score.toFixed(3)),
//         })),
//       };
//     } catch (err) {
//       console.error('[Tool] rag_search error:', err.message);
//       return { error: 'Knowledge base search abhi nahi ho pa rahi.' };
//     }
//   },

//   /* ── Predict Confirmation ───────────────────────────────────────────────── */
//   predict_confirmation: async ({ trainNumber, class: klass, waitlistPosition }) => {
//     if (!trainNumber || !klass || waitlistPosition == null) {
//       return { error: 'trainNumber, class, aur waitlistPosition teeno chahiye.' };
//     }

//     try {
//       const t = await Train.findOne({ number: trainNumber });
//       if (!t) return { error: `Train ${trainNumber} database mein nahi mili.` };

//       const inv  = t.inventory?.find((i) => i.class === klass);
//       const pool = inv?.totalSeats || 20;
//       const rate = Math.max(0.05, Math.min(0.95, 1 - waitlistPosition / Math.max(20, pool)));

//       return {
//         trainNumber,
//         class:             klass,
//         waitlistPosition,
//         probability:       Number(rate.toFixed(2)),
//         probabilityPct:    `${Math.round(rate * 100)}%`,
//         recommendation:    rate > 0.6
//           ? '✅ Confirm hone ke chances zyada hain.'
//           : rate > 0.35
//           ? '⚠️ Confirm hone ke chances medium hain. Alternate train bhi dekh lein.'
//           : '❌ Confirm hone ke chances kam hain. Alternate train book karein.',
//       };
//     } catch (err) {
//       console.error('[Tool] predict_confirmation error:', err.message);
//       return { error: 'Confirmation prediction abhi nahi ho pa rahi.' };
//     }
//   },

//   /* ── Predict Delay ──────────────────────────────────────────────────────── */
//   predict_delay: async ({ trainNumber }) => {
//     if (!trainNumber) return { error: 'trainNumber required.' };

//     try {
//       const t = await Train.findOne({ number: trainNumber });
//       if (!t) return { error: `Train ${trainNumber} database mein nahi mili.` };

//       const base  = t.delayMinutes || 0;
//       const noise = Math.floor(Math.random() * 20);
//       const total = base + noise;

//       return {
//         trainNumber,
//         trainName:            t.name,
//         expectedDelayMinutes: total,
//         status:               t.status || 'On time',
//         message:              total === 0
//           ? `${t.name} time pe chal rahi hai.`
//           : `${t.name} approximately ${total} minute late chal rahi hai.`,
//       };
//     } catch (err) {
//       console.error('[Tool] predict_delay error:', err.message);
//       return { error: 'Delay prediction abhi nahi ho pa rahi.' };
//     }
//   },

//   /* ── Get User Bookings ──────────────────────────────────────────────────── */
//   get_user_bookings: async ({ status = 'all', limit = 10 } = {}, ctx) => {
//     if (!ctx?.user) return { error: 'Bookings dekhne ke liye login karein.' };

//     try {
//       const query = { user: ctx.user._id };
//       if (status !== 'all') query.status = status;

//       const bookings = await Booking.find(query)
//         .sort('-createdAt')
//         .limit(limit)
//         .lean();

//       if (!bookings.length) {
//         return { found: 0, message: 'Aapki koi booking nahi mili.', bookings: [] };
//       }

//       return {
//         found:    bookings.length,
//         bookings: bookings.map((b) => ({
//           bookingId:   String(b._id),
//           pnr:         b.pnr,
//           trainNumber: b.trainNumber,
//           trainName:   b.trainName,
//           from:        b.fromStation,
//           to:          b.toStation,
//           journeyDate: b.journeyDate,
//           class:       b.class,
//           status:      b.status,
//           amount:      b.totalAmount,
//         })),
//       };
//     } catch (err) {
//       console.error('[Tool] get_user_bookings error:', err.message);
//       return { error: 'Bookings fetch nahi ho payi.' };
//     }
//   },
// };





/**
 * tools.executor.js
 * Maps tool name → async function(args, ctx).
 * Exactly 9 tools — all backed by real DB calls.
 */

const trainService   = require('../services/train.service');
const bookingService = require('../services/booking.service');
const paymentService = require('../services/payment.service');
const kbService      = require('../services/knowledgeBase.service');
const { Train, Booking } = require('../models');

/* ─── City name → Station code map ─────────────────────────────────────── */
const CITY_TO_CODE = {
  // Major metros
  'mumbai': 'CSTM', 'bombay': 'CSTM', 'mumbai cst': 'CSTM',
  'mumbai central': 'BCT', 'bandra terminus': 'BDTS',
  'delhi': 'NDLS', 'new delhi': 'NDLS', 'old delhi': 'DLI',
  'hazrat nizamuddin': 'NZM', 'anand vihar': 'ANVT',
  'kolkata': 'KOAA', 'calcutta': 'KOAA', 'howrah': 'HWH', 'sealdah': 'SDAH',
  'chennai': 'MAS', 'madras': 'MAS', 'chennai egmore': 'MS',
  'bangalore': 'SBC', 'bengaluru': 'SBC', 'bangalore city': 'SBC',
  'hyderabad': 'HYB', 'secunderabad': 'SC', 'kacheguda': 'KCG',
  // Tier 2
  'pune': 'PUNE', 'ahmedabad': 'ADI', 'surat': 'ST',
  'jaipur': 'JP', 'jodhpur': 'JU', 'udaipur': 'UDZ',
  'lucknow': 'LKO', 'lucknow nr': 'LKO', 'lucknow ne': 'LJN',
  'agra': 'AGC', 'agra cantt': 'AGC', 'mathura': 'MTJ',
  'varanasi': 'BSB', 'mughal sarai': 'MGS', 'prayagraj': 'ALD', 'allahabad': 'ALD',
  'patna': 'PNBE', 'gaya': 'GAYA', 'ranchi': 'RNC',
  'bhopal': 'BPL', 'indore': 'INDB', 'ujjain': 'UJN', 'nagpur': 'NGP',
  'chandigarh': 'CDG', 'amritsar': 'ASR', 'ludhiana': 'LDH', 'jalandhar': 'JUC',
  'dehradun': 'DDN', 'haridwar': 'HW', 'rishikesh': 'RKSH',
  'goa': 'MAO', 'madgaon': 'MAO', 'vasco': 'VSG',
  'kochi': 'ERS', 'ernakulam': 'ERS', 'trivandrum': 'TVC', 'thiruvananthapuram': 'TVC',
  'coimbatore': 'CBE', 'madurai': 'MDU', 'tirupati': 'TPTY',
  'vijayawada': 'BZA', 'visakhapatnam': 'VSKP', 'vizag': 'VSKP',
  'bhubaneswar': 'BBS', 'puri': 'PURI', 'cuttack': 'CTC',
  'guwahati': 'GHY', 'dibrugarh': 'DBRG',
  'jammu': 'JAT', 'udhampur': 'UHP',
  'mysore': 'MYS', 'mysuru': 'MYS', 'hubli': 'UBL', 'belgaum': 'BGM',
};

/**
 * Resolve city name or code to uppercase station code.
 */
function resolveCode(input) {
  if (!input) return null;
  const trimmed = input.trim();
  // Already looks like a code (2–6 uppercase letters/digits)
  if (/^[A-Z0-9]{2,6}$/.test(trimmed)) return trimmed;
  // Try lowercase city lookup
  const found = CITY_TO_CODE[trimmed.toLowerCase()];
  if (found) return found;
  // Return uppercased as fallback
  return trimmed.toUpperCase();
}

/**
 * Luxury/express train name keywords for client-side filtering.
 */
const LUXURY_NAMES = ['rajdhani', 'vande bharat', 'tejas', 'shatabdi', 'gatimaan', 'duronto', 'humsafar'];
const EXPRESS_NAMES = ['express', 'mail', 'superfast', 'intercity'];

function filterByTrainType(trains, trainType) {
  if (!trainType || trainType === 'all') return trains;
  return trains.filter(t => {
    const name = (t.name || '').toLowerCase();
    const type = (t.type || '').toLowerCase();
    if (trainType === 'luxury')     return LUXURY_NAMES.some(k => name.includes(k) || type.includes(k));
    if (trainType === 'express')    return EXPRESS_NAMES.some(k => name.includes(k) || type.includes(k));
    if (trainType === 'superfast')  return name.includes('superfast') || type.includes('superfast');
    if (trainType === 'passenger')  return type.includes('passenger') || name.includes('passenger');
    return true;
  });
}

/**
 * Format a train document for the LLM to present.
 */
function formatTrain(t) {
  return {
    id:          String(t._id),
    number:      t.number,
    name:        t.name,
    type:        t.type || 'express',
    from:        t.source,
    fromCode:    t.sourceCode,
    to:          t.destination,
    toCode:      t.destinationCode,
    departure:   t.departureTime,
    arrival:     t.arrivalTime,
    duration:    t.durationMinutes
                   ? `${Math.floor(t.durationMinutes / 60)}h ${t.durationMinutes % 60}m`
                   : null,
    distanceKm:  t.distanceKm || null,
    pantry:      t.pantry || false,
    runningDays: t.runningDays || [],
    classes:     (t.availableClasses || []).map(c => ({
      class:     c.class,
      available: c.available ?? 0,
      fare:      c.fare ? `₹${c.fare}` : 'N/A',
    })),
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXECUTOR MAP
═══════════════════════════════════════════════════════════════════════════ */
module.exports = {

  /* ── 1. search_trains ─────────────────────────────────────────────────── */
  search_trains: async (args) => {
    const { from, to, date, class: cls, trainType = 'all', quota } = args;

    const sourceCode      = resolveCode(from);
    const destinationCode = resolveCode(to);
    const journeyDate     = date || new Date().toISOString().split('T')[0];

    if (!sourceCode || !destinationCode) {
      return { error: 'Source aur destination dono batao. Jaise: "Delhi se Mumbai"' };
    }

    try {
      const raw = await trainService.search({
        sourceCode,
        destinationCode,
        date: journeyDate,
        class: cls,
        quota,
      });

      if (!raw?.length) {
        return {
          found: 0,
          message: `${sourceCode} se ${destinationCode} ke liye ${journeyDate} ko koi train nahi mili. Kripya alag date ya route try karein.`,
          trains: [],
        };
      }

      const filtered = filterByTrainType(raw, trainType);

      if (!filtered.length) {
        return {
          found: 0,
          message: `Is route pe "${trainType}" type ki trains nahi hain. Kya sabhi trains dekhein?`,
          trains: [],
        };
      }

      return {
        found:  filtered.length,
        route:  `${sourceCode} → ${destinationCode}`,
        date:   journeyDate,
        trains: filtered.slice(0, 8).map(formatTrain),
      };
    } catch (err) {
      console.error('[Tool:search_trains]', err.message);
      return { error: 'Train search abhi available nahi hai. Thodi der baad try karein.' };
    }
  },

  /* ── 2. check_pnr ─────────────────────────────────────────────────────── */
  check_pnr: async ({ pnr }) => {
    if (!pnr) return { error: 'PNR number required.' };

    try {
      const b = await bookingService.byPNR(String(pnr).trim());
      if (!b) {
        return { found: false, message: `PNR ${pnr} nahi mila. PNR number dobara check karein.` };
      }

      return {
        found:        true,
        bookingId:    String(b._id),
        pnr:          b.pnr,
        status:       b.status,
        trainNumber:  b.trainNumber,
        trainName:    b.trainName,
        from:         b.fromStation,
        to:           b.toStation,
        journeyDate:  b.journeyDate,
        class:        b.class,
        quota:        b.quota,
        totalAmount:  b.totalAmount,
        refundAmount: b.refundAmount || 0,
        passengers:   (b.passengers || []).map(p => ({
          name:   p.name,
          coach:  p.coach  || 'Not assigned',
          seat:   p.seatNumber || 'Not assigned',
          status: p.status,
        })),
      };
    } catch (err) {
      console.error('[Tool:check_pnr]', err.message);
      return { error: 'PNR check abhi nahi ho pa raha. Thodi der baad try karein.' };
    }
  },

  /* ── 3. create_booking_draft ──────────────────────────────────────────── */
  create_booking_draft: async (args, ctx) => {
    if (!ctx?.user) return { error: 'Booking ke liye login karein.' };

    const { trainId, journeyDate, class: cls, fromCode, toCode, passengers, quota } = args;

    if (!trainId || !journeyDate || !cls || !fromCode || !toCode) {
      return { error: 'Train, date, class, aur stations required hain.' };
    }
    if (!passengers?.length) {
      return { error: 'Kam se kam ek passenger ki details dein (naam, age, gender).' };
    }
    if (passengers.length > 6) {
      return { error: 'Ek booking mein max 6 passengers allowed hain.' };
    }

    try {
      const b = await bookingService.createDraft(ctx.user._id, {
        trainId, journeyDate, class: cls, fromCode, toCode,
        quota: quota || 'GN',
        passengers,
      });

      return {
        success:     true,
        bookingId:   String(b._id),
        pnr:         b.pnr,
        status:      b.status,
        totalAmount: b.totalAmount,
        message:     `Draft ready! Total: ₹${b.totalAmount}. Payment ke liye confirm karein.`,
      };
    } catch (err) {
      console.error('[Tool:create_booking_draft]', err.message);
      return { error: err.message || 'Booking draft nahi bana. Dobara try karein.' };
    }
  },

  /* ── 4. create_payment_order ──────────────────────────────────────────── */
  create_payment_order: async ({ bookingId }, ctx) => {
    if (!ctx?.user) return { error: 'Payment ke liye login karein.' };
    if (!bookingId)  return { error: 'bookingId required.' };

    try {
      const { order, keyId } = await paymentService.createOrder(ctx.user._id, bookingId);
      return {
        success:  true,
        orderId:  order.id,
        amount:   order.amount,
        currency: order.currency,
        keyId,
        message:  `Payment order ready. Amount: ₹${Math.round(order.amount / 100)}. Razorpay se pay karein.`,
      };
    } catch (err) {
      console.error('[Tool:create_payment_order]', err.message);
      return { error: err.message || 'Payment order nahi bana. Dobara try karein.' };
    }
  },

  /* ── 5. cancel_booking ────────────────────────────────────────────────── */
  cancel_booking: async ({ bookingId }, ctx) => {
    if (!ctx?.user) return { error: 'Cancel ke liye login karein.' };
    if (!bookingId)  return { error: 'bookingId required.' };

    try {
      const b = await bookingService.cancel(ctx.user._id, bookingId);
      return {
        success:      true,
        pnr:          b.pnr,
        status:       b.status,
        refundAmount: b.refundAmount,
        message:      `Booking cancel ho gayi. Refund ₹${b.refundAmount} 3-7 business days mein aayega.`,
      };
    } catch (err) {
      console.error('[Tool:cancel_booking]', err.message);
      return { error: err.message || 'Booking cancel nahi hui. Dobara try karein.' };
    }
  },

  /* ── 6. rag_search ────────────────────────────────────────────────────── */
  rag_search: async ({ query, topK = 5 }) => {
    if (!query?.trim()) return { error: 'Search query required.' };

    try {
      const results = await kbService.hybridSearch(query.trim(), Math.min(topK, 8), 0.28);

      if (!results.length) {
        return {
          found:   0,
          message: 'Yeh information hamare knowledge base mein nahi mili. IRCTC helpline 139 pe call karein.',
          results: [],
        };
      }

      return {
        found:   results.length,
        results: results.map(r => ({
          title:   r.title,
          source:  r.source || null,
          snippet: r.text.slice(0, 600),
          score:   Number(r.score.toFixed(3)),
        })),
      };
    } catch (err) {
      console.error('[Tool:rag_search]', err.message);
      return { error: 'Knowledge base search abhi nahi ho pa rahi. Thodi der baad try karein.' };
    }
  },

  /* ── 7. predict_confirmation ──────────────────────────────────────────── */
  predict_confirmation: async ({ trainNumber, class: klass, waitlistPosition }) => {
    if (!trainNumber || !klass || waitlistPosition == null) {
      return { error: 'trainNumber, class, aur waitlistPosition teeno chahiye.' };
    }

    try {
      const t = await Train.findOne({ number: String(trainNumber) }).lean();
      if (!t) return { error: `Train ${trainNumber} database mein nahi mili.` };

      const inv   = (t.inventory || []).find(i => i.class === klass);
      const seats = inv?.totalSeats || 20;
      const prob  = Math.max(0.05, Math.min(0.95, 1 - waitlistPosition / Math.max(20, seats)));

      let recommendation, emoji;
      if (prob > 0.65)      { recommendation = 'Confirm hone ke chances zyada hain. Wait karein.';          emoji = '✅'; }
      else if (prob > 0.35) { recommendation = 'Medium chances hain. Alternate train bhi check karein.';     emoji = '⚠️'; }
      else                   { recommendation = 'Chances kam hain. Alternate train book karna better rahega.'; emoji = '❌'; }

      return {
        trainNumber,
        trainName:        t.name,
        class:            klass,
        waitlistPosition,
        probability:      Number(prob.toFixed(2)),
        probabilityPct:   `${Math.round(prob * 100)}%`,
        emoji,
        recommendation,
      };
    } catch (err) {
      console.error('[Tool:predict_confirmation]', err.message);
      return { error: 'Confirmation prediction abhi nahi ho pa rahi.' };
    }
  },

  /* ── 8. predict_delay ─────────────────────────────────────────────────── */
  predict_delay: async ({ trainNumber }) => {
    if (!trainNumber) return { error: 'Train number required.' };

    try {
      const t = await Train.findOne({ number: String(trainNumber) }).lean();
      if (!t) return { error: `Train ${trainNumber} database mein nahi mili.` };

      const base  = t.delayMinutes || 0;
      const noise = Math.floor(Math.random() * 15);
      const total = base + noise;

      return {
        trainNumber,
        trainName:            t.name,
        status:               t.status || 'scheduled',
        expectedDelayMinutes: total,
        message: total === 0
          ? `✅ ${t.name} time pe chal rahi hai.`
          : total < 30
          ? `🟡 ${t.name} approximately ${total} minute late hai.`
          : `🔴 ${t.name} ${total} minute late chal rahi hai. Alternate plan consider karein.`,
      };
    } catch (err) {
      console.error('[Tool:predict_delay]', err.message);
      return { error: 'Delay prediction abhi nahi ho pa rahi.' };
    }
  },

  /* ── 9. get_user_bookings ─────────────────────────────────────────────── */
  get_user_bookings: async ({ status = 'all', limit = 10 } = {}, ctx) => {
    if (!ctx?.user) return { error: 'Bookings dekhne ke liye login karein.' };

    try {
      const query = { user: ctx.user._id };
      if (status && status !== 'all') query.status = status;

      const bookings = await Booking.find(query)
        .sort('-createdAt')
        .limit(Math.min(limit, 20))
        .lean();

      if (!bookings.length) {
        return { found: 0, message: 'Aapki koi booking nahi mili.', bookings: [] };
      }

      return {
        found:    bookings.length,
        bookings: bookings.map(b => ({
          bookingId:   String(b._id),
          pnr:         b.pnr,
          trainNumber: b.trainNumber,
          trainName:   b.trainName,
          from:        b.fromStation,
          to:          b.toStation,
          journeyDate: b.journeyDate,
          class:       b.class,
          status:      b.status,
          amount:      b.totalAmount,
          passengers:  (b.passengers || []).length,
        })),
      };
    } catch (err) {
      console.error('[Tool:get_user_bookings]', err.message);
      return { error: 'Bookings fetch nahi ho payi. Dobara try karein.' };
    }
  },

};