const cron = require('node-cron');
const logger = require('../config/logger');
const { Train, Session } = require('../models');

exports.startJobs = () => {
  // Clean expired sessions hourly
  cron.schedule('0 * * * *', async () => {
    const r = await Session.deleteMany({ $or: [{ expiresAt: { $lt: new Date() } }, { revoked: true, updatedAt: { $lt: new Date(Date.now() - 7 * 86400000) } }] });
    logger.info(`Session cleanup: removed ${r.deletedCount}`);
  });

  // Reset transient delay every midnight
  cron.schedule('0 0 * * *', async () => {
    await Train.updateMany({ status: 'delayed' }, { delayMinutes: 0, status: 'scheduled' });
    logger.info('Train delays reset for the day');
  });
};
