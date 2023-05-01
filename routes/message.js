const express = require('express');
const router = express.Router();

const message_controller = require('../controllers/messageController');

/* GET request to create a Message. */
router.get('/create-message', message_controller.message_create_get);

// POST request to create a Message
router.post('/create-message', message_controller.message_create_post);

module.exports = router;
