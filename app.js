
const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const passport = require('./config/passport');

let app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret:process.env.Nodejs_sessionSecret,
    resave:false,
    saveUninitialized:true
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
