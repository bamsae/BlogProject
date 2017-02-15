var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
    res.send('<script type="text/javascript">alert("로그아웃되었습니다"); location.href = "/board";</script>' + req.session.destroy() );
});

module.exports = router;