import { Component } from 'preact';
import './TimelapseOverview.css';
import { loadState, saveState } from '../../lib/persistance';
import { Route, Link, route } from 'preact-router';
import GameStore from '../../stores/GameStore';
import SavedTimelapseOpen from '../../components/SavedTimelapseOpen/SavedTimelapseOpen';

class TimelapseOverview extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleHomeCLick() {
    route('/');
  }

  render() {
    return (
      <div className="TimelapseOverview">
        <div className="abs-container">
          <button onClick={this.handleHomeCLick}>Home</button>
        </div>
        <div class="panel">
          <h3 className="text-center">Timelapse overview</h3>
        </div>
        <div className="panel">
          <SavedTimelapseOpen />
        </div>
      </div>
    );
  }
}

export default TimelapseOverview;
