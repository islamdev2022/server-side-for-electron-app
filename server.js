// File: server.js
const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log(`Received: ${data}`);
        // Echo the received data back to the client
        console.log("hellowo")
        socket.write(`Echo: ${data}`);
    });

    socket.on('end', () => console.log('Client disconnected'));
});

const PORT = 8124;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
