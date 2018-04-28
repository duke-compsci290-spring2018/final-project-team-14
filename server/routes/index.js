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
	if (req.user){
        User.findOne({username: req.user.username}, function(err, user) {
            if(err || !user) {
                ret.success = false;
                res.send(JSON.stringify(ret));
            }else{
                ret.success = true;
                var data = {};
                data.user = user;
                if(user.isEmployer) {
                    Employer.findOne({username: user.username}, function(err, emp){
                        if(err || !emp)
                        var list = emp.employees;
                        var nameList = [];
                        var statusList = [];
                        for(var i=0;i<list.length;i++){
                            nameList.push(list[i].username);
                            statusList.push(list[i].status);
                        }

                        User.find({}, function(err, users){
                            data.list = [];
                            for(var i=0;i<users.length;i++){
                                var tmp = nameList.indexOf(users[i].username);
                                if(tmp > 0){
                                    data.list.push({user: users[i], status: statusList[tmp]});
                                }
                            }
                            ret.data = data;
                            res.send(JSON.stringify(ret));
                        });
                    });
                }
            }
        });
	}
	else{
        ret.success = false;
        res.send(JSON.stringify(ret));
	}
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
