var mysql_query = require('../models/sqlConnection');

function write(values, res) {
    var queryMessage = 'insert into board (name, title, subtitle, hits) VALUES (?,?,?,?)';

    values.push(0);

    mysql_query(queryMessage, values, function(error){
        if(error) throw error;

        res.redirect('/board');
    });
};

exports.write = write;

function writinglist(values, next) {
    values = [(values[1] - 1) * values[0], ((values[1] - 1) * values[0]) + values[0]];

    var queryMessage = 'select * from board where id > ? and id <= ?';

    if(arguments.length === 3) {
        next = values;
        values = null;
    }

    //console.log(queryMessage);
    mysql_query(queryMessage, values, function(error, results){
        if(error) throw error;
        next.apply(this, arguments);
    });
};

exports.writinglist = writinglist;

function writinglistcount(values, next) {
    var queryMessage = 'select count(*) board;';

    if(arguments.length === 1) {
        next = values;
        values = null;
    }

    mysql_query(queryMessage, function(error, results){
        if(error) throw error;
        next.apply(this, arguments);
    });
};

exports.writinglistcount = writinglistcount
