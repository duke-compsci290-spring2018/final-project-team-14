var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var secret = require('./secret');

var User = require("../models/user");

passport.use(new FacebookStrategy({
    clientID: secret.FACEBOOK_APP_ID,
    clientSecret: secret.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);
        
        User.findOne({ facebook_id: profile.id }, function(err, user) {
            if (err) { 
                return done(err); 
            }
            console.log(user);
            if(user) {
                console.log("found!");
                done(null, user);
            }
            if(!user){
                //should redirect to a register page with facebook id
                var newUser = new User({
                    username: "test",
                    password: "test",
                    name: profile.displayName,
                    facebook_id: profile.id
                });
                newUser.save(function(err) {
                    console.log("finished");
                    if (err) {
                        console.log(err);
                    }
                    User.findOne({ facebook_id: profile.id }, function(err, user) {
                        done(null, user);
                    });
                });
            }
        });
    }
));