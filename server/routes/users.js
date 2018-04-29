var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');

var sendEmail = require('../utils/email');

router.get('/test', function(req, res, next) {
	sendEmail('chengxinghao@hotmail.com', 'Sending Email using Node.js', 'That was easy!');
	res.send("success");
});

router.post('/profile', function(req, res, next) {
	var profile = req.body.profile;
	Profile.remove({username: req.user.username}, (err) => {
		if(err){
			console.log(err);
		}
	});
	var newProfile = new Profile({
    	username: req.user.username,
    	summary: profile.summary,
    	experience: profile.experience,
    	education: profile.education,
    	skills: profile.skills,
        courses: profile.accomplishments.courses,
        projects: profile.accomplishments.projects,
		languages: profile.accomplishments.languages,
		tests: profile.accomplishments.tests
	});
	newProfile.save((err) => {
		if(err){
			console.log(err);
			res.send(JSON.stringify({success: false}));
		}else{
			res.send(JSON.stringify({success: true}));
		}
	});
});

router.get('/profile', function(req, res, next) {
	console.log(req.user.username);
	Profile.findOne({username: req.user.username}, (err, data) => {
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

//for employer, need check authorization
router.get('/profile/:username', function(req, res, next) {
	Profile.findOne({username: req.params.username}, (err, data) => {
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

const Guid = require('guid');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const config = require('../config/secret');

function generateToken(content) {
    return jwt.sign({
        jti: Guid.raw(),
        iss: config.SKYPE_APP_ID,
        sub: sha256(content),
        exp: Math.floor(Date.now() / 1000) + 10
    }, config.SKYPE_APP_SECRET);
}

router.get('/create', function(req, res,next) {
    const payload = {}
    fetch('https://interviews.skype.com/api/interviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + generateToken(JSON.stringify(payload))
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
	.then((response) => {
		var url = response.urls[0].url;
        console.log(url);
        res.send(url);
	});
});

module.exports = router;
