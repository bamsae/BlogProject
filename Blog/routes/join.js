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
        res.render('join_overlap_mail');
    } else {
        res.redirect('/board');
    }
});

router.post('/', function(req, res){

});

router.post('/overlap', function(req, res){

    var mail = req.body.input_email;

    query.overlapCheck([mail], function(error, results){
       if(error) throw error;

       if(results[0].cnt === 0) {
            res.send('<script type="text/javascript">alert("사용할 수 있는 아이디 입니다"); location.href = "/join/overlap";</script>');
       } else {
            res.send('<script type="text/javascript">alert("이미 있는 아이디 입니다 다른 아이디를 사용해주세요"); location.href = "/join/overlap"; </script>');
       }
    });
});

module.exports = router;