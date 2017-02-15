var express = require('express');
var router = express.Router();
var query = require('../services/loginquery');

router.get('/', function(req, res){
    res.render('login');
});

router.post('/', function(req, res, next){
    query.login(req.body.input_email, req.body.input_password, function(error, results){
        if(error) throw error;

        if(results.length > 0) {

        }
        else {
            res.send('<script type="text/javascript">alert("이메일 혹은 비밀번호가 맞지 않습니다."); location.href="/login"; </script>');
        }
    });
});

module.exports = router;