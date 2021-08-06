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

module.exports = router;