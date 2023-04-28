const User = require('../models/user');

// GET Request to creating a User.
exports.user_create_get = async (req, res, next) => {
  res.render('sign-up');
}

// POST Request to creating a User.
exports.user_create_post = async (req, res, next) => {
  res.redirect('/');
}
