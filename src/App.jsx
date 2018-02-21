import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
    }
  }

  addMessage = message => {
    // console.log('from sendMessage func', message);


    const msg = {
      type: "postMessage",
      username: message.username,
      content: message.content
    }
      // send message obj to server
      this.socket.send(JSON.stringify(msg));
  }

  changeUser = user => {
    // console.log('user' , user);
    // console.log('this state user', this.state.currentUser.name);
    // if (this.state.currentUser.name !== user){
    //   this.setState({currentUser: {name: user}});

    //   const notification = {
    //     type: "incomingNotification",
    //     user: user
    //   }
      // send message obj to server
    console.log("from changeuser func app",user)
    if (this.state.currentUser.name !== user){
      const notification = {
              type: "postNotification",
              content: `${this.state.currentUser.name} has changed their name to ${user}`,
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

        case "incomingNotification":
          // handle incoming notification
          console.log(data);
          // const user = data.user;
          this.setState({notification: {content: data.content}
            });
          break;
      }


      // if (data.username === "") {
      //   data.username = "Anonymous";
      // }
      // const newMessages = [...this.state.messages, data];
      // this.setState({messages: newMessages});
    }
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} notification={this.state.notification} />
      <ChatBar name={this.state.currentUser.name} add ={this.addMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
