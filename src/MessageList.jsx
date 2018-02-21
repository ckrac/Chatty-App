import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    return (
      <main className="messages">
      {this.props.messages.map((message) => {
        if (message.type === "incomingMessage") {
          return <Message key ={message.id} content={message.content} username={message.username} />
        } else {
          return <Notification key ={message.id} content={message.content} />
        }
      })}
      </main>
    );
  }
}

export default MessageList;