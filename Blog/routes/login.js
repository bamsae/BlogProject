var express = require('express');
var router = express.Router();
var query = require('../services/loginquery');

router.get('/', function(req, res){
    res.render('login');
});

router.post('/', function(req, res, next){
    var mail = req.body.input_email,
        password = req.body.input_password;

    query.login([mail, password], function(error, results){
        if(error) throw error;

        if(results.length == 1) {
            req.session.user_id = mail;
            req.session.name = results[0].name;
            res.redirect('/board');
        }
        else {
            res.send('<script type="text/javascript">alert("이메일 혹은 비밀번호가 맞지 않습니다."); location.href = "/board/post"; </script>');
        }
    });
});

module.exports = router;