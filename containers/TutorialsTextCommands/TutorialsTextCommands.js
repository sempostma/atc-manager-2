import { Component } from 'preact';
import './TutorialsTextCommands.css';
import { route } from 'preact-router';
import { history } from '../../index';

class TutorialsTextCommands extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleTutorialClick = () => {
    route('/tutorials');
  };

  render() {
    return (
      <div className="TutorialsTextCommands tutorial">
        <div className="abs-container">
          <button onClick={this.handleTutorialClick}>All Tutorials</button>
        </div>
        <div className="panel">
          <h3 className="text-center">Text Comands Tutorial</h3>
        </div>
        <div className="panel">
          <section>
            <h4>Enable text commands</h4>
            <p>
              To enable text commands you have to go into advanced settings.
            </p>
            <img
              alt="Open advanced settings"
              title="Open advanced settings"
              src="assets/images/tutorials/text-commands/advanced-settings.png"
            />
            <p>Then switch the "Text commands" to "On"</p>
            <img
              alt="Enable text commands"
              title="Enable text commands"
              src="assets/images/tutorials/text-commands/text-commands.png"
            />
          </section>

          <section>
            <h4>Command formats</h4>
            <p>Commands are case insensitive</p>

            <h5>Changing heading</h5>
            <div>&lt;airplane callsign&gt; HDG &lt;heading in degrees&gt;</div>
            <div>&lt;airplane callsign&gt; turn &lt;heading in degrees&gt;</div>
            <div>
              &lt;airplane callsign&gt; turn left heading &lt;heading in
              degrees&gt;
            </div>
            <br />
            <p>e.g DLH213 turn left heading 200</p>

            <h5>Changing altitude</h5>
            <div>
              &lt;airplane callsign&gt; alt &lt;flightlevel or altitude in
              feet&gt;
            </div>
            <div>
              &lt;airplane callsign&gt; climb and maintain &lt;flightlevel or
              altitude in feet&gt;
            </div>
            <br />
            <p>DLH213 alt fl230</p>

            <h5>Changing "Direct to"</h5>
            <div>
              &lt;airplane callsign&gt; dct &lt;waypoint/runway callsign&gt;
            </div>
            <div>
              &lt;airplane callsign&gt; direct &lt;waypoint/runway callsign&gt;
            </div>
            <div>
              &lt;airplane callsign&gt; direct to &lt;waypoint/runway
              callsign&gt;
            </div>
            <br />
            <p>e.g DLH213 dct EH11</p>

            <h5>Changing speed</h5>
            <div>&lt;airplane callsign&gt; spd &lt;speed in knots&gt;</div>
            <div>
              &lt;airplane callsign&gt; increase speed &lt;speed in knots&gt;
            </div>
            <div>
              &lt;airplane callsign&gt; reduce speed &lt;speed in knots&gt;
            </div>
            <div>
              &lt;airplane callsign&gt; reduce speed to &lt;speed in knots&gt;
            </div>
            <br />
            <p>e.g DLH213 spd 200</p>

            <h5>Takeoff</h5>
            <div>&lt;airplane callsign&gt; takeoff</div>
            <div>&lt;airplane callsign&gt; clear for takeoff</div>
            <br />
            <p>e.g DLH213 clear for takeoff</p>

            <h5>Go-around</h5>
            <div>&lt;airplane callsign&gt; go around</div>
            <div>&lt;airplane callsign&gt; goaround</div>
            <br />
            <p>e.g DLH213 go around</p>

            <h5>Target State (VFR)</h5>
            <div>&lt;airplane callsign&gt; extend &lt;vfr state&gt;</div>
            <br />
            <p>e.g DLH213 extend downwind</p>
          </section>

          <button className="button" onClick={() => route('/tutorials')}>
            All Tutorials
          </button>
          <button className="button" onClick={() => history.goBack()}>
            Done
          </button>
        </div>
      </div>
    );
  }
}

export default TutorialsTextCommands;
