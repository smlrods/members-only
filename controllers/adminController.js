const User = require('../models/user');
const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.admin_get = (req, res, next) => {
  if (req.user) {
    res.render('admin');
  } else {
    res.redirect('/home');
  }
}

exports.admin_post = [
  body('passcode')
    .trim()
    .isLength({min: 1})
    .withMessage('Passcode must be specified')
    .equals('admin321')
    .withMessage('Passcode Incorrect')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!req.user) {
      res.redirect('/home');
      return;
    }

    if (!errors.isEmpty()) {
      res.render('admin', {
        errors: errors.array()
      });
      return;
    } else {
      await User.findByIdAndUpdate(req.user.id, { admin: true }, {});
      res.redirect('/home');
    }
  })
];

exports.admin_delete_message = async (req, res, next) => {
  if (req.user && req.user.admin) {
    await Message.findByIdAndDelete(req.body.messageid);
  }
  res.redirect('/home');
}
