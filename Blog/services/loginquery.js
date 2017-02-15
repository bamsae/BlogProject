var mysql_query = require('../models/sqlConnection');

function login(values, next) {

    var querymessage = 'select name from user where mail=? and password=?';

    if(arguments.length === 3)
    {
        next = values;
        values = null;
    }

    mysql_query(querymessage, values, function(error, results) {
        if(error) throw error;
        next.apply(this, arguments);
    });
}

exports.login = login;