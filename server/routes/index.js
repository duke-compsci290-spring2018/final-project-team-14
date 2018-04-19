var express = require('express');
var router = express.Router();

var User = require('../models/user');

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect("/login");
	}
}

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('index', { title: 'Login' });
});

router.get('/good', isAuthenticated, function(req, res, next) {
	res.render('main', { title: req.user.name });
});

router.get('/logout', isAuthenticated, function(req, res, next) {
	req.session.destroy(function (err) {
		res.redirect('/');
	});
});

router.post('/signup', function(req, res, next) {
	var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        facebook_id: req.body.facebook_id
    });
    newUser.save(function(err) {
        if (err) {
            console.log(err);
            res.render('index', { title: 'fail' });
        } else {
        	console.log("finished");
        	res.render('index', { title: 'success' });
        }
    });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Express' });
});

module.exports = router;
