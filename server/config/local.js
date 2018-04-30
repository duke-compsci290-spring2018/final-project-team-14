var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require("../models/user");

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true
    },
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            user.comparePassword(password, function(err, isMatch) {                
                if(err || !isMatch){
                    if (err) {
                        console.log(err);
                    }
                    return done(null, false);
                }else{
                    return done(null, user);
                }
            });
        });
    }
));
