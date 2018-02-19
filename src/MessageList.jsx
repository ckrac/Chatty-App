import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    return (
      <main className="messages">
      {this.props.messages.map((message) => {
        return <Message key ={message.id} content={message.content} username={message.username} />
      })}
      </main>
    );
  }
}

export default MessageList;