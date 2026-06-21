const mongoose = require('mongoose');
const env = require('./env');
const logger = require('./logger');

async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.MONGO_URI, { autoIndex: true });
  logger.info(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  mongoose.connection.on('error', (e) => logger.error('Mongo error', e));
  mongoose.connection.on('disconnected', () => logger.warn('Mongo disconnected'));
}

module.exports = { connectDB };
