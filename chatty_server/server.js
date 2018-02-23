const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const querystring = require('querystring');
const fetch = require('node-fetch');

// id generator
const uuidv4 = require('uuid/v4');

// random color generator
const randomColor = require('randomcolor');

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

  //assign random color to each user
  const color = randomColor();
  console.log(color)
  const colorObj = {type: "incomingColor", color: color};
  ws.send(JSON.stringify(colorObj));

  let totalClients = wss.clients.size;
  let countObj = {type: "incomingConnectionCount", totalClients : totalClients};
  // Upon connection to websocket, send total users currently connected to server

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(countObj));
    }
  });

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};
  // Handle incoming messages from client
  ws.on('message', function incoming(message) {

    let messageObj = JSON.parse(message)
    const id = uuidv4();
    messageObj.id = id;
    console.log(messageObj)



    if(messageObj.type === "postMessage") {
      // check if it's a giphy img
      if (matches = messageObj.content.match(/^\/giphy (.+)$/)) {
        console.log("got a giph");
        let qs = querystring.stringify({
          api_key: 'EssNbSCq24kxWDuJJxSaDA14CCxfN30K',
          tag: matches[1]
        });
        fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
          .then( resp => {return resp.json() } )
          .then( json => {
            messageObj.type = "incomingGiphy";
            messageObj.content = `<img src="${json.data.image_url}" alt=""/>`;
            const to_send = messageObj;
            wss.broadcast(to_send);
            console.log(`Sent: ${to_send}`);
          })
      // just a regular img
      } else {
        console.log(`User ${messageObj.username} said ${messageObj.content}, type = ${messageObj.type}`);
        messageObj.type = "incomingMessage";

        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(messageObj));
          }
        });

      }

    } else  if (messageObj.type === "postNotification"){
      console.log(`Current user: ${messageObj.user}, type = ${messageObj.type}`)
      messageObj.type = "incomingNotification";

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageObj));
        }
      });
    } else if (messageObj.type === "postImg") {
      messageObj.type = "incomingImg";

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
