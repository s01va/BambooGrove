let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/welcome');
});

router.get('/about', function(req, res) {
  res.render('home/about');
});

module.exports = router;
