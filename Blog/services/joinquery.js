var mysql_query = require('../models/sqlConnection');

function overlapCheck(values, next) {
    var queryMessage = 'select count(*) cnt from user where mail=?';

    if(arguments.length === 1) {
        next = values;
        values = null;
    }

    mysql_query(queryMessage, values, function(error, results){
        if(error) throw error;
        next.apply(this, arguments);
    });
}

exports.overlapCheck = overlapCheck;

function createUser(values, next) {
    var queryMessage = 'insert into user (name, password, mail) values (?, ?, ?)';

    if(arguments.length === 1) {
        next = values;
        values = null;
    }

    mysql_query(queryMessage, values, function(error, results){
        if(error) throw error;
        next.apply(this, arguments);
    });
}

exports.createUser = createUser;