// const mongoose = require('mongoose');
// const { TRAIN_STATUS, CLASSES, QUOTAS } = require('../constants');

// const stopSchema = new mongoose.Schema({
//   station: { type: String, required: true },
//   code: { type: String, required: true, uppercase: true },
//   arrivalTime: String,
//   departureTime: String,
//   day: { type: Number, default: 1 },
//   distanceKm: { type: Number, default: 0 },
//   platform: { type: Number, default: 1 },
//   haltMinutes: { type: Number, default: 2 },
// }, { _id: false });

// const classInventorySchema = new mongoose.Schema({
//   class: { type: String, enum: CLASSES, required: true },
//   totalSeats: { type: Number, required: true },
//   availableSeats: { type: Number, required: true },
//   fare: { type: Number, required: true },
//   quotas: [{
//     type: { type: String, enum: QUOTAS, default: 'GN' },
//     total: Number, available: Number,
//   }],
// }, { _id: false });

// // const trainSchema = new mongoose.Schema({
// //   number: { type: String, required: true, unique: true, index: true },
// //   name: { type: String, required: true, trim: true },
// //   type: { type: String, enum: ['express','superfast','rajdhani','shatabdi','vande-bharat','duronto','passenger','special','festival'], default: 'express' },
// //   source: { type: String, required: true },
// //   sourceCode: { type: String, required: true, uppercase: true, index: true },
// //   destination: { type: String, required: true },
// //   destinationCode: { type: String, required: true, uppercase: true, index: true },
// //   stops: [stopSchema],
// //   runningDays: { type: [String], default: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
// //   departureTime: String,
// //   arrivalTime: String,
// //   durationMinutes: Number,
// //   distanceKm: Number,
// //   inventory: [classInventorySchema],
// //   status: { type: String, enum: TRAIN_STATUS, default: 'scheduled' },
// //   delayMinutes: { type: Number, default: 0 },
// //   currentLocation: String,
// //   isActive: { type: Boolean, default: true },
// //   isSpecial: { type: Boolean, default: false },
// //   rake: String,
// //   pantry: { type: Boolean, default: false },
// // }, { timestamps: true });


// const trainSchema = new mongoose.Schema({
//   number: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   type: { type: String, enum: ['rajdhani','shatabdi','express','superfast','mail'], required: true },

//   // Make these required false temporarily for easy admin entry
//   source: { type: String, required: false },           // ← change to false
//   sourceCode: { type: String, required: false, uppercase: true }, 
//   destination: { type: String, required: false },
//   destinationCode: { type: String, required: false, uppercase: true },

//   // OR better: Add pre-save middleware
//   departureTime: String,
//   arrivalTime: String,
//   durationMinutes: Number,
//   distanceKm: Number,

//   runningDays: [String],
//   pantry: Boolean,
//   stops: [{ /* ... */ }],
//   inventory: [{ /* ... */ }],
// }, { timestamps: true });

// // Optional: Auto-fill codes if only names are given
// trainSchema.pre('save', function(next) {
//   if (this.source && !this.sourceCode) {
//     this.sourceCode = this.source.substring(0,3).toUpperCase();
//   }
//   if (this.destination && !this.destinationCode) {
//     this.destinationCode = this.destination.substring(0,3).toUpperCase();
//   }
//   next();
// });

// trainSchema.index({ sourceCode: 1, destinationCode: 1 });
// trainSchema.index({ name: 'text', number: 'text' });

// module.exports = mongoose.model('Train', trainSchema);

const mongoose = require('mongoose');

const classInventorySchema = new mongoose.Schema({
  class: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  fare: { type: Number, required: true },
}, { _id: false });

const trainSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },

  type: { 
    type: String, 
    enum: ['rajdhani', 'shatabdi', 'express', 'superfast', 'mail'], 
    required: true,
    default: 'express' 
  },

  // Made required true but with strong pre-save backup
  source: { type: String, required: true, trim: true },
  sourceCode: { type: String, required: true, uppercase: true, trim: true },
  destination: { type: String, required: true, trim: true },
  destinationCode: { type: String, required: true, uppercase: true, trim: true },

  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1, default: 300 },
  distanceKm: { type: Number, required: true, min: 1, default: 500 },

  pantry: { type: Boolean, default: true },
  runningDays: { type: [String], default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  inventory: { type: [classInventorySchema], default: [] },

}, { timestamps: true });

// 🔥 Strong Pre-save Hook
trainSchema.pre('save', function(next) {
  // Auto fill codes
  if (this.source && !this.sourceCode) {
    this.sourceCode = this.source.trim().slice(0, 3).toUpperCase();
  }
  if (this.destination && !this.destinationCode) {
    this.destinationCode = this.destination.trim().slice(0, 3).toUpperCase();
  }

  // Last safety net
  if (!this.sourceCode) this.sourceCode = "SRC";
  if (!this.destinationCode) this.destinationCode = "DST";
  if (!this.durationMinutes) this.durationMinutes = 300;
  if (!this.distanceKm) this.distanceKm = 500;

  next();
});

module.exports = mongoose.model('Train', trainSchema);