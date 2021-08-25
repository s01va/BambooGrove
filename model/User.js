//const crypto = require('crypto')

class User {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.name = data.name;
        this.email = data.email;
    }
}

module.exports = (data) => new insertUser(data);