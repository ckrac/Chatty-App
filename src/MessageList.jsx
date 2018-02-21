import React, {Component} from 'react';
import Message from './Message.jsx';
// import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");

    let note;
    if(this.props.notification) {
      console.log("notification got through", this.props.notification)
      note = (<div className="message system">{this.props.notification.content}</div>);
    }

    // const checkUser = (this.props.notification === this.props.messages[lastMessage].username);
    // console.log(checkUser);
    return (
      <main className="messages">
      {this.props.messages.map((message) => {
        return <Message key ={message.id} content={message.content} username={message.username} notification={note} />
      })}
      </main>
    );
  }
}

export default MessageList;