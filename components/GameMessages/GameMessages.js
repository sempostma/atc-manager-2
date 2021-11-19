import { Component } from 'preact';
import './GameMessages.css';
import { EventEmitter } from 'events';
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle
} from 'react-icons/fa/index.esm';

const emitter = new EventEmitter();

export const sendMessageInfo = msg => {
  emitter.emit('message', 'info', msg);
};

export const sendMessageWarning = warning => {
  emitter.emit('message', 'warning', warning);
};

export const sendMessageError = error => {
  emitter.emit('message', 'error', error);
};

const icons = {
  info: () => <FaInfoCircle />,
  warning: () => <FaExclamationCircle />,
  error: () => <FaTimesCircle />
};

export class GameMessages extends Component {
  constructor(props) {
    super();
    this.key = 0;
    this.len = 5;
    this.state = {
      messages: [
        // {
        //   type: 'info',
        //   message: 'example log'
        // }, {
        //   type: 'warning',
        //   message: 'example warning'
        // }, {
        //   type: 'error',
        //   message: 'example error'
        // }
      ]
    };
  }

  componentWillMount() {
    emitter.addListener('message', this.handleMessage);
  }

  componentWillUnmount() {
    emitter.removeListener('message', this.handleMessage);
  }

  handleMessage = (type, message) => {
    this.setState(prevstate => {
      prevstate.messages.push({ type, message, key: this.key++ });
      prevstate.messages = prevstate.messages.slice(-this.len);
      this.key %= this.len;
      return prevstate;
    });
  };

  render() {
    return (
      <div className="game-messages">
        {this.state.messages.map(msg => (
          <div data-type={msg.type} key={msg.key} className="message">
            {icons[msg.type]()} {msg.message}
          </div>
        ))}
      </div>
    );
  }
}
