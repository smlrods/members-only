const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// Require controller modules
const signup_controller = require('../controllers/signupController');
const login_controller = require('../controllers/loginController');

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

module.exports = router;
