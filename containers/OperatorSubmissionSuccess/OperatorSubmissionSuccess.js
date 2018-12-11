import { Component } from 'preact';
import './OperatorSubmissionSuccess.css';

class OperatorSubmissionSuccess extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="OperatorSubmissionSuccess">
        <h2>Thanks for your submission.</h2>
        <p>I will check it out and reply as fast i can.</p>
      </div>
    );
  }
}

export default OperatorSubmissionSuccess;
