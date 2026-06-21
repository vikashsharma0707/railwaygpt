const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/ApiResponse');
const notif = require('../services/notification.service');

exports.list = asyncHandler(async (req, res) => apiResponse(res, await notif.list(req.user._id)));
exports.markRead = asyncHandler(async (req, res) => apiResponse(res, await notif.markRead(req.params.id, req.user._id)));
exports.broadcast = asyncHandler(async (req, res) => apiResponse(res, await notif.broadcast(req.body), 'Broadcast'));
