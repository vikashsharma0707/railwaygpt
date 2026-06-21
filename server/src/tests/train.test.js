require('./setup');
const request = require('supertest');
const app = require('../app');
const { Train } = require('../models');

describe('Trains', () => {
  beforeEach(async () => {
    await Train.create({
      number: '11111', name: 'Test Express', source: 'A', sourceCode: 'AAA',
      destination: 'B', destinationCode: 'BBB',
      stops: [
        { station: 'A', code: 'AAA', departureTime: '10:00', day: 1, distanceKm: 0 },
        { station: 'B', code: 'BBB', arrivalTime: '18:00', day: 1, distanceKm: 500 },
      ],
      inventory: [{ class: 'SL', totalSeats: 72, availableSeats: 72, fare: 300 }],
    });
  });
  it('searches trains', async () => {
    const r = await request(app).get('/api/trains/search').query({ from: 'AAA', to: 'BBB', date: new Date().toISOString().slice(0,10) });
    expect(r.status).toBe(200);
    expect(r.body.data.length).toBe(1);
  });
});
