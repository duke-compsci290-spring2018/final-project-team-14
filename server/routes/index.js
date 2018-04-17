var express = require('express');
var router = express.Router();

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

module.exports = router;
