import React, { Component } from 'react';
import './Message.scss';

class Message extends Component {
  constructor(props) {
    super(props);
    let temp = JSON.parse(this.props.message);
    console.log("===============start");
    console.log(temp);
    console.log("===============end");
    this.state = {
      message: temp
    }
  }
  
  render() {
    return (
      <div className='Message'>
        {this.state.message.body}
      </div>
    );
  };

}

export default Message;