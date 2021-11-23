//const crypto = require('crypto')
const conn = require("../db");

exports.showuser = function(userid) {
    let showsql = `select id, name, email from user where id = '${userid}'`;
    let output = [];
    conn.connect();
    conn.query(showsql, function(err, result) {
        console.log("::TRACE start::");
        
        if (err) {
            console.log("err: ", err);
            output.push(1);
            output.push(err);
        } else {
            console.log("result: ", result);
            output.push(0),
            output.push(result);
        }
    });
    console.log("output: ", output);
    console.log("::TRACE stop::");
    conn.end();
    return output;
}

exports.signupact = function(params) {
    let signupsql = "insert into user(id, password, name, email) value (?, ?, ?, ?)";
    let output = [];
    conn.connect();
    conn.query(signupsql, params, function(err, results) {
        if (err) {
            output.push(1);
            output.push(err);
        } else {
            output.push(0);
            output.push(results);
        }
    });
    conn.end();
    return output;
}

//module.exports = User;