var express = require('express');
var router = express.Router();
var multer = require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req,res){

    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, './public/images');
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            file.uploadedFile = {
                name: file.originalname.split('.')[0],
                ext: file.mimetype.split('/')[1]
            };

            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var action = multer({ storage: storage }).single('file');

    action(req, res, function(err){

      if(err) throw err;

    console.log(req.body); //form fields
  /* example output:
   { title: 'abc' }
   */
    console.log(req.file); //form files
  /* example output:
   { fieldname: 'upl',
   originalname: 'grumpy.png',
   encoding: '7bit',
   mimetype: 'image/png',
   destination: './uploads/',
   filename: '436ec561793aa4dc475a88e84776b1b9',
   path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
   size: 277056 }
   */
    });

    res.status(204).end();
});

module.exports = router;
