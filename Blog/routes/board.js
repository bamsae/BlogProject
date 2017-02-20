var express = require('express');
var router = express.Router();
var query = require('../services/boardquery');

var maxcount = 5;

function getTimeStamp() {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +

        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);

    return s;
}

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

router.get('/', function(req, res, next) {
    res.redirect('/board/list/1');
});

router.get('/list/:page', function(req, res, next){
    var page = req.params.page;
    var count = 0;

    query.postlistcount(function(error, results){
        if(error) throw error;

        count = results[0].cnt;

        query.postList([maxcount, page], function(error, results){
            if(error) throw error;

            var nextFlag = (page < count / maxcount);
            var beforeFlag = (page != 1);
            var zeroFlag = (count != 0);

            var user = [req.session.user_id, req.session.name];
            res.render('board_main', { page: page, results: results, user: user, nextFlag: nextFlag, beforeFlag: beforeFlag, zeroFlag: zeroFlag});
        });
    });
});

router.get('/entry/:id', function(req, res, next){
    query.entry(req.params.id, function(error, results){
        if(error) throw error;

        var user = [req.session.user_id, req.session.name];
        res.render('board_entry', { results: results, user: user });
    });
});

router.get('/modify/:id', function(req, res, next){
    if(req.session.user_id == null) {
        res.redirect('/login');
    } else {
        query.entry(req.params.id, function (error, results) {
            if (error) throw error;

            res.render('board_modify', {results: results});
        });
    }
});

router.post('/modify/:id', function(req, res, next){
    if(req.session.user_id != null)
        query.modify([ { title: req.body.input_title, subtitle: req.body.input_subtitle, moditime: getTimeStamp() }, req.params.id], res);
});

router.get('/post', function(req, res, next){
    if(req.session.user_id == null)
        res.redirect('/login');
    else
        res.render('board_post');
});

router.post('/post', function(req, res, next){
    // if(req.session.user_id != null){
        if(req.body.file == '')
            req.body.file = null;

        query.post([req.session.name, req.body.title, req.body.subtitle, req.body.file], function (error, results){
            if(error) throw error;

            if(req.body.file == null)
                res.redirect('/board');
            else
                query.imagePost('file', req, res);
        });
    // }
});



router.post('/delete/:id', function(req, res, next){
    var id = req.params.id;

    if(req.session.user_id != null)
        query.deletePost([id], res);
});

router.post('/deleteAll', function(req, res, next){
    query.deleteAllPost(null, res);
});

module.exports = router;