// const mongoose = require('mongoose');
// const { BOOKING_STATUS, CLASSES, QUOTAS } = require('../constants');

// const passengerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, enum: ['M','F','O'], required: true },
//   berthPreference: { type: String, enum: ['lower','middle','upper','side-lower','side-upper','any'], default: 'any' },
//   allocatedBerth: String,
//   seatNumber: String,
//   coach: String,
//   status: { type: String, enum: BOOKING_STATUS, default: 'pending' },
//   idType: String, idNumber: String,
// }, { _id: false });

// const bookingSchema = new mongoose.Schema({
//   pnr: { type: String, unique: true, index: true, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
//   train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true, index: true },
//   trainNumber: String,
//   trainName: String,
//   fromStation: String, fromCode: String,
//   toStation: String, toCode: String,
//   journeyDate: { type: Date, required: true, index: true },
//   class: { type: String, enum: CLASSES, required: true },
//   quota: { type: String, enum: QUOTAS, default: 'GN' },
//   passengers: [passengerSchema],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, enum: BOOKING_STATUS, default: 'pending', index: true },
//   payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
//   cancelledAt: Date,
//   refundAmount: Number,
//   source: { type: String, enum: ['web','agent','admin'], default: 'web' },
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);



const mongoose = require('mongoose');
const { BOOKING_STATUS, CLASSES, QUOTAS } = require('../constants');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['M', 'F', 'O'], required: true },
  berthPreference: { 
    type: String, 
    enum: ['lower', 'middle', 'upper', 'side-lower', 'side-upper', 'any'], 
    default: 'any' 
  },
  allocatedBerth: String,
  seatNumber: String,
  coach: String,
  status: { type: String, enum: BOOKING_STATUS, default: 'pending' },
  idType: String,
  idNumber: String,
}, { _id: false });

const bookingSchema = new mongoose.Schema({
  // pnr: { 
  //   type: String, 
  //   unique: true, 
  //   index: true, 
  //   required: true 
  // },

  pnr: { 
  type: String, 
  required: true, 
  unique: true 
  // Remove index: true if present
},
  
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  
  train: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Train', 
    required: true, 
    index: true 
  },

  trainNumber: String,
  trainName: String,
  fromStation: String, 
  fromCode: String,
  toStation: String, 
  toCode: String,

  journeyDate: { 
    type: Date, 
    required: true, 
    index: true 
  },

  class: { 
    type: String, 
    enum: CLASSES, 
    required: true 
  },
  
  quota: { 
    type: String, 
    enum: QUOTAS, 
    default: 'GN' 
  },

  passengers: [passengerSchema],

  totalAmount: { 
    type: Number, 
    required: true 
  },

  // ← Yeh important fix hai
  status: { 
    type: String, 
    enum: [...BOOKING_STATUS, 'draft'],   // 'draft' allow kar diya
    default: 'draft', 
    index: true 
  },

  payment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Payment' 
  },
  
  cancelledAt: Date,
  refundAmount: Number,
  source: { 
    type: String, 
    enum: ['web', 'agent', 'admin'], 
    default: 'web' 
  },
}, { timestamps: true });

// Optional: Better indexing
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ pnr: 1 });

module.exports = mongoose.model('Booking', bookingSchema);