const TourEvent = require('../models/TourEvent');
module.exports = require('./crudController')(TourEvent, 'Tour event');
