var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect("/error");
	}
}

router.get('/logout', isAuthenticated, function(req, res, next) {
	res.redirect('/logout');
});

router.post('/delete', isAuthenticated, function(req, res, next) {
	var username = req.user.username;
	var ret = {};
	User.remove({username: username}, function(err){
		if(err) {
			ret.success = false;
			ret.err = err;
		}else{
			ret.success = true;
		}
		res.send(ret);
	});
});

router.get('/', isAuthenticated, function(req, res, next) {
	var ret = {};
	User.find({}, function(err, users) {
		if(err) {
			ret.success = false;
			ret.err = err;
		}else{
			ret.success = true;
			ret.data = users;
		}
		res.send(JSON.stringify(ret));
	});
});

router.post('/auth', passport.authenticate('admin', { failureRedirect: '/error' }), function(req, res) {
	res.redirect('/good');
});

module.exports = router;