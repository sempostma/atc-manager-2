import { Component } from 'preact';
import './AptDat.css';
import { history } from '../../index';
import { route } from 'preact-router';
import AptDatStore from '../../stores/AptDatStore';

class AptDat extends Component {
  constructor(props) {
    super();
    this.state = {
    };

  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="NotFound">
        <div className="panel">
          <h1>404</h1>
          Page not found<br /><br />
          <button onclick={() => route('/')}>Home</button>
          <button onclick={() => history.goBack()}>Back</button>
        </div>
      </div>
    );
  }
}

export default AptDat;
