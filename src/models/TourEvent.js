const mongoose = require('mongoose');

const tourEventSchema = new mongoose.Schema({
  eventName: { type: String, required: true, trim: true },
  venue: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  time: { type: String, default: '' },
  ticketLink: { type: String, default: '' },
  status: { type: String, enum: ['upcoming', 'past'], default: 'upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('TourEvent', tourEventSchema);
