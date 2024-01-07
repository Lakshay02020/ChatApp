const socket = io();
const sendButton = document.getElementById('sendButton');
const sendMessage = document.getElementById('sendMessage');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    const container = document.querySelector('.container');
    const wrapper = document.querySelector('.message-wrapper')

    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    wrapper.append(messageElement);
    container.append(wrapper);
}

const name = prompt("Enter your name to join the chat");
while (!name) {
    name = prompt("Please enter a valid name to join the chat");
}

socket.emit('new-user-joined', name);

socket.on('messageRecieved', (message) => {
    append(message, 'left');
})

socket.on('user-joined', (name) => {
    socket.emit('message', (`${name} joined the chat`));
})  

sendButton.addEventListener("click", (event) =>{
    const message = sendMessage.value;
    sendMessage.value = "";
    append(message, 'right');
    socket.emit('message', (message));
})