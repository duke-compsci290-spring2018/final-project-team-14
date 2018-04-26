var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session')
var cors = require('cors')
var config = require('./config/database');
const mongoose = require('mongoose');
mongoose.connect(config.database);

var User = require("./models/user");

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var auth = require('./routes/auth');

var app = express();
/*
var whitelist = [
    'http://127.0.0.1:8080',
    'http://localhost:8080'
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));
*/



app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST', 'OPTIONS'],
    alloweHeaders:['Content-Type', 'Authorization'],
    credentials: true
}));



// set up socket io
var server = app.listen(3000);

var io = require('socket.io').listen(server);

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/views/chat.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log(msg);
        io.emit('chat message', msg);
    });
});



// user authentication and session
app.use(session({resave: false, saveUninitialized: true, secret: 'secret', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var local = require('./config/local');
var facebook = require('./config/facebook');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080, http://localhost:8080");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With");
    next();
});
*/
module.exports = app;
