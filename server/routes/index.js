var express = require('express');
var router = express.Router();

var https = require('https');

var User = require('../models/user');
var Employer = require('../models/employer');

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
        //non-employer profile should just contain current user data...
        if(!user.isEmployer) {
            ret.success = true;
            data.user = user;
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
                    if(tmp > 0){
                        console.log(users[i]);
                        data.list.push({user: users[i], status: statusList[tmp]});
                    }
                }
                ret.data = data;
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
    User.findOne({username: req.body.username}, function(err, user){

        if(req.body.isAdd) {
            Employer.findOneAndUpdate({username: req.user.username}, {$push: {employees: {username: user.username, status: "created"}}}, function(error, success){
                if(err){
                    res.send(JSON.stringify({success: false}));
                }else{
                    res.send(JSON.stringify({success: true}));
                }
            });
        }else{
            Employer.findOneAndUpdate({username: req.user.username}, {$pull: {employees: {username: username}}}, function(error, success){
                if(err){
                    res.send(JSON.stringify({success: false}));
                }else{
                    res.send(JSON.stringify({success: true}));
                }
            });
        }
    });
});

module.exports = router;
