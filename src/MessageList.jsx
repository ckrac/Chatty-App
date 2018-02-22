import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import ImgMessage from './ImgMessage.jsx';


class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    return (
      <main className="messages">
      {this.props.messages.map((message) => {
        if (message.type === "incomingMessage") {
          return <Message key ={message.id} content={message.content} username={message.username} color={message.color} />
        } else if (message.type === "incomingImg") {
          console.log('getttting throuuuugh')
          return <ImgMessage key ={message.id} content={message.content} username={message.username} color={message.color} />
          {/*return <Message key ={message.id} content={message.content} username={message.username} color={message.color} />*/}
        } else {
          return <Notification key ={message.id} content={message.content} />
        }
      })}
      </main>
    );
  }
}

export default MessageList;