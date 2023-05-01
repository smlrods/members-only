const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

// GET Request to creating a User.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('signup');
  }
});

// POST Request to creating a User.
exports.user_create_post = [
  // Validate and sanitize.
  body("first_name", "First name must be specified")
    .trim()
    .notEmpty()
    .escape(),
  body("last_name", "Last name must be specified")
    .trim()
    .notEmpty()
    .escape(),
  body("username", "Username must be specified")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error('User already in use');
      }
    })
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password must be specified")
    .escape(),
  body("passwordConfirmation", "Passwords do not match")
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password
    });

    if (!errors.isEmpty()) {
      res.render("signup", {
        user: user,
        errors: errors.array()
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          next(err);
        }
        user.password = hashedPassword;
        const result = await user.save();
        res.redirect('/home');
      });
    }
  })
];
