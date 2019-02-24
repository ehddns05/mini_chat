//Node.js 기본 내장 모듈 로드
const fs = require('fs');
//express 모듈 로드
const express = require('express');
//socket 모듈 로드
const socket = require('socket.io');
//node.js 기본 내장 모듈 로드
const http = require('http');
//express객체 생성
const app = express();
//express http서버 생성
const server = http.createServer(app);
//생성된 서버를 socket.io에 바인딩
const io = socket(server);

//app.use를 통하여 미들웨어를 추가하여 조합할 수 있다.
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

//서버를 8080포트로 리스너 호출
server.listen(8080, function(){
    console.log("Server boot");
})
//get 방식으로 /경로에 접속
app.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err, data) {
      if(err) {
        response.send('에러')
      } else {
        response.writeHead(200, {'Content-Type':'text/html'})
        response.write(data)
        response.end()
      }
    })
  })

//on은 소켓에서 해당 이벤트를 받으면 콜백함수가 실행된다.
io.sockets.on('connection', function(socket) {
    console.log('connected');

    socket.on('send', function(data)  {
        console.log('Message : ', data.msg);
    })

    socket.on('disconnect', function() {
        console.log('logout');
    })
})
