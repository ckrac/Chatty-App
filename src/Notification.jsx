import React, {Component} from 'react';

class Notification extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
    <div className="message system">
      {this.props.content}
    </div>
    );
  }
}

export default Notification;