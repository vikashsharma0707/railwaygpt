const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/ApiResponse');
const { User, Train, Booking, Payment, AgentLog } = require('../models');
const audit = require('../services/audit.service');

exports.users = asyncHandler(async (req, res) => apiResponse(res, await User.find().sort('-createdAt').limit(500)));
exports.blockUser = asyncHandler(async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
  audit.log(req, { action: 'user.block', resource: 'User', resourceId: req.params.id, severity: 'warning' });
  apiResponse(res, u, 'Blocked');
});
exports.unblockUser = asyncHandler(async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
  apiResponse(res, u, 'Unblocked');
});
exports.updateUser = asyncHandler(async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  apiResponse(res, u, 'Updated');
});

exports.auditLogs = asyncHandler(async (req, res) => apiResponse(res, await audit.list()));
exports.agentLogs = asyncHandler(async (req, res) =>
  apiResponse(res, await AgentLog.find().sort('-createdAt').limit(500).populate('user', 'name email')));

exports.dashboard = asyncHandler(async (req, res) => {
  const [users, trains, bookings, payments, revenueAgg, popularAgg, recent] = await Promise.all([
    User.countDocuments(),
    Train.countDocuments(),
    Booking.countDocuments(),
    Payment.countDocuments({ status: 'paid' }),
    Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    Booking.aggregate([
      { $group: { _id: { from: '$fromCode', to: '$toCode' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } }, { $limit: 10 },
    ]),
    Booking.find().sort('-createdAt').limit(10).populate('user', 'name email'),
  ]);
  const revenue = revenueAgg[0]?.total || 0;
  apiResponse(res, { users, trains, bookings, payments, revenue, popular: popularAgg, recent });
});

exports.analytics = asyncHandler(async (req, res) => {
  const days = 14;
  const since = new Date(Date.now() - days * 86400 * 1000);
  const dailyRevenue = await Payment.aggregate([
    { $match: { status: 'paid', createdAt: { $gte: since } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  const dailyBookings = await Booking.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  const cancellations = await Booking.aggregate([
    { $match: { status: 'cancelled', createdAt: { $gte: since } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$cancelledAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  const agentUsage = await AgentLog.aggregate([
    { $group: { _id: '$agent', count: { $sum: 1 }, avgLatency: { $avg: '$latencyMs' } } },
    { $sort: { count: -1 } }, { $limit: 12 },
  ]);
  apiResponse(res, { dailyRevenue, dailyBookings, cancellations, agentUsage });
});
