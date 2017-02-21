var config = require('../config/config'),
    imagePath = config.image.path,
    Q = require('q'),
    gm = require('gm');

var imageDownload = function imageDownload(filename) {
    gm('123.png')
        .thumb(400, 400, imagePath + filename, function(err) {
            if(err) throw err;
            else console.log('done - thumb');
        });
};

module.exports = imageDownload;