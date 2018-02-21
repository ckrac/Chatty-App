import React, {Component} from 'react';

class Notification extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
    <div className="message system">
      {this.props.username} changed their name to {this.props.notification}
    </div>
    );
  }
}

export default Notification;