var express = require('express');
var router = express.Router();
var query = require('../services/boardquery');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('board_main');
});

router.get('/write', function(req, res, next){
    res.render('board_write');
});

router.post('/write', function(req, res, next){
   query.write(req.body.input_title, req.body.input_subtitle);
});

module.exports = router;
