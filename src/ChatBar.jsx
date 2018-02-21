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
          onKeyPress={e => {
            if (e.key === "Enter") {
              this._changeUser();
            }
          }}
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

  // Handles when the text box input changes
  _nameChanged = e => {
    this.setState({username: e.target.value})
  }
  // Handles when the text box input changes
  _contentChanged = e => {
    this.setState({id: e.target.value,
      content: e.target.value});
  }
  // Handles submit when pressing enter into input box.
  // Calls to add prop which calls func in app to setState
  _submitChange = () => {
    this.props.add(this.state);
    this.setState({content: ""});
  }

  _changeUser = () => {
    console.log('hit enter')
    this.props.changeUser(this.state.username);
  }
}

export default ChatBar;