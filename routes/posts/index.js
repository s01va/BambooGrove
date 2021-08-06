const express = require('express');
const router = express.Router();
const maria = require('../../db');

router.get('/', function(req, res, next) {
    maria.query('select * from post', function(err, rows, fields) {
        if (err) {
            return res.json(err);
        }
        res.render('posts/index', {posts:rows})
    })
});

router.get('/new', function(req, res) {
    let post = req.flash('post')[0] || {};
    let errors = req.flash('errors')[0] || {};
    res.render('posts/new', {post:post, errors:errors});
});

module.exports = router;