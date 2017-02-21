var config = require('../config/config'),
    imagePath = config.image.path,
    Q = require('q'),
    multiparty = require('multiparty'),
    fs = require('fs');

var imageUpload = function imageUpload(req, res, progress) {

    var deferred = Q.defer();

    // 리턴할 변수들
    var fields = []; // 일반 폼 필드 데이터
    var files = [];

    var form = new multiparty.Form();

    // 파일이 아닌 일반 폼 필드 처리구문
    form.on('field',function(name,value){
        fields.push({name: name, value: value});
    });

    // HTML 파트가 들어왔을때 반응
    // 여기서는 파일 업로드에 대해서 반응
    form.on('part',function(part){
        var filename,
            size;

        var checkFile = (part.filename != '');

        // 파일인지 아닌지 구분하는 구문
        if (checkFile == false) {
            // 처리를 넘어감
            part.resume();
        }else{
            filename = part.filename;
            size = part.byteCount;

            // 파일이 맞으면 여기 들어옴
            // 파일 fs로 스트림 저장
            var writeStream = fs.createWriteStream(imagePath + filename);
            writeStream.filename = filename;
            // HTTP request 스트림과 파일 writeStream을 파이프로 연결
            part.pipe(writeStream);
        }

        // 데이터가 읽어질 때 발생, 읽어진 데이터는 chunk로 들어옴
        // 파일을 얼마나 읽었는지 표시하기위해 언급
        // part.on('data',function(chunk){
        //     console.log(filename+' read '+chunk.length + 'bytes');
        // });

        // data에서 파일을 다 읽으면 발생
        part.on('end',function(){
            if(checkFile == true) {
                files.push(filename);
                writeStream.end();
            }
        });
    });

    form.on('err', function(err){
        console.log('error');
        deferred.reject();
    });

    // 해당 part를 다 읽으면 발생
    form.on('close',function(){
        if(files == []) files = null;

        var data = { fields: fields, files: files };
        deferred.resolve(data);
    });

    // 폼을 읽는중 처리상황을 알려줌
    // 프로그레스 같은거 만들 수 있음.
    form.on('progress',function(byteRead,byteExpected){
        console.log(' Reading total  '+byteRead+'/'+byteExpected);
    });

    // 폼을 req에 넣음
    form.parse(req);

    return deferred.promise;
}


module.exports = imageUpload;