const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

// GET Request to create a message
exports.message_create_get = (req, res, next) => {
  if (req.user) {
    res.render('message');
  } else {
    res.redirect('/home');
  }
}

// POST Request to create a message
exports.message_create_post = [
  // Validate and sanitize.
  body('title', 'Title must be specified')
    .trim()
    .notEmpty()
    .escape(),
  body('content', 'Content must be specified')
    .trim()
    .notEmpty()
    .escape(),
  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Redirect if user not log in
    if (!req.user) {
      res.redirect('/home');
      return;
    }

    // Create a mensage object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      timestamp: Date(),
      user: req.user.id
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('message', {
        message: message,
        errors: errors.array()
      });
      return;
    } else {
      // Data form is valid.
      await message.save();
      // New message saved. Redirect to home page.
      res.redirect('/home');
    }
  })
];
