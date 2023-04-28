var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/home');
});

/* GET home. */
router.get('/home', function(req, res, next) {
  res.render('home', {user: req.user});
});

module.exports = router;
