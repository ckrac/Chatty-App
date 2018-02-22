import React, {Component} from 'react';

class ImgMessage extends Component {
  render() {
    console.log("Rendering <Message />");
    const thisColor = this.props.color;
    const style = {color: `${thisColor}`}
    const img = `${this.props.content}`;
    console.log(img)
    return (
      <div className="message">
        <span className="message-username" style={style} >{this.props.username}</span>
        <span className="message-content"><img src={img}/></span>
      </div>
    );
  }
}

export default ImgMessage;