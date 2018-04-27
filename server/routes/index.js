var express = require('express');
var router = express.Router();

var https = require('https');

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

router.get('/profile', isAuthenticated, function(req, res, next) {
    ret = {};
	if (req.user){
        User.findOne({username: req.user.username}, function(err, user) {
            if(err || !user) {
                ret.success = false;
            }else{
                ret.success = true;
                ret.data = user;
            }
            res.send(JSON.stringify(ret));
        });
	}
	else{
        ret.success = false;
        res.send(JSON.stringify(ret));
	}
});

router.get("/search", function(req, res, next) {
    //'https://jobs.github.com/positions.json?description=python&location=new+york'
    let url = 'https://jobs.github.com/positions.json';
    let position = req.query.position;
    let location = req.query.location;
    if (position || location) {
        url += '?';
    }
    if(position) {
        url += position;
    }
    if(location) {
        url += location;
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

module.exports = router;
