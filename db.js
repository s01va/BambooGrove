const maria = require('mysql');
const conn = maria.createConnection({
    host: process.env.BAMBOODBURL,
    port: 3306,
    user: 'farmer',
    password: process.env.BAMBOODBPW,
    database: 'bamboogrove'
});

module.exports = conn;