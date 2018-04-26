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
    res.send(JSON.stringify({ success: false }));
});

router.get('/good', function(req, res, next) {
    res.send(JSON.stringify({ success: true }));
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        facebook_id: req.body.facebook_id
    });
    newUser.save(function(err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        } else {
        	console.log("finished");
            res.send(JSON.stringify({ success: true }));
        }
    });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Express' });
});

router.get('/main', function(req, res, next) {
    console.log(req.user);
    console.log(req.session);
});

module.exports = router;
