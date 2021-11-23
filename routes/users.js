let express = require('express');
let router = express.Router();
const models = require('../models');

router.get('/', function(req, res) {
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
        res.render('users/show', {user:userdata});
    });
});

module.exports = router;
