const seatSchema = new mongoose.Schema({
  train: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
  date: { type: Date, required: true },
  class: { type: String, required: true },
  availableSeats: { type: Number, default: 0 },
  status: { type: String, enum: ['high', 'medium', 'low', 'wl'], default: 'medium' }
}, { timestamps: true });

module.exports = mongoose.model('SeatAvailability', seatSchema);