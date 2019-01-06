import { Component } from 'preact';
import './TutorialsIntro.css';
import { route } from 'preact-router';
import { history } from '../../index';
import { loadState, saveState } from '../../lib/persistance';

class TutorialsIntro extends Component {
  constructor(props) {
    super();
    this.state = {};

    const state = loadState();
    state.introTutorial = true;
    saveState(state);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleTutorialClick = () => {
    route('/tutorials');
  };

  render() {
    return (
      <div className="TutorialsIntro tutorial">
        <div className="abs-container">
          <button onClick={this.handleTutorialClick}>All Tutorials</button>
        </div>
        <div className="panel">
          <h3 className="text-center">Intro Tutorial</h3>
        </div>
        <div className="panel">
          <section id="tut-intro-index">
            <h4>Index</h4>
            <ul>
              <li>Starting</li>
              <li>Giving commands</li>
              <li>Landing</li>
            </ul>
          </section>
          <section id="tut-intro-starting">
            <h4>Starting</h4>
            <p>
              Start by selecting an area (default). You can leave everything on
              default except for the difficulty setting.
            </p>
            <img
              title="The start panel"
              alt="The start panel"
              src="assets/images/tutorials/intro/start-panel.png"
            />
            <p>Press "START". You will now see something like this:</p>
            <img
              title="The game"
              alt="The game"
              src="assets/images/tutorials/intro/start-atc-view.png"
            />
            <p>
              There are 3 elements on your screen. The radar in the middle is
              your overview. The panel in the top right (see image below) is a
              list of flight strips. These are all the flights you're managing.
            </p>
            <img
              alt="Flight strips"
              title="Flight strips"
              src="assets/images/tutorials/intro/traffic-stack.png"
            />
            <p>
              The buttons in the bottom right (see image below) allow you to
              pause, save, change optons, view logs and view information about
              your airfield and the game.
            </p>
            <img
              title="Buttons"
              alt="Buttons"
              src="assets/images/tutorials/intro/btns.png"
            />
            <p>
              Every airplane on the radar screen has text next to it. It
              includes the altitude in feet or flight level and the planes
              airspeed in knots{' '}
              <a
                href="https://en.wikipedia.org/wiki/Knot_(unit)"
                target="_blank"
              >
                (wiki)
              </a>
              . Flight level{' '}
              <a
                href="https://en.wikipedia.org/wiki/Flight_level"
                target="_blank"
              >
                (wiki)
              </a>{' '}
              or "FL" is roughly one hundredth of a feet (12,000 ft is FL120).
              Flight levels depend on air pressure while altitude in feet
              references the altitude above mean sea level (MSL). Transition
              altitude (TA) is when airplanes switch over to using flight
              levels. This is usually 18,000 ft. You can view more information
              about an airplane by clicking the question mark on the airplane's
              flight strip (see image below).
            </p>
            <img
              title="Question mark button"
              alt="Question mark button"
              src="assets/images/tutorials/intro/question-mark.png"
            />
            <p>
              This opens a panel which includes information about the plane,
              like the operator, the callsign, airplane specification, etc.
            </p>
            <img
              title="Airplane information panel"
              alt="Airplane information panel"
              src="assets/images/tutorials/intro/airplane-info.png"
            />
            <p>
              If you click on an airplane in the flight strips list or on the
              radar screen the airplane becomes highlighted.
            </p>
            <img
              alt="Airplane not selected"
              title="Airplane not selected"
              src="assets/images/tutorials/intro/airplane.png"
            />
            <img
              alt="Airplane selected"
              title="Airplane selected"
              src="assets/images/tutorials/intro/airplane-selected.png"
            />
            <p>
              A fourth element will appear on your screen. The "commands" panel
              (see image below).
            </p>
            <img
              title="Commands panel"
              alt="Commands panel"
              src="assets/images/tutorials/intro/commands.png"
            />
            <p>
              This can be used to give airplanes commands. Like the airplanes
              direction (heading), it's altitude, speed, and other commands like
              "go-around" and "takeoff".
            </p>
          </section>
          <section id="tut-intro-commands">
            <h4>Giving commands</h4>
            <p>
              Let's start by changing the airplane's direction. As a reference
              let's look at this compass:
            </p>
            <img
              title="Compass"
              alt="Compass"
              src="assets/images/tutorials/intro/compass.jpg"
            />
            <p>
              Every direction is given in degrees. There are a total of 360
              different directions. 0 or 360° is north, 90° is east, 180° is
              south and 270° is west. Let's change heading to 180° (south).
            </p>
            <img
              title="Heading south"
              alt="Heading south"
              src="assets/images/tutorials/intro/heading.png"
            />
            <p>Then press the "GIVE COMMAND" button.</p>
            <img
              title="Give command"
              alt="Give command"
              src="assets/images/tutorials/intro/give-command.png"
            />
            <p>
              You will notice the airplane slowly turning to left until it
              reaches a heading of 180°.
            </p>
            <img
              title="Airplane turning to the south"
              alt="Airplane turning to the south"
              src="assets/images/tutorials/intro/airplane-south.png"
            />
            <p>
              You can do the same thing for the "Direct to", "Speed" and
              "Altitude" boxes. The reason the airplane was turning so slow is
              because it's still flying at cruise speed. Let's lower it's speed
              to 270 knots. The knot is a unit of speed equel to one nautical
              mile per hour, exactly 1.852 km/h and approximately 1.15078 mph
              <a
                href="https://en.wikipedia.org/wiki/Knot_(unit)"
                target="_blank"
              >
                (wiki)
              </a>
              . After you've changed the speed box to "270", press "GIVE
              COMMAND". You will notice a red arrow pointing down next to the
              airspeed. This means the airplane is reducing it's speed.
            </p>
          </section>
          <section>
            <h4>Landing</h4>
            <p>
              To land an airplane you first have to line it up with the runway
              (see image below), it has be less then 3200 feet above the airport
              and has to flying in the general direction of the runway.
            </p>
            <img
              title="Airplane lining up with the ILS"
              alt="Airplane lining up with the ILS"
              src="assets/images/tutorials/intro/ils.png"
            />
            <p>
              If this is all correct, you will see the message, "Land using
              'Direct to'", under the "GIVE COMMAND" button. Select the runway
              in the "Direct to" input box.
            </p>
            <img
              title="Select runway"
              alt="Select runway"
              src="assets/images/tutorials/intro/dct-rwy.png"
            />
            <p>Then click "GIVE COMMAND".</p>
            <img
              title="Select runway command"
              alt="Select runway command"
              src="assets/images/tutorials/intro/dct-rwy-cmd.png"
            />
          </section>
          <p>
            Hopefully you know how to start. If you don't or you have a
            question,
            <a href="https://en.wikipedia.org/wiki/Knot_(unit)" target="_blank">
              visit the subreddit
            </a>
            . If you want to continue learning, you can check out more tutorials
            by clicking the "All TUTORIALS" button below.
          </p>
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

export default TutorialsIntro;
