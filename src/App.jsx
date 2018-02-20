import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      socket: {}
    }
  }

  addMessage = message => {
    // console.log(message);
    // new array by update this.state with message object
    if (message.username === "") {
      message.username = "Anonymous"
    }
    const newMessages = [...this.state.messages, message]
    // this.setState({messages: newMessages})
    // const messagesClone = this.state.messages;
    // this.setState({messages: messagesClone.concat(message)})

    this.setState({messages: newMessages})
  }

  sendMessage = message => {
    console.log('from sendMessage func', message);
    const msg = {
      username: message.username,
      content: message.content
    }

    this.state.socket.send(JSON.stringify(msg));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const exampleSocket = new WebSocket("ws:0.0.0.0:3001", "protocolOne");
    console.log("Connected to server");
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
      <ChatBar name={this.state.currentUser.name} add={this.addMessage} send ={this.sendMessage} />
      </div>
    );
  }
}
export default App;
