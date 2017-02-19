var config = require('../config/config'),
    imagePath = config.image.path,
    Q = require('q'),
    multer = require('multer');

/*
 * @imageLoad
 * this function is image save in server
 */

var imageLoad = function imageLoad(req, res) {

    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, imagePath);
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            file.uploadedFile = {
                name: req.params.filename,
                ext: file.mimetype.split('/')[1]
            };
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) deferred.reject();
        else deferred.resolve(req.file.uploadedFile);
    });
    return deferred.promise;
};


module.exports = imageLoad;