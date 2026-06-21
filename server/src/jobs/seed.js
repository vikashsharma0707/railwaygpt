/* Seed initial users, trains, knowledge. Run: node src/jobs/seed.js */
require('dotenv').config();
const mongoose = require('mongoose');
const env = require('../config/env');
const { User, Train, KnowledgeBase, Agent } = require('../models');
const agents = require('../agents/agents.catalog');
const rag = require('../rag/rag.service');

const SAMPLE_TRAINS = [
  {
    number: '12951', name: 'Mumbai Rajdhani', type: 'rajdhani',
    source: 'Mumbai Central', sourceCode: 'BCT',
    destination: 'New Delhi', destinationCode: 'NDLS',
    departureTime: '16:55', arrivalTime: '08:35', durationMinutes: 940, distanceKm: 1384,
    runningDays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    pantry: true,
    stops: [
      { station: 'Mumbai Central', code: 'BCT', departureTime: '16:55', day: 1, distanceKm: 0, platform: 5 },
      { station: 'Borivali', code: 'BVI', arrivalTime: '17:24', departureTime: '17:26', day: 1, distanceKm: 30, platform: 1 },
      { station: 'Surat', code: 'ST', arrivalTime: '19:50', departureTime: '19:55', day: 1, distanceKm: 263, platform: 3 },
      { station: 'Vadodara', code: 'BRC', arrivalTime: '21:23', departureTime: '21:30', day: 1, distanceKm: 392, platform: 2 },
      { station: 'Kota', code: 'KOTA', arrivalTime: '02:30', departureTime: '02:40', day: 2, distanceKm: 859, platform: 1 },
      { station: 'New Delhi', code: 'NDLS', arrivalTime: '08:35', day: 2, distanceKm: 1384, platform: 16 },
    ],
    inventory: [
      { class: '3A', totalSeats: 240, availableSeats: 188, fare: 2310 },
      { class: '2A', totalSeats: 96,  availableSeats: 32, fare: 3275 },
      { class: '1A', totalSeats: 24,  availableSeats: 8,  fare: 5510 },
    ],
  },
  {
    number: '12009', name: 'Shatabdi Express', type: 'shatabdi',
    source: 'Mumbai Central', sourceCode: 'BCT',
    destination: 'Ahmedabad Jn', destinationCode: 'ADI',
    departureTime: '06:25', arrivalTime: '13:10', durationMinutes: 405, distanceKm: 491,
    runningDays: ['Mon','Tue','Wed','Thu','Fri','Sat'],
    stops: [
      { station: 'Mumbai Central', code: 'BCT', departureTime: '06:25', day: 1, distanceKm: 0 },
      { station: 'Surat', code: 'ST', arrivalTime: '09:05', departureTime: '09:08', day: 1, distanceKm: 263 },
      { station: 'Vadodara', code: 'BRC', arrivalTime: '10:30', departureTime: '10:35', day: 1, distanceKm: 392 },
      { station: 'Ahmedabad Jn', code: 'ADI', arrivalTime: '13:10', day: 1, distanceKm: 491 },
    ],
    inventory: [
      { class: 'CC', totalSeats: 480, availableSeats: 320, fare: 950 },
      { class: '1A', totalSeats: 30,  availableSeats: 12, fare: 1840 },
    ],
  },
  {
    number: '22691', name: 'Rajdhani Express', type: 'rajdhani',
    source: 'KSR Bengaluru', sourceCode: 'SBC',
    destination: 'Hazrat Nizamuddin', destinationCode: 'NZM',
    departureTime: '20:00', arrivalTime: '05:55', durationMinutes: 2155, distanceKm: 2444,
    runningDays: ['Mon','Wed','Fri','Sun'],
    stops: [
      { station: 'KSR Bengaluru', code: 'SBC', departureTime: '20:00', day: 1, distanceKm: 0 },
      { station: 'Hazrat Nizamuddin', code: 'NZM', arrivalTime: '05:55', day: 3, distanceKm: 2444 },
    ],
    inventory: [
      { class: '3A', totalSeats: 240, availableSeats: 96, fare: 3010 },
      { class: '2A', totalSeats: 96,  availableSeats: 22, fare: 4360 },
      { class: '1A', totalSeats: 24,  availableSeats: 4,  fare: 7340 },
    ],
  },
];

const SAMPLE_KB = [
  { title: 'Cancellation Policy', category: 'policy',
    content: 'Cancellation charges depend on the time of cancellation. More than 48 hours before departure: ₹240 for AC First, ₹200 for AC2/FC, ₹180 for AC3/CC, ₹120 for SL, ₹60 for 2S. Between 48-12 hours: 25% of fare. Between 12-4 hours: 50% of fare. Less than 4 hours: no refund. Waitlisted/RAC tickets get full refund minus clerkage if cancelled up to 30 minutes before train departure.' },
  { title: 'Tatkal Booking Rules', category: 'rule',
    content: 'Tatkal booking opens one day in advance of the journey date excluding the date of journey. AC class Tatkal opens at 10:00 AM, non-AC at 11:00 AM. Tatkal charges are over and above the normal fare. Valid ID proof is mandatory while travelling on a Tatkal ticket.' },
  { title: 'Senior Citizen Concession', category: 'policy',
    content: 'Male senior citizens (60+) and female senior citizens (58+) are eligible for concession. Concession can be availed by submitting age proof at the time of booking. As per latest rules, concessions on regular trains are currently suspended for review.' },
  { title: 'PNR Status Codes', category: 'faq',
    content: 'CNF: Confirmed. RAC: Reservation Against Cancellation (you get a seat shared with another). WL: Waitlist (no seat until confirmed). GNWL: General waitlist. PQWL: Pooled quota waitlist. RLWL: Remote location waitlist. TQWL: Tatkal waitlist (very low confirmation chance).' },
];

async function run() {
  await mongoose.connect(env.MONGO_URI);
  await Promise.all([User.deleteMany({}), Train.deleteMany({}), KnowledgeBase.deleteMany({}), Agent.deleteMany({})]);

  await User.create({ name: 'Admin', email: 'admin@railwaygpt.ai', password: 'admin123', role: 'admin' });
  await User.create({ name: 'Demo User', email: 'demo@railwaygpt.ai', password: 'demo1234', role: 'user' });
  await Train.insertMany(SAMPLE_TRAINS);

  for (const a of agents) {
    await Agent.create({ key: a.key, name: a.name, category: a.category, systemPrompt: a.prompt });
  }
  for (const kb of SAMPLE_KB) {
    await rag.ingest({ ...kb, tags: [kb.category] });
  }

  console.log('Seed complete: admin@railwaygpt.ai / admin123');
  await mongoose.disconnect();
}
run().catch((e) => { console.error(e); process.exit(1); });
