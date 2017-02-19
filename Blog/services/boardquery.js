var mysql_query = require('../models/sqlConnection');
var image_load = require('../models/imageLoad');

function post(values, res) {
    var queryMessage = 'insert into board (name, title, subtitle, hits) VALUES (?,?,?,?)';

    values.push(0);

    mysql_query(queryMessage, values, function(error){
        if(error) throw error;

        res.redirect('/board');
    });
};

exports.post = post;

function imagePost(req, res){
    image_load(req, res).then(function (file) {
        res.json(file);
    }, function (err) {
        res.send(500, err);
    });
}

exports.imagePost = imagePost;

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