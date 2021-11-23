let express = require('express');
let router = express.Router();
const passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('home/welcome');
});

router.get('/about', function(req, res) {
	res.render('home/about');
});

router.get('/login', function(req, res) {
    //console.log(req);
    let username = req.flash('username')[0];
    let errors = req.flash('errors')[0] || {};
    res.render('home/login', {
        username: username,
        errors: errors
    });
});

router.post('/login', function(req, res, next) {
    let errors = {};
    let isValid = true;
    if (!req.body.username) {
        isValid = false;
        errors.username = 'Username is required!';
    }
    if (!req.body.password) {
        isValid = false;
        errors.password = 'Password is required!';
    }

    if (isValid) {
        next();
    } else {
        req.flash('errors', errors);
        req.redirect('/login');
    }
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;
