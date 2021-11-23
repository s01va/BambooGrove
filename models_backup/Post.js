const conn = require("../db");

conn.connect();

module.exports = (data) => new insertPost(data);