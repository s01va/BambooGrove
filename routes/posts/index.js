const express = require('express');
const router = express.Router();
const maria = require('../../db');

router.get('/', function(req, res, next) {
    maria.query('select * from post', function(err, rows, fields) {
        if (!err) {
            res.send(rows);
        } else {
            console.log('err:', err);
            res.send(err);
        }
    })
});

module.exports = router;