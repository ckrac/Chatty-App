import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      content: ""
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder={this.props.name}
          value={this.state.username}
          onChange={this._nameChanged}
        />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this._contentChanged}
          onKeyPress={e => {
            if (e.key === "Enter") {
              this._submitChange();
            }
          }}
        />
      </footer>
    );
  }

  _nameChanged = e => {
    this.setState({username: e.target.value})
  }

  _contentChanged = e => {
    this.setState({content: e.target.value});
  }

  _submitChange = () => {
    console.log('pressed enter');
    console.log(this.state.username);
    console.log(this.state.content);
    this.props.add(this.state);
  }
}

export default ChatBar;