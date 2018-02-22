import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';
const isImageUrl = require('is-image-url');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: [],
    }
  }

  addMessage = message => {

    let string = message.content;
    let matches = string.match(/\bhttps?:\/\/\S+/gi);

    if (matches === null) {
      console.log('not an img url');
      const msg = {
        type: "postMessage",
        username: message.username,
        content: message.content,
        color: this.state.color
      }
      // send message obj to server
      this.socket.send(JSON.stringify(msg));
    } else {
      // grab url from string and seperate it
      const match = matches[0]
      console.log(match);
      string = string.replace(matches[0], "")
      console.log(string);
      // check if url is an img url
      if(isImageUrl(match)) {
        console.log('this is an img url');
        const msgImg = {
          type: "postImg",
          username: message.username,
          content: string,
          url: match,
          color: this.state.color
        }
          // send message obj to server
        this.socket.send(JSON.stringify(msgImg));
      }

    }
  }

  changeUser = user => {
      // send message obj to server
    console.log("from changeuser func app",user)
    if (this.state.currentUser.name !== user){
      const current = this.state.currentUser.name ? this.state.currentUser.name : "Anonymous"
      const notification = {
              type: "postNotification",
              content: `${current} has changed their name to ${user}`,
      }
    this.socket.send(JSON.stringify(notification));
    this.setState({currentUser: {name: user}});
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = function () {
      console.log("Connected to server");
    }

    if (this.socket.readyState === "OPEN") {
      const newConnection = {type: "postConnection"};
      console.log(newConnection);
    }

    // this.socket.send(JSON.stringify(newConnection));

    // recieve messsage from server and render it
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('from server ', data);

      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          if (data.username === "") {
            data.username = "Anonymous";
          }
          const newMessages = [...this.state.messages, data];
          this.setState({messages: newMessages});

          break;

        case "incomingImg":
          // handle incoming message
          if (data.username === "") {
            data.username = "Anonymous";
          }
          console.log("incomingimg", data);
          const newImgMessage = [...this.state.messages, data];
          this.setState({messages: newImgMessage});

          break;

        case "incomingNotification":
          // handle incoming notification
          console.log(data);
          const newNotification = [...this.state.messages, data];
          this.setState({messages: newNotification});

          break;

        case "incomingColor":
          // handle current total users online
          console.log(data);
          // console.log(data.totalClients)
          this.setState({color: data.color});

          break;


        case "incomingConnectionCount":
          // handle current total users online
          console.log(data);
          // console.log(data.totalClients)
          this.setState({totalClients: data.totalClients});

          break;

        case "incomingUpdateConnection":
          // handle update of current users online
          this.setState({totalClients: data.totalClients});

          break;

      }
    }
  }

  render() {
    return (
      <div>
      <Nav totalClients={this.state.totalClients} />
      <MessageList messages={this.state.messages} color={this.state.color} />
      <ChatBar name={this.state.currentUser.name} add ={this.addMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
