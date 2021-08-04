const maria = require('mysql');
const conn = maria.createConnection({
    host:'ec2-3-35-176-145.ap-northeast-2.compute.amazonaws.com',
    port: 3306,
    user: 'farmer',
    password: 'growingbamb00!',
    database: 'bamboogrove'
});

module.exports = conn;