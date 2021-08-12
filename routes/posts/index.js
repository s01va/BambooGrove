const express = require('express');
const router = express.Router();
const maria = require('../../db');
const Post = require('../../model/Post');

// Board page
// select * posts
router.get('/', function(req, res, next) {
    let select_post_sql = 'select * from post'
    maria.query(select_post_sql, function(err, rows, fields) {
        if (err) {
            return res.json(err);
        }
        res.render('posts/index', {posts:rows});
    })
});

// Create post
router.get('/new', function(req, res) {
    let post = req.flash('post')[0] || {};
    let errors = req.flash('errors')[0] || {};
    res.render('posts/new', {post:post, errors:errors});
});

router.post('/', function(req, res) {
    let data = req.body;
    let insert_post_sql = "insert into post(title, body, author) value (?, ?, ?);";
    let post_params = [];

    post_params.push(data.title);
    post_params.push(data.body);
    //post_params.push(data.author);
    post_params.push("admin");

    //Post.insertPost()
    maria.query(insert_post_sql, post_params, function(err, post) {
        if (err) {
            req.flash('post', req.body);
            req.flash('errors', util.parseError(err))
        }
        res.redirect('/posts');
    });
})

// ====================================================================

// show specific post
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

// Edit 
router.get('/:postid/edit', function(req, res) {
    let postid = req.params.postid;
    let post = req.flash('post');
    console.log(post);
    let errors = req.flash('errors')[0] || {};
    if (!post) {
        if (err) {
            return res.json(err);
        } else {
            res.render('posts/edit', {post:post, errors:errors});
        }
    }
})

router.post('/:postid', function(req, res) {
    req.body.updatedAt = Date.now();
});

//delete
router.get('/:postid/delete', function(req, res) {
    let postid = req.params.postid;
    let delete_post_sql = `delete from post where seq=${postid};`;
    maria.query(delete_post_sql, function(err) {
        if (err) {
            return res.json(err);
        }
        console.log("hello")
        res.redirect('/posts');
    });
})

module.exports = router;