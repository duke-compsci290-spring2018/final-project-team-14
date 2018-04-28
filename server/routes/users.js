var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');

router.get('/test', function(req, res, next) {
	Profile.findOne({username: "100@gmail.com"}, function(err, data){
	    ret = {};
	    ret.summary = data.summary;
	    ret.experience = data.experience;
	    ret.education = data.education;
	    ret.skills = data.skills;
	    ret.accomplishments = {};
	    ret.accomplishments.courses = data.courses;
	    ret.accomplishments.projects = data.projects;
	    ret.accomplishments.languages = data.languages;
	    ret.accomplishments.tests = data.tests;
	    res.send(JSON.stringify(ret));
	});
});

module.exports = router;
