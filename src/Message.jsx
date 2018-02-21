import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    console.log(this.props.color);
    const thisColor = this.props.color;
    const style = {color: `${thisColor}`}
    return (
      <div className="message">
        <span className="message-username" style={style} >{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default Message;

