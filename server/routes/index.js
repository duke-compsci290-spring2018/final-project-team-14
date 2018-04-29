var express = require('express');
var router = express.Router();

var https = require('https');

var User = require('../models/user');
var Employer = require('../models/employer');
var Profile = require('../models/profile');

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect("/error");
	}
}

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/error', function(req, res, next) {
    res.send(JSON.stringify({ success: false }));
});

router.get('/good', function(req, res, next) {
    res.send(JSON.stringify({ success: true }));
});

router.get('/logout', isAuthenticated, function(req, res, next) {
    var ret = {};
	req.session.destroy(function (err) {
        if(err) {
            ret.success = false;
            ret.err = err;
        }else{
            ret.success = true;
        }
		res.send(JSON.stringify(ret));
	});
});

router.post('/signup', function(req, res, next) {
    var ret = {};
    var isEmployer = false;
    if(req.body.category == 2){
        isEmployer = true;
    }
	var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isEmployer: isEmployer,
        isAdmin: false,
        facebook_id: req.body.facebook_id
    });
    newUser.save(function(err) {
        if (err) {
            ret.success = false;
            ret.err = err;
            console.log(err);
        } else {
            ret.success = true;
        }
        res.send(JSON.stringify(ret));
    });
    if(newUser.isEmployer) {
        var newEmp = new Employer({
            username: newUser.username,
            employees: []
        });
        newEmp.save();
    }
		var newProfile = new Profile({
		    username: req.body.username,

		    summary: {
		        name: "",
		        occupation: "",
		        school: "",
		        company: "",
		        position: "",
		        job: "",
		        selfIntro: ""
		    },
		    experience: [],
		    education: [],
		    skills: [],
		    courses: [],
		    projects: [],
		    languages: [],
		    tests: []
		});
		newProfile.save(function(err){
		    if(err)
		        console.log(err);
		});
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Express' });
});

router.get('/profile', isAuthenticated, function(req, res, next) {
    var ret = {};
    User.findOne({username: req.user.username}, function(err, user) {
        //error handling
        if(err || !user) {
            ret.success = false;
            return res.send(JSON.stringify(ret));
        }
        var data = {};
        data.user = user;
        //non-employer profile should just contain current user data...
        if(!user.isEmployer) {
            ret.success = true;
            ret.data = data;
            return res.send(JSON.stringify(ret));
        }
        //employer profile should query all its candidates
        Employer.findOne({username: user.username}, function(err, emp){
            //error handling...
            if(err || !emp){
                ret.success = false;
                return res.send(JSON.stringify(ret));
            }
            //get all its candidates and make separation...
            var list = emp.employees;
            var nameList = [];
            var statusList = [];
            for(var i=0;i<list.length;i++){
                nameList.push(list[i].username);
                statusList.push(list[i].status);
            }
            //find all users and compare the username
            User.find({}, function(err, users){
                //error handling...
                if(err || !users){
                    ret.success = false;
                    return res.send(JSON.stringify(ret));
                }
                //
                data.list = [];
                for(var i=0;i<users.length;i++){
                    var tmp = nameList.indexOf(users[i].username);
                    if(tmp >= 0){
                        console.log(users[i]);
                        data.list.push({user: users[i], status: statusList[tmp]});
                    }
                }
                ret.data = data;
                ret.success = true;
                return res.send(JSON.stringify(ret));
            });
        });
    });
});

router.get("/search", function(req, res, next) {
    let url = 'https://jobs.github.com/positions.json';
    let position = req.query.position;
    let location = req.query.location;
	if(position) {
        position = position.replace(' ', '+');
    }
    if(location) {
        location = location.replace(' ', '+');
    }
    if (position || location) {
        url += '?';
    }
    if(position) {
        url += 'position='+position;
    }
    if(position && location) {
        url += '&';
    }
    if(location) {
        url += 'location='+location;
    }
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            res.send(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

router.post('/candidate', isAuthenticated, function(req, res, next) {
    Employer.findOne({username: req.user.username}, function(err, emp){
        //TODO: error handling
        console.log(err);
        for(var i=0; i<emp.employees.length; i++){
            if(emp.employees[i].username === req.body.username) {
                break;
            }
        }
        console.log("Found username at index: "+i);
        if(req.body.isAdd){
            if(i < emp.employees.length){
                return res.send(JSON.stringify({success: true}));
            }
            emp.employees.push({username: req.body.username, status: "created"});
            emp.save(function(err){
                if(err){
                    console.log(err);
                    res.send(JSON.stringify({success: false}));
                }else{
                    res.send(JSON.stringify({success: true}));
                }
            });
        }else{
            emp.employees.splice(i, 1);
            emp.save(function(err){
                if(err){
                    console.log(err);
                    res.send(JSON.stringify({success: false}));
                }else{
                    res.send(JSON.stringify({success: true}));
                }
            });
        }
    });
});

module.exports = router;
