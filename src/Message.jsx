import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default Message;

      // { if (this.props.notification !== this.props.username) {
      //     return <div class="message system">Anonymous1 changed their name to nomnom.</div>
      //   }
      // }