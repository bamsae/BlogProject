var express = require('express');
var router = express.Router();
var query = require('../services/boardquery');

var maxcount = 5;

router.get('/', function(req, res, next) {
    res.redirect('/board/list/1');
});

router.get('/list/:page', function(req, res, next){
    var page = req.params.page;

    query.writinglist([maxcount, page], function(error, results){
        if(error) throw error;

        var user = [req.session.user_id, req.session.name];
        res.render('board_main', { maxCount: maxcount, page: page, results: results, user: user });
    });
});

router.get('/write', function(req, res, next){
    res.render('board_write');
});

router.post('/write', function(req, res, next){
    query.write([req.session.name, req.body.input_title, req.body.input_subtitle], res);
});

module.exports = router;