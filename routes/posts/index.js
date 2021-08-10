const express = require('express');
const router = express.Router();
const maria = require('../../db');
const Post = require('../../model/Post');

router.get('/', function(req, res, next) {
    let select_post_sql = 'select * from post'
    maria.query(select_post_sql, function(err, rows, fields) {
        if (err) {
            return res.json(err);
        }
        res.render('posts/index', {posts:rows});
    })
});

router.get('/new', function(req, res) {
    let post = req.flash('post')[0] || {};
    let errors = req.flash('errors')[0] || {};
    res.render('posts/new', {post:post, errors:errors});
});

router.post('/', function(req, res) {
    let data = req.body;
    let insert_post_sql = "insert into post(title, body, author, createdAt) value (?, ?, ?, ?);";
    let post_params = [];

    post_params.push(data.title);
    post_params.push(data.body);
    //post_params.push(data.author);
    post_params.push("admin");
    post_params.push(data.createdAt);

    //Post.insertPost()
    maria.query(insert_post_sql, post_params, function(err, post) {
        if (err) {
            req.flash('post', req.body);
            req.flash('errors', util.parseError(err))
        }
        res.redirect('/posts');
    });
})

router.get('/:postid', function(req, res) {
    let postid = req.params.postid;
    let show_sql = `select * from post where seq=${postid};`;
    maria.query(show_sql, function(err, post, field) {
        if (err) {
            return res.json(err);
        }
        res.render('posts/show', {post:post[0]});
    })

})

module.exports = router;