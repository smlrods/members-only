const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', function(req, res, next) {
  res.redirect('/home');
});

/* GET home. */
router.get('/home', async (req, res, next) => {
  const messages = await Message.find().exec();
  res.render('home', {
    user: req.user,
    messages: messages
  });
});

module.exports = router;
