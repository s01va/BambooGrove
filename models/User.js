//const crypto = require('crypto')
const conn = require("../db");

exports.showuser = function(userid) {
    let showsql = `select id, name, email from user where id = ${userid}`;
    conn.query(showsql, function(err, user, field) {
        if (err) {
            return err;
        }
        return user;
    });
}

exports.signupact = function(params) {
    let signupsql = "insert into user(id, password, name, email) value (?, ?, ?, ?)";
    conn.connect();
    conn.query(signupsql, params, function(err, results, fields) {
        if (err) {
            //console.log(err);
            return err;
        }
        //console.log(results);
        return results;
    });
    conn.end();
}

//module.exports = User;