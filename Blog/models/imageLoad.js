var config = require('../config/config'),
    imagePath = config.image.path,
    Q = require('q'),
    multer = require('multer');

/*
 * @imageLoad
 * this function is image save in server
 */

var imageLoad = function imageLoad(req, res) {

    // deferred 객체 생성
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, imagePath);
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            console.log(req.body.file);
            file.uploadedFile = {
                name: req.body.file.split('.')[0],
                ext: file.mimetype.split('/')[1]
            };
            console.log(file.uploadedFile);
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    //var upload = multer({ storage: storage }).single('file');
    var upload = multer({storage: storage   }).single('file');

    console.log(upload);

    // console.log(upload);
    upload(req, res, function (err) {
        // console.log(req.file);
        // 요청 성공시 deferred.resolve로 메시지 전달, 아니면 reject로 실패시 메시지 전달
        if (err) deferred.reject();
        else deferred.resolve(req.file);
    });
    return deferred.promise;
};


module.exports = imageLoad;