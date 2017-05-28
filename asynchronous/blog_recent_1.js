var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if(req.url == '/'){
        fs.readFile('./titles.json', function (err,data) {
            if(err){
                console.error(err);
                res.end('Server Error');
            }
            else{
                var titles = JSON.parse(data.toString());

                fs.readFile('./template.html', function (err,data) {
                    if(err){
                        console.error(err);
                        res.end('Server Error');
                    }
                    else{
                        var tmpl = data.toString();
                        var html = tmpl.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8000, "127.0.0.1");

// 세 단계의 중첩 콜백이 나쁜건 아니지만 코드가 지저분해지고 리팩토링과 테스트가 어렵다.