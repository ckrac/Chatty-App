import React, {Component} from 'react';

class GiphyMessage extends Component {
  render() {
    console.log("Rendering <Message />");
    const thisColor = this.props.color;
    const style = {color: `${thisColor}`}
    return (
      <div className="message">
        <span className="message-username" style={style} >{this.props.username}</span>
        <span className="message-content" dangerouslySetInnerHTML={{__html:this.props.content}} />
      </div>
    );
  }
}

export default GiphyMessage;