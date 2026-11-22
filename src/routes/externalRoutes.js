const express = require('express');
const router = express.Router();
const controller = require('../controllers/externalController');
router.get('/music', controller.searchMusic);
module.exports = router;
