import { Component } from 'preact';
import './NotFound.css';
import { history } from '../../index';
import { route } from 'preact-router';

class NotFound extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="NotFound">
        <div className="panel">
          <h1>404</h1>
          Page not found
          <br />
          <br />
          <button onclick={() => route('/')}>Home</button>
          <button onclick={() => history.goBack()}>Back</button>
        </div>
      </div>
    );
  }
}

export default NotFound;
