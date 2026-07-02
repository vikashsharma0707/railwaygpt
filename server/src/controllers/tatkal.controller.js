/**
 * tatkal.controller.js
 * server/src/controllers/tatkal.controller.js
 */

const asyncHandler   = require('../utils/asyncHandler');
const apiResponse    = require('../utils/ApiResponse');
const tatkalService  = require('../services/tatkal.service');

// ── GET /api/tatkal/availability ──────────────────────────────────────────────
// Query params: trainId, class, date
exports.availability = asyncHandler(async (req, res) => {
  const { trainId, class: travelClass, date } = req.query;

  if (!trainId || !travelClass || !date) {
    return apiResponse(res, null, 'trainId, class and date are required', 400);
  }

  const result = await tatkalService.getAvailability(trainId, travelClass, date);
  apiResponse(res, result, 'Tatkal availability fetched');
});

// ── POST /api/tatkal/book ─────────────────────────────────────────────────────
exports.book = asyncHandler(async (req, res) => {
  const result = await tatkalService.createTatkalDraft(req.user._id, req.body);
  apiResponse(res, result, 'Tatkal booking draft created successfully', 201);
});

// ── GET /api/tatkal/window-status ─────────────────────────────────────────────
// Quick check without DB hit — just timing logic
exports.windowStatus = asyncHandler(async (req, res) => {
  const { class: travelClass, date } = req.query;

  if (!travelClass || !date) {
    return apiResponse(res, null, 'class and date are required', 400);
  }

  const status = tatkalService.getWindowStatus(date, travelClass);
  apiResponse(res, status, 'Window status fetched');
});