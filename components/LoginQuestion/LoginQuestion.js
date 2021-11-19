import React, { Component } from 'preact';
import './LoginQuestion.css';
import { Route, Link, route } from 'preact-router';
import UIStateStore from '../../stores/UIStateStore';

class LoginQuestion extends Component {
  constructor(props) {
    super();

    this.state = { };
  }

  componentWillMount() {
    UIStateStore.on('change', this.handleUIStateStoreChange);
  }

  componentWillUnmount() {
    UIStateStore.removeListener('change', this.handleUIStateStoreChange);
  }

  handleUIStateStoreChange(action) {
    
  }

  signIn() {
    UIStateStore.showLoginScreen()
  }

  render() {
    return (
      <div className="LoginQuestion">
        <h3>Sign in to save your progression.</h3>
        <button onClick={this.signIn}>Sign In</button>
      </div>
    );
  }
}

export default LoginQuestion;
