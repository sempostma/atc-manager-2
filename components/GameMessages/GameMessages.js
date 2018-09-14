import { Component } from 'preact';
import css from './GameMessages.css';
import { EventEmitter } from 'events';
import { FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa/index.mjs';

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
      ],
    };
  }

  componentWillMount() {
    emitter.addListener('message', this.handleMessage);
  }

  componentWillUnmount() {
  }

  handleMessage = (type, message) => {
    this.setState(prevstate => {
      prevstate.messages.push({ type, message });
      prevstate.messages = prevstate.messages.slice(-5);
      return prevstate;
    });
  }

  render() {
    return (
      <div className={css.GameMessages}>
        {this.state.messages.map(msg =>
          <div data-type={msg.type} className={`${css.Message}`}>
            {icons[msg.type]()} {msg.message}
          </div>
        )}
      </div>
    );
  }
}
