const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    console.log('El nodo con IP: ' + socket.handshake.address + ' Conectado');

    socket.on('new-msg', msg => {
        io.emit('new-msg', msg);
    });

    socket.on('disconnect', () => {
        console.log('El nodo con IP: ' + socket.handshake.address + ' Desconectado');
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
