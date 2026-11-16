const express = require('express');
const router = express.Router();
const controller = require('../controllers/updateController');
router.get('/', controller.getUpdates);
router.post('/', controller.addUpdate);
router.put('/:id', controller.editUpdate);
router.delete('/:id', controller.deleteUpdate);
module.exports = router;
