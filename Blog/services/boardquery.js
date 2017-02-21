var mysql_query = require('../models/sqlConnection');
var multiparty = require('multiparty');
var fs = require('fs');
var upload = require('../models/imageLoad');
var Q = require('q');

function post_query(values, next) {
    var queryMessage = 'insert into board (name, title, subtitle, files, hits) VALUES (?,?,?,?,?)';

    if(values.length == 3) {
        values.push(null);
        values.push(0);
    } else {
        values.push(0);
    }

    if(arguments.length == 1) {
        next = values;
        values = null;
    }

    console.log(values);

    mysql_query(queryMessage, values, function(error, results){
        if(error) throw error;

        next.apply(this, arguments);
    });
};

function post(req, res, next){

    upload(req, res).then(function(data) {
        if(data.files.length == 0) {
            post_query([req.session.name , data.fields[0].value, data.fields[1].value], function(err, results){
                if(err) throw err;
                res.redirect('/board');
            });
        } else {
            var filenameList = '';

            for(var i = 0; i < data.files.length; ) {

                filenameList += data.files[0];
                i++;
                if(i < data.files.length) filenameList += '/';
            }

            post_query([req.session.name , data.fields[0].value, data.fields[1].value, filenameList], function(err, results){
                if(err) throw err;
                res.redirect('/board');
            });
        }

    }, function(err){
        res.send(500, err);
    });
};

exports.post = post;

function postList(values, next) {
    values = [(values[1] - 1) * values[0], 5];

    var queryMessage = 'select * from board limit ?, ?';

    if(arguments.length === 1) {
        next = values;
        values = null;
    }

    //console.log(queryMessage);
    mysql_query(queryMessage, values, function(error, results){
        if(error) throw error;
        next.apply(this, arguments);
    });
};

exports.postList = postList;

function postlistcount(next) {
    var queryMessage = 'select count(*) cnt from board';

    mysql_query(queryMessage, function(error, results){
        if(error) throw error;
        next.apply(this, arguments);
    });
};

exports.postlistcount = postlistcount;

function entry(values, next) {

    var querymessage = 'select * from board where id=?';

    if(arguments.length === 1)
    {
        next = values;
        values = null;
    }

    mysql_query(querymessage, values, function(error, results) {
        if(error) throw error;
        next.apply(this, arguments);
    });
}

exports.entry = entry;

function modify(values, res) {
    var queryMessage = 'update board set ? where id=?';

    values.push(0);

    mysql_query(queryMessage, values, function(error){
        if(error) throw error;

        res.redirect('/board/entry/' + values[1]);
    });
};

exports.modify = modify;

function deletePost(values, res) {
    var deleteMessage = 'delete from board where id=?';

    mysql_query(deleteMessage, values, function(error){
        if(error) throw error;

        res.redirect('/board');
    });
};

exports.deletePost = deletePost;

function deleteAllPost(values, res) {
    var queryMessage = 'delete from board';

    mysql_query(queryMessage, values, function(error){
        if(error) throw error;

        res.redirect('/board');
    });
};

exports.deleteAllPost = deleteAllPost;