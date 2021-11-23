// config/passport.js

let conn = require("../db");
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    console.log("serializeUser ", user);
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    console.log("deserializeUser ", id);
    let finduseridsql = `select id from users where id='${id}'`;
    conn.query(finduseridsql, function(err, rows, fields) {
        if (err) {
            return res.json(err);
        }
        done(err,rows[0]);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: true,
    passReqToCallback: true
},function(req, username, password, done) {
    
    let loginsql = `select * from users where userid='${username}' and password='${password}'`;
    
    conn.query(loginsql, function(err, result) {
        if (err) {
            console.log(err);
        }
        
        if(result.length === 0) {
            console.log("결과 없음");
            return done(null, false, {message: 'Incorrect'});
        } else {
            console.log("result.length: " + result.length);
            //console.log("result: " + result);
            let json = JSON.stringify(result[0]);
            let userinfo = JSON.parse(json);
            console.log("userinfo ", userinfo);
            return done(null, userinfo);
        }
    });
}));

module.exports = passport;