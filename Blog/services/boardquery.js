var mysql_query = require('../models/sqlConnection');

function write(title, subtitle, res) {
    var queryMessage = 'insert into board (name, title, subtitle, hits) VALUES ('
        + "'" + 'VallistA' + "'" + ','
        + "'" + title + "'" + ','
        + "'" + subtitle + "'" + ','
        + "'" + '0' + "'"
    + ')';

    mysql_query(queryMessage, function(error){
        if(error) throw error;

        res.redirect('/board');
    });
};

exports.write = write;

function writinglist(maxCount, page, values, next) {
    var startID = (page - 1) * maxCount;
    var destID = ((page - 1) * (maxCount)) + maxCount;
    var queryMessage = 'select * from board where id > '
        + startID + ' and id <= '
        + destID + ';';

    if(arguments.length == 3) {
        next = values;
        values = null;
    }

    //console.log(queryMessage);
    mysql_query(queryMessage, function(error, results){
        if(error) throw error;
        next.apply(this, arguments);
    });
};

exports.writinglist = writinglist;