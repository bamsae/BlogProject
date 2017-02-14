var mysql_query = require('../models/sqlConnection');

function write(title, subtitle) {
    var queryMessage = 'insert into board (name, title, subtitle, hits) VALUES ('
        + "'" + 'VallistA' + "'" + ','
        + "'" + title + "'" + ','
        + "'" + subtitle + "'" + ','
        + "'" + '0' + "'"
    + ')';

    mysql_query(queryMessage, function(error, results){
       if(error) throw error;

    });
};

exports.write = write;

function boardlist(maxCount, page){

};