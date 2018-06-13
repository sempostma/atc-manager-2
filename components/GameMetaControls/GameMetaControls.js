import { Component } from 'preact';
import './GameMetaControls.css';
import GameStore from '../../stores/GameStore';
import { saveState, loadState } from '../../lib/persistance';

class GameMetaControls extends Component {
  constructor(props) {
    super();

    this.state = {
      paused: GameStore.paused,
      started: GameStore.started,
    };

    this.handleGameStoreChange = this.handleGameStoreChange.bind(this);
    this.handlePauseResumeButtonClick = this.handlePauseResumeButtonClick.bind(this);
    this.handleScreenShotButtonClick = this.handleScreenShotButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  componentWillMount() {
    GameStore.on('change', this.handleGameStoreChange);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
  }

  handleGameStoreChange() {
    this.setState({
      paused: GameStore.paused,
      started: GameStore.started,
    })
  }

  handlePauseResumeButtonClick() {
    GameStore[GameStore.paused ? 'resume' : 'pause']();
  }

  handleScreenShotButtonClick(e) {
    if (!GameStore.svgEl) return;
    let el = GameStore.svgEl.getElementsByTagName('svg')[0];
    let source = '<?xml version="1.0" standalone="no"?>\n' + el.outerHTML;

    // convert svg source to URI data scheme.
    let url = "data:image/svg+xml;base64," + btoa(source);
    e.target.setAttribute('href', url);
    e.target.setAttribute('download', 'screenshot');
  }

  handleSaveButtonClick() {
    const game = GameStore.toJson();
    const state = loadState();
    let name = prompt('Name of your save?', `${GameStore.mapName} - ${new Date().toLocaleDateString()}`);
    if (state.games[name]) return alert('Sorry this name already exists...');
    state.games[name] = game;
    saveState(state);
  }

  render() {
    const paused = this.state.paused;
    return (
      <div className="gamemetacontrols">
        <a href="#" className="button" onClick={this.handleScreenShotButtonClick}>Screenshot</a>
        <button onClick={this.handlePauseResumeButtonClick}>{paused ? 'Resume' : 'Pause'}</button>
        <button onClick={this.handleSaveButtonClick}>Save</button>
      </div>
    );
  }
}

export default GameMetaControls;
