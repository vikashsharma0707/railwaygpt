require('./setup');
const request = require('supertest');
const app = require('../app');

describe('Auth flow', () => {
  it('registers and logs in a user', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'T', email: 't@x.com', password: 'secret123',
    });
    expect(reg.status).toBe(201);
    expect(reg.body.data.access).toBeDefined();

    const login = await request(app).post('/api/auth/login').send({ email: 't@x.com', password: 'secret123' });
    expect(login.status).toBe(200);

    const me = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${login.body.data.access}`);
    expect(me.status).toBe(200);
    expect(me.body.data.email).toBe('t@x.com');
  });

  it('rejects bad credentials', async () => {
    await request(app).post('/api/auth/register').send({ name: 'T', email: 'a@x.com', password: 'secret123' });
    const r = await request(app).post('/api/auth/login').send({ email: 'a@x.com', password: 'wrong' });
    expect(r.status).toBe(401);
  });
});
