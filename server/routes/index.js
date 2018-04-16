var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/good', function(req, res, next) {
  res.render('index', { title: req.user.name });
});

module.exports = router;
