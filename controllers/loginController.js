const User = require('../models/user');
const passport = require('passport');

// GET Request to reading a User.
exports.user_read_get = async (req, res, next) => {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('login');
  }
}

// POST Request to reading a User.
exports.user_read_post = passport.authenticate("local", {
  successRedirect: '/home',
  failureRedirect: '/log-in',
});

exports.user_logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/home');
  });
}
