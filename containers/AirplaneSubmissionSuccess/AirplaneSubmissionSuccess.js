import { Component } from 'preact';
import './AirplaneSubmissionSuccess.css';

class AirplaneSubmissionSuccess extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="AirplaneSubmissionSuccess">
        <h2>Thanks for your submission.</h2>
        <p>I will check it out and reply as fast i can.</p>
      </div>
    );
  }
}

export default AirplaneSubmissionSuccess;
