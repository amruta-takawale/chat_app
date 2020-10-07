import React, { Component } from 'react';
import './App.css';
import {connect, sendMsg} from "./api"; 
import Header from "./components/Header/Header"
import ChatHistory from "./components/ChatHistory/ChatHistory"
import ChatInput from './components/ChatInput';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: []
    }
  }

  componentDidMount() {
    connect((msg) =>{
      console.log("New Message");
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state);
    });
  }

  send(event) {
    console.log("Welcome to Send Msg from App");
    if(event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value="";
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <ChatHistory chatHistory={this.state.chatHistory} />
        <ChatInput send={this.send}></ChatInput>
      </div>
    );
  }

}

export default App;
