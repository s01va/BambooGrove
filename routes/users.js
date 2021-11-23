let express = require('express');
let router = express.Router();
//let User = require('../models/user');
const models = require('../models');

router.get('/', function(req, res) {
    //res.render('users/index', {user:req.user});
    console.log("req" + req);
    id = req.user.id;
    result = models.user.findOne({where: {id: id}})
    console.log(result);
    exec(function(err, users) {
        if(err) return res.json(err);
        res.render('users/index', {users:users});
    });
});

// SignUp page
router.get('/new', function(req, res) {
    let user = req.flash('user')[0] || {};
    let errors = req.flash('errors')[0] || {};
    res.render('users/new', { user:user, errors:errors });
});

// Create user
router.post('/', function(req, res) {
    models.user.create(req.body, function(err, user) {
        if(err) {
            req.flash('user', req.body);
            req.flash('errors', util.perseError(err));
            return res.redirect('/users/new');
        }
        res.redirect('/users');
    });
});

router.get('/:id', function(req, res) {
    models.user.findOne({
        where: {id: req.params.id}
    }).then((userdata) => {
        //console.log("userdata: ", userdata.dataValues);
        res.render('users/show', {user:userdata});
    });
    /*
    models.user.findOne({username:req.params.username}, function (err, user) {
        if(err) return res.json(err);
        res.render('users/show', {user:userdata});
    });
    */
});

module.exports = router;
