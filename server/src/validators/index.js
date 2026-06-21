const Joi = require('joi');

exports.registerSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().min(6).max(128).required(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.forgotSchema = Joi.object({ email: Joi.string().email().required() });
exports.resetSchema = Joi.object({ token: Joi.string().required(), password: Joi.string().min(6).required() });
exports.changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(), newPassword: Joi.string().min(6).required(),
});

exports.searchTrainSchema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  date: Joi.string().required(),
  class: Joi.string().optional(),
});

exports.bookingSchema = Joi.object({
  trainId: Joi.string().required(),
  journeyDate: Joi.string().required(),
  class: Joi.string().required(),
  quota: Joi.string().optional(),
  fromCode: Joi.string().required(),
  toCode: Joi.string().required(),
  passengers: Joi.array().min(1).max(6).items(Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(1).max(120).required(),
    gender: Joi.string().valid('M','F','O').required(),
    berthPreference: Joi.string().optional(),
    idType: Joi.string().optional(),
    idNumber: Joi.string().optional(),
  })).required(),
});

exports.paymentVerifySchema = Joi.object({
  razorpay_order_id: Joi.string().required(),
  razorpay_payment_id: Joi.string().required(),
  razorpay_signature: Joi.string().required(),
  bookingId: Joi.string().required(),
});

exports.chatSchema = Joi.object({
  conversationId: Joi.string().optional(),
  message: Joi.string().min(1).max(4000).required(),
  agent: Joi.string().optional(),
});
