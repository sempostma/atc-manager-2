import { Component } from 'preact';
import './TutorialsRoot.css';
import { FaInfo } from 'react-icons/fa/index.esm';
import { Link, route } from 'preact-router';
import GameStore from '../../stores/GameStore';

class TutorialsRoot extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleHomeClick = () => {
    route('/');
  };

  render() {
    return (
      <div className="TutorialsRoot">
        <div className="abs-container">
          <button onClick={this.handleHomeClick}>Home</button>
        </div>
        <div className="panel">
          <h3 className="text-center">Tutorials</h3>
        </div>

        <div className="panel panel-links" style={{ padding: 3 }}>
          <Link href="/tutorials/intro">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaInfo />
                </span>
                <br />
                Intro
              </div>
            </div>
          </Link>
          <Link href="/tutorials/text-commands">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaInfo />
                </span>
                <br />
                Text commands (not&nbsp;finished)
              </div>
            </div>
          </Link>
          <span className="inline-block disabled">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaInfo />
                </span>
                <br />
                General Aviation (not&nbsp;finished)
              </div>
            </div>
          </span>
          <span className="inline-block disabled">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaInfo />
                </span>
                <br />
                Advanced (not&nbsp;finished)
              </div>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default TutorialsRoot;
