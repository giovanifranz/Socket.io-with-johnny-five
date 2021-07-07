const { Board, Sensor } = require("johnny-five");
const board = new Board();
const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

board.on("ready", () => {
    io.on('connection', (socket) => {
        console.log('Nova conexão id:', socket.id);
        const sensorCorrente = new Sensor("A3");
        socket.on('msg', (msg) => {
            console.log(msg);
            
            sensorCorrente.on("change", value => {
                socket.emit('msg', sensorCorrente.value)
            });
        })
        
    });
})
http.listen(3000, () => console.log('server up'));




