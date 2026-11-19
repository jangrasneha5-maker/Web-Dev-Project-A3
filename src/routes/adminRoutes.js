const express = require('express');
const mongoose = require('mongoose');
const Release = require('../models/Release');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).send('The dashboard requires an active MongoDB connection.');
  }

  const TourEvent = mongoose.models.TourEvent;
  try {
    const [releases, events, messages] = await Promise.all([
      Release.find().sort({ createdAt: -1 }).lean(),
      TourEvent ? TourEvent.find().sort({ date: 1 }).lean() : null,
      ContactMessage.find().sort({ submittedAt: -1, _id: -1 }).lean()
    ]);
    res.render('admin', { releases, events, messages });
  } catch {
    res.status(500).send('Could not load dashboard records. Please try again.');
  }
});

module.exports = router;
