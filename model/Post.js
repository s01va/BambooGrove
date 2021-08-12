class Post {
    constructor(data) {
        this.title = data.title;
        this.body = data.body;
        this.author = data.author;
    }
}

module.exports = (data) => new insertPost(data);