import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import ImgMessage from './ImgMessage.jsx';
import GiphyMessage from './GiphyMessage.jsx';


class MessageList extends Component {

  // browser scrolls down on the last element rendered
  componentDidUpdate() {
       window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    console.log("Rendering <MessageList />");
    return (
      <main className="messages">
      {this.props.messages.map((message) => {
        if (message.type === "incomingMessage") {
          return <Message key ={message.id}
            content={message.content}
            username={message.username}
            color={message.color} />
        } else if (message.type === "incomingImg") {
          return <ImgMessage key ={message.id}
            content={message.content}
            username={message.username}
            color={message.color}
            url={message.url} />

        } else if (message.type === "incomingGiphy") {
          return <GiphyMessage key ={message.id}
            content={message.content}
            username={message.username}
            color={message.color}
            url={message.url} />
        } else {
          return <Notification key ={message.id} content={message.content} />
        }
      })}
      </main>
    );
  }
}

export default MessageList;