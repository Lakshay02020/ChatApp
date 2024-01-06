const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

const users = {};
app.use(express.static(path.resolve("./public")));
app.use(express.static('js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) =>{
        console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('messageRecieved', {"message" : (`${name} joined the chat`), "name" : users[socket.id]} );
    });
    
    //Message Recieved
    socket.on('message', (message) =>{
        console.log(message, ": FROM CLIENT");
        socket.broadcast.emit('messageRecieved', {"message" : message, "name" : users[socket.id]});
    })
    console.log('a user connected: ', socket.id);
});

server.listen(3000, () => {
    console.log('listening on port:3000');
});