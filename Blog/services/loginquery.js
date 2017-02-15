var mysql_query = require('../models/sqlConnection');

function login(mail, password, values, next) {

    var querymessage = 'select mail, password from user where mail='
        + '"' + mail + '"'
        + ' and '
        + 'password= '
        + '"' + password + '"';

    if(arguments.length === 3)
    {
        next = values;
        values = null;
    }

    mysql_query(querymessage, function(error, results) {
        if(error) throw error;
        next.apply(this, arguments);
    });
}

exports.login = login;