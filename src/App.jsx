import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      socket: {}
    }
  }

  addMessage = message => {
    console.log('from sendMessage func', message);
    const msg = {
      username: message.username,
      content: message.content
    }
    // add later: use .onopen with sending data to make sure theres a connection

    // send message obj to server
    this.state.socket.send(JSON.stringify(msg));
    // recieve message from server
    this.state.socket.onmessage = (event) => {
      const serverMsg = JSON.parse(event.data);
      console.log('from server ', serverMsg);

      if (serverMsg.username === "") {
        serverMsg.username = "Anonymous";
      }

      const newMessages = [...this.state.messages, serverMsg];
      this.setState({messages: newMessages});
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const exampleSocket = new WebSocket("ws:0.0.0.0:3001", "protocolOne");
    exampleSocket.onopen = function () {
    console.log("Connected to server");
    }
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages,
        socket: exampleSocket})
    }, 3000);
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar name={this.state.currentUser.name} add ={this.addMessage} />
      </div>
    );
  }
}
export default App;
