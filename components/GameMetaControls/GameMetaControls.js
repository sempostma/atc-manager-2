import { Component } from 'preact';
import './GameMetaControls.css';
import GameStore from '../../stores/GameStore';
import { saveState, loadState } from '../../lib/persistance';
import { FaPause, FaPlay, FaDesktop, FaSave, FaPlane } from 'react-icons/fa/index.mjs';
import { sendMessageError } from '../GameMessages/GameMessages';


class GameMetaControls extends Component {
  constructor(props) {
    super();

    this.state = {
      paused: GameStore.paused,
      started: GameStore.started,
    };
  }

  componentWillMount() {
    GameStore.on('change', this.handleGameStoreChange);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
  }

  handleGameStoreChange = () => {
    this.setState({
      paused: GameStore.paused,
      started: GameStore.started,
    });
  }

  handlePauseResumeButtonClick = () => {
    GameStore[GameStore.paused ? 'resume' : 'pause']();
  }

  handleSaveButtonClick = () => {
    const game = GameStore.toJson();
    const state = loadState();
    let name = prompt('Name of your save?', `${GameStore.mapName} - ${new Date().toLocaleDateString()}`);
    if (name === null) return;
    if (state.games[name]) return sendMessageError('Sorry this name already exists...');
    state.games[name] = game;
    saveState(state);
  }

  render() {
    const paused = this.state.paused;
    return (
      <div className="gamemetacontrols">
        <button className="w-50" onClick={this.handlePauseResumeButtonClick}>{paused ? <span><FaPlay /> Resume</span> : <span><FaPause/> Pause</span>}</button>
        <button className="w-50" onClick={this.handleSaveButtonClick}><FaSave /> Save</button>
      </div>
    );
  }
}

export default GameMetaControls;
