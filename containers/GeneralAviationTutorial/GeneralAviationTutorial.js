import { Component } from 'preact';
import './GeneralAviationTutorial.css';

class GeneralAviationTutorial extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="GeneralAviationTutorial">
        <div className="panel">
          <h1>General Aviation Tutorial</h1>
          <div style="padding: 30px 20px;">
            If you're a beginner to the game it's best to leave the general
            aviation checkbox off. Read this tutorial if you're interested to
            learn the basics of "visual flight rules" or want to learn how
            general aviation in the game works.
          </div>
        </div>

        <div className="panel">WIPPPPPPPPPPPPPP</div>
      </div>
    );
  }
}

export default GeneralAviationTutorial;
