var socket = io();

//접속 시 실행
socket.on('connect', function (params) {
    var input = document.getElementById('text');
    
});

//전송
function send() {
    var message = document.getElementById('text').value;
    //emit = 전송
    socket.emit('send',{msg : message});

    var text_screen = document.getElementById('text_container');
    text_screen.innerHTML(message);
    message.value = '';

}