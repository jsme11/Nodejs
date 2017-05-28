var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    fs.readFile('./titles.json', function (err,data) {
        if(err){
            console.error(err);
            res.end('Server Error');
        }
        else{
            getTemplate(JSON.parse(data.toString()), res);
        }
    })
}
function  getTemplate(titles, res) {
    fs.readFile('./template.html', function (err,data) {
        if (err) {
            console.error(err);
            res.end('Server Error');
        }
        else {
            formatHtml(titles, data.toString(), res);
        }
    })
}
function formatHtml(titles, tmpl, res) {
    var html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}
function hadError(err, res) {
    console.error(err);
    res.end('Server Error');
}

// 중첩된 콜백의 각 부분을 고유 이름이 있는 함수로 만듬. 앞선 파일보다 관리와 테스트, 리펙토링을 더 쉽게 할수있다.