const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');
router.use(controller.requireDatabase);
router.get('/', controller.getMessages);
router.post('/', controller.createMessage);
router.delete('/:id', controller.deleteMessage);
module.exports = router;

