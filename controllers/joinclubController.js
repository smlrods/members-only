const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.joinclub_get = (req, res, next) => {
  if (req.user) {
    res.render('joinclub');
  } else {
    res.redirect('/home');
  }
}

exports.joinclub_post = [
  body('passcode')
    .trim()
    .isLength({min: 1})
    .withMessage('Passcode must be specified')
    .equals('club123')
    .withMessage('Passcode Incorrect')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!req.user) {
      res.redirect('/home');
      return;
    }

    if (!errors.isEmpty()) {
      res.render('joinclub', {
        errors: errors.array()
      });
      return;
    } else {
      await User.findByIdAndUpdate(req.user.id, { membership_status: true }, {});
      res.redirect('/home');
    }
  })
];
