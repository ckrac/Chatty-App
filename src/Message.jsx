import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
      <div>
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
      {this.props.notification}
      </div>
    );
  }
}

export default Message;

