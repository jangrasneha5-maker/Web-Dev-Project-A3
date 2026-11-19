const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage');

exports.requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'The message database is temporarily unavailable.' });
  }
  next();
};

exports.createMessage = async (req, res) => {
  const { name, email, topic, message } = req.body || {};
  if ([name, email, topic, message].some(value => typeof value !== 'string')) {
    return res.status(400).json({ message: 'Provide a name, email address, enquiry type, and message.' });
  }

  try {
    const record = await ContactMessage.create({ name, email, topic, message });
    res.status(201).json({ message: 'Your message has been saved.', record });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const [firstError] = Object.values(error.errors);
      return res.status(400).json({ message: firstError.message });
    }
    res.status(500).json({ message: 'Could not save your message. Please try again.' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ submittedAt: -1, _id: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ message: 'Could not fetch messages.' });
  }
};

exports.deleteMessage = async (req, res) => {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: 'Invalid message ID.' });
  }
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found.' });
    res.json({ message: 'Message deleted successfully.' });
  } catch {
    res.status(500).json({ message: 'Could not delete the message.' });
  }
};
