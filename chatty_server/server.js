const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

// id generator
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let totalClients = wss.clients.size;
  let countObj = {type: "incomingConnectionCount", totalClients : totalClients};
  // Upon connection to websocket, send total users currently connected to server
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(countObj));
    }
  });

  // Handle incoming messages from client
  ws.on('message', function incoming(message) {

    let messageObj = JSON.parse(message)
    const id = uuidv4();
    messageObj.id = id;

    if(messageObj.type === "postMessage") {
      console.log(`User ${messageObj.username} said ${messageObj.content}, type = ${messageObj.type}`);
      messageObj.type = "incomingMessage";

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageObj));
        }
      });

    } else  if (messageObj.type === "postNotification"){
      console.log(`Current user: ${messageObj.user}, type = ${messageObj.type}`)
      messageObj.type = "incomingNotification";

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageObj));
        }
      });
    }

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let count =  wss.clients.size;
    let decreaseCount = {type: "incomingUpdateConnection", totalClients : count};
    // update current users of the total current users when a user disconnects
    wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(decreaseCount));
      }
    });
  });
});
