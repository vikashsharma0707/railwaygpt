module.exports = {
  ROLES: { ADMIN: 'admin', USER: 'user' },
  TRAIN_STATUS: ['scheduled', 'running', 'delayed', 'cancelled', 'arrived', 'departed', 'rescheduled', 'suspended'],
  CLASSES: ['SL', '3A', '2A', '1A', 'CC', '2S'],
  QUOTAS: ['GN', 'TQ', 'LD', 'SS', 'DF', 'VIP'],
  BOOKING_STATUS: ['pending', 'confirmed', 'waitlist', 'rac', 'cancelled', 'refunded'],
  PAYMENT_STATUS: ['created', 'paid', 'failed', 'refunded', 'partial_refund'],
  NOTIFICATION_TYPES: ['booking', 'payment', 'refund', 'delay', 'platform', 'fare', 'seat', 'promo', 'emergency'],
};
