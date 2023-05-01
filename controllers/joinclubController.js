const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

require('dotenv').config();
const memberPasscode = process.env.MEMBER_PASSCODE;

exports.joinclub_get = (req, res, next) => {
  if (req.user) {
    res.render('joinclub', { user: req.user });
  } else {
    res.redirect('/home');
  }
}

exports.joinclub_post = [
  body('passcode')
    .trim()
    .isLength({min: 1})
    .withMessage('Passcode must be specified')
    .equals(memberPasscode)
    .withMessage('Passcode Incorrect')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(memberPasscode)
    
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
