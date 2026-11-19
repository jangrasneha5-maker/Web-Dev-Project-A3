const mongoose = require('mongoose');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String, required: [true, 'Enter your name.'], trim: true,
    minlength: [2, 'Enter at least 2 characters for your name.'],
    maxlength: [100, 'Use at most 100 characters for your name.']
  },
  email: {
    type: String, required: [true, 'Enter your email address.'], trim: true, lowercase: true,
    maxlength: [254, 'Use at most 254 characters for your email address.'],
    match: [emailPattern, 'Enter a valid email address.']
  },
  topic: {
    type: String, required: [true, 'Select an enquiry type.'],
    enum: {
      values: ['booking', 'collaboration', 'press', 'general'],
      message: 'Select a valid enquiry type.'
    }
  },
  message: {
    type: String, required: [true, 'Enter your message.'], trim: true,
    minlength: [10, 'Enter at least 10 characters for your message.'],
    maxlength: [500, 'Use at most 500 characters for your message.']
  },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
