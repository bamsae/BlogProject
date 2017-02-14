var mysql_query = require('../models/sqlConnection');

mysql_query('SELECT * FROM board', function(error, results){
    console.log(results);
});

