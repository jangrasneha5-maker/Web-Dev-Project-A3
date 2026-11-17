const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  genre: { type: String, required: true, trim: true },
  releaseYear: { type: Number, required: true, min: 1900, max: 2100 },
  artwork: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Release', releaseSchema);
