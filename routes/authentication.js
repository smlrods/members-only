const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// Require controller modules
const signup_controller = require('../controllers/signupController');
const login_controller = require('../controllers/loginController');
const joinclub_controller = require('../controllers/joinclubController');
const admin_controller = require('../controllers/adminController');

// Passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      };
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect username or password" })
        }
      })
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

// SIGNUP ROUTES //

// GET request for creating a User.
router.get('/sign-up', signup_controller.user_create_get);

// POST request for creating a User.
router.post('/sign-up', signup_controller.user_create_post);

// LOGIN ROUTES //

// GET request for reading a User
router.get('/log-in', login_controller.user_read_get);

// POST request for reading a User
router.post('/log-in', login_controller.user_read_post);

// POST request for log out
router.post('/log-out', login_controller.user_logout);

// GET join club page
router.get('/join-the-club', joinclub_controller.joinclub_get);

// POSt join club page
router.post('/join-the-club', joinclub_controller.joinclub_post);

// GET admin page
router.get('/admin', admin_controller.admin_get);

// POST admin page
router.post('/admin', admin_controller.admin_post);

// Post admin delete message
router.post('/delete-message', admin_controller.admin_delete_message);

module.exports = router;
