var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/', passport.authenticate('local', { failureRedirect: '/error' }), function(req, res) {
	res.redirect('/good');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/good', failureRedirect: '/error'}));


/*
router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function(req, res, next) {
	res.redirect('/good');
});
*/

module.exports = router;