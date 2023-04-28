const express = require("express");
const router = express.Router();

// Require controller modules
const signup_controller = require('../controllers/signupController');
const login_controller = require('../controllers/loginController');

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
