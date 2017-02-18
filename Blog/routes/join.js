var express = require('express');
var router = express.Router();
var query = require('../services/joinquery');

router.get('/', function(req, res){
    if(req.session.user_id == null) {
        res.render('join');
    } else {
        res.redirect('/board');
    }
});

router.get('/overlap', function(req, res){
    if(req.session.user_id == null) {
        var tempmail = req.session.tempmail;
        req.session.tempmail = null;

        if(tempmail != null){
            res.render('join_overlap_mail', {tempmail: tempmail});
        } else {
            res.render('join_overlap_mail', {tempmail: null});
        }
    } else {
        res.redirect('/board');
    }
});

router.post('/', function(req, res){
    var name = req.body.input_name;
    var mail = req.body.input_email;
    var pass = req.body.input_password;

    var arr = [name, pass, mail];

    query.createUser(arr, function(error){
        if(error) throw error;

        res.send('<script type="text/javascript">alert("회원 가입을 축하드립니다!"); location.href = "/login"; </script>');
    })
});

router.post('/overlap', function(req, res){

    var mail = req.body.input_email;

    query.overlapCheck([mail], function(error, results){
       if(error) throw error;

       if(results[0].cnt === 0) {
           req.session.tempmail = mail;
           res.send('<script type="text/javascript">alert("사용 가능한 아이디 입니다."); location.href = "/join/overlap"; </script>');
       } else {
            res.send('<script type="text/javascript">alert("이미 있는 아이디 입니다 다른 아이디를 사용해주세요"); location.href = "/join/overlap"; </script>');
       }
    });
});

module.exports = router;