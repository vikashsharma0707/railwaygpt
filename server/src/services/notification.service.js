const { Notification } = require('../models');

let io = null;
exports.bindIO = (i) => { io = i; };

exports.create = async (notif) => {
  const n = await Notification.create(notif);
  if (io) {
    if (n.isGlobal) io.emit('notification', n);
    else if (n.user) io.to(`user:${n.user}`).emit('notification', n);
  }
  return n;
};

exports.list = (userId) => Notification.find({ $or: [{ user: userId }, { isGlobal: true }] }).sort('-createdAt').limit(100);
exports.markRead = (id, userId) => Notification.findOneAndUpdate({ _id: id, user: userId }, { isRead: true }, { new: true });
exports.broadcast = (payload) => exports.create({ ...payload, isGlobal: true });
