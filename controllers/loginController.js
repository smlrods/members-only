const User = require('../models/user');

// GET Request to reading a User.
exports.user_read_get = async (req, res, next) => {
  res.render('login');
}

// POST Request to reading a User.
exports.user_read_post = async (req, res, next) => {
  res.redirect('/');
}
