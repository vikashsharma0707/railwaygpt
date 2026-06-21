const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES } = require('../constants');

const sessionSchema = new mongoose.Schema({
  tokenHash: String, ip: String, userAgent: String,
  createdAt: { type: Date, default: Date.now }, expiresAt: Date,
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true, select: false, minlength: 6 },
  role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
  avatar: String,
  isBlocked: { type: Boolean, default: false },
  preferences: {
    berth: { type: String, enum: ['lower', 'middle', 'upper', 'side-lower', 'side-upper', 'any'], default: 'any' },
    class: { type: String, enum: ['SL','3A','2A','1A','CC','2S','any'], default: 'any' },
    food: { type: String, enum: ['veg','non-veg','any'], default: 'any' },
    language: { type: String, default: 'en' },
  },
  passengers: [{ name: String, age: Number, gender: String, berth: String, idType: String, idNumber: String }],
  sessions: [sessionSchema],
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLoginAt: Date,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);
