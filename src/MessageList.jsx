import React, {Component} from 'react';
import Message from './Message.jsx';
// import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    // console.log("From MessageList", this.props.notification);
    // console.log("From MessageList", this.props.messages);
    let lastMessage = this.props.messages.length - 1;
    console.log(this.props.notification)
    // console.log("this one", this.props.messages[lastMessage]);
    // debugger
    // if(this.props.messages.length > 0 && this.props.messages[lastMessage].type === "incomingNotification") {
    //   console.log("new user, change me", this.props.messages[lastMessage].type);
    // }

    if(this.props.messages.length > 0) {
      console.log("greater than 0");
      if(this.props.messages[lastMessage]) {
        console.log("last message");
        console.log(this.props.messages[lastMessage]);
      }
    }

    // const checkUser = (this.props.notification === this.props.messages[lastMessage].username);
    // console.log(checkUser);
    return (
      <main className="messages">
      {this.props.messages.map((message) => {
        return <Message key ={message.id} content={message.content} username={message.username} notification={this.props.notification} />
      })}
      </main>
    );
  }
}

export default MessageList;