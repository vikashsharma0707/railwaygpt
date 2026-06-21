const { Server } = require('socket.io');
const { verifyAccess } = require('../utils/jwt');
const logger = require('../config/logger');
const notif = require('../services/notification.service');

function init(httpServer, opts) {
  const io = new Server(httpServer, {
    cors: { origin: opts.clientUrl, credentials: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next();
    try {
      const decoded = verifyAccess(token);
      socket.userId = decoded.sub;
      socket.role = decoded.role;
    } catch (_) {}
    next();
  });

  io.on('connection', (socket) => {
    if (socket.userId) socket.join(`user:${socket.userId}`);
    if (socket.role === 'admin') socket.join('admins');
    logger.debug(`Socket connected ${socket.id} user=${socket.userId || 'guest'}`);

    socket.on('train:subscribe', (trainNumber) => socket.join(`train:${trainNumber}`));
    socket.on('train:unsubscribe', (trainNumber) => socket.leave(`train:${trainNumber}`));

    socket.on('disconnect', () => logger.debug(`Socket disconnected ${socket.id}`));
  });

  notif.bindIO(io);
  return io;
}

module.exports = { init };
