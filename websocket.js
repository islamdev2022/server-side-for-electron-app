// websocket-server.js
const WebSocket = require('ws');
const net = require('net');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    const tcpClient = net.connect({ port: 8124 }, () => {
        console.log('Connected to TCP server');
    });

    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
        tcpClient.write(message);
    });

    tcpClient.on('data', (data) => {
        console.log(`Received data from TCP server: ${data}`);
        ws.send(data);
    });

    tcpClient.on('end', () => {
        console.log('TCP server connection closed');
        ws.close();
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
        tcpClient.end();
    });
});

console.log('WebSocket server listening on port 8080');
