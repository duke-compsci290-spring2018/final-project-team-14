var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var secret = require('./secret');

passport.use(new FacebookStrategy({
    clientID: secret.FACEBOOK_APP_ID,
    clientSecret: secret.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);
        done(null, false, "Sample error");
    
        /*
        User.findOrCreate({ facebookId: profile.id }, function(err, user) {
          if (err) { return done(err); }
          done(null, user);

        });
        */
    }
));