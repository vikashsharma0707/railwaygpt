const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: String,
  fromCode: { type: String, uppercase: true, required: true },
  toCode: { type: String, uppercase: true, required: true },
  intermediateStations: [{ code: String, name: String, distanceKm: Number }],
  totalDistanceKm: Number,
  travelTimeMinutes: Number,
  isDiversion: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
