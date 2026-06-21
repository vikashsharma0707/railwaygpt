// // require('./setup');
// // const request = require('supertest');
// // const app = require('../app');
// // const { Train } = require('../models');

// // describe('Trains', () => {
// //   beforeEach(async () => {
// //     await Train.create({
// //       number: '11111', name: 'Test Express', source: 'A', sourceCode: 'AAA',
// //       destination: 'B', destinationCode: 'BBB',
// //       stops: [
// //         { station: 'A', code: 'AAA', departureTime: '10:00', day: 1, distanceKm: 0 },
// //         { station: 'B', code: 'BBB', arrivalTime: '18:00', day: 1, distanceKm: 500 },
// //       ],
// //       inventory: [{ class: 'SL', totalSeats: 72, availableSeats: 72, fare: 300 }],
// //     });
// //   });
// //   it('searches trains', async () => {
// //     const r = await request(app).get('/api/trains/search').query({ from: 'AAA', to: 'BBB', date: new Date().toISOString().slice(0,10) });
// //     expect(r.status).toBe(200);
// //     expect(r.body.data.length).toBe(1);
// //   });
// // });




// require('./setup');
// const request = require('supertest');
// const app = require('../app');
// const { Train } = require('../models');

// describe('Trains', () => {
//   beforeEach(async () => {
//     await Train.deleteMany({ number: '11111' });

//     await Train.create({
//       number: '11111',
//       name: 'Test Express',
//       type: 'express',
//       source: 'Mumbai Central',
//       sourceCode: 'BCT',
//       destination: 'New Delhi',
//       destinationCode: 'NDLS',
//       departureTime: '16:55',
//       arrivalTime: '08:35',
//       durationMinutes: 960,
//       distanceKm: 1420,
//       runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // All days
//       pantry: true,
//       isActive: true,
//       status: 'scheduled',
//       inventory: [
//         { class: 'SL', totalSeats: 200, availableSeats: 180, fare: 450 },
//         { class: '3A', totalSeats: 300, availableSeats: 250, fare: 1200 }
//       ],
//       stops: [
//         { station: 'Mumbai Central', code: 'BCT', departureTime: '16:55', day: 1 },
//         { station: 'New Delhi', code: 'NDLS', arrivalTime: '08:35', day: 2 }
//       ]
//     });
//   });

//   afterEach(async () => {
//     await Train.deleteMany({ number: '11111' });
//   });

//   it('searches trains successfully', async () => {
//     const res = await request(app)
//       .get('/api/trains/search')
//       .query({
//         sourceCode: 'BCT',
//         destinationCode: 'NDLS',
//         date: new Date().toISOString().slice(0, 10)
//       });

//     expect(res.status).toBe(200);
    
//     const results = res.body.data || res.body || [];
//     expect(Array.isArray(results)).toBe(true);
//     expect(results.length).toBeGreaterThan(0);
//     expect(results[0].number).toBe('11111');
//   });

//   it('returns error when source or destination missing', async () => {
//     const res = await request(app)
//       .get('/api/trains/search')
//       .query({ sourceCode: 'BCT' });

//     expect([400, 500]).toContain(res.status);
//   });
// });



require('./setup');
const request   = require('supertest');
const app       = require('../app');
const { Train } = require('../models');

const TODAY = new Date().toISOString().slice(0, 10);

function getTodayAbbr() {
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [y, m, d] = TODAY.split('-').map(Number);
  return DAYS[new Date(y, m - 1, d).getDay()];
}

// Only fields that actually exist in the Train schema
const TEST_TRAIN = {
  number:          '11111',
  name:            'Test Express',
  type:            'express',
  source:          'Mumbai Central',
  sourceCode:      'BCT',
  destination:     'New Delhi',
  destinationCode: 'NDLS',
  departureTime:   '16:55',
  arrivalTime:     '08:35',
  durationMinutes: 960,
  distanceKm:      1420,
  runningDays:     ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  pantry:          true,
  inventory: [
    { class: 'SL', totalSeats: 200, availableSeats: 180, fare: 450  },
    { class: '3A', totalSeats: 300, availableSeats: 250, fare: 1200 },
  ],
  stops: [
    { station: 'Mumbai Central', code: 'BCT',  departureTime: '16:55', day: 1, distanceKm: 0    },
    { station: 'New Delhi',      code: 'NDLS', arrivalTime:   '08:35', day: 2, distanceKm: 1420 },
  ],
};

function unwrap(body) {
  if (Array.isArray(body))          return body;
  if (Array.isArray(body?.data))    return body.data;
  if (Array.isArray(body?.trains))  return body.trains;
  if (Array.isArray(body?.results)) return body.results;
  return [];
}

describe('Trains', () => {
  beforeEach(async () => {
    await Train.deleteMany({ number: '11111' });
    await Train.create(TEST_TRAIN);

    // Verify doc saved with only schema fields (no isActive/status assumed)
    const found = await Train.findOne({ number: '11111' });
    if (!found) throw new Error('beforeEach: Train was not saved!');

    // Verify the exact filter the service uses works
    const dayAbbr = getTodayAbbr();
    const byDay = await Train.findOne({
      sourceCode:      'BCT',
      destinationCode: 'NDLS',
      runningDays:     { $in: [dayAbbr] },
    });

    if (!byDay) {
      console.error('[beforeEach] runningDays filter still failing for:', dayAbbr);
      console.error('[beforeEach] stored runningDays:', found.runningDays);
    }
  });

  afterEach(async () => {
    await Train.deleteMany({ number: '11111' });
  });

  it('searches trains (sourceCode/destinationCode params)', async () => {
    const res = await request(app)
      .get('/api/trains/search')
      .query({ sourceCode: 'BCT', destinationCode: 'NDLS', date: TODAY });

    expect(res.status).toBe(200);
    const results = unwrap(res.body);

    if (results.length === 0) {
      console.error('[DEBUG] todayAbbr:', getTodayAbbr());
      console.error('[DEBUG] raw body :', JSON.stringify(res.body, null, 2));
    }

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].number).toBe('11111');
  });

  it('searches trains (from/to params)', async () => {
    const res = await request(app)
      .get('/api/trains/search')
      .query({ from: 'BCT', to: 'NDLS', date: TODAY });

    expect(res.status).toBe(200);
    const results = unwrap(res.body);

    if (results.length === 0) {
      console.error('[DEBUG] todayAbbr:', getTodayAbbr());
      console.error('[DEBUG] raw body :', JSON.stringify(res.body, null, 2));
    }

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].number).toBe('11111');
  });

  it('returns 400 when destination is missing', async () => {
    const res = await request(app)
      .get('/api/trains/search')
      .query({ sourceCode: 'BCT' });

    expect(res.status).toBe(400);
  });
});