let express = require('express');
let router = express.Router();
let User = require('../models/User');

router.get('/', function(req, res) {
    //res.send('respond with a resources');
    console.log(req.body.username);
    res.json(User.showuser(req.body.username));
});

// SignUp page
router.get('/new', function(req, res) {
    let user = req.flash('user')[0] || {};
    let errors = req.flash('errors')[0] || {};
    res.render('users/new', { user:user, errors:errors });
});

router.post('/', function(req, res) {
    let userdata = req.body;
    console.log(userdata);
    let user_params = [];
    user_params.push(userdata.username);
    user_params.push(userdata.password);
    user_params.push(userdata.name);
    user_params.push(userdata.email);
    
    let output = User.signupact(user_params);
    if (output) {
        req.flash('users', output);
    }
    
    res.redirect('/users')
});

module.exports = router;
