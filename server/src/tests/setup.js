const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  process.env.JWT_ACCESS_SECRET = 'test'; process.env.JWT_REFRESH_SECRET = 'test';
  await mongoose.connect(process.env.MONGO_URI);
});
afterAll(async () => { await mongoose.disconnect(); await mongod.stop(); });
afterEach(async () => {
  const cols = await mongoose.connection.db.collections();
  for (const c of cols) await c.deleteMany({});
});
