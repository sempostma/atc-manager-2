import { Component } from 'preact';
import './GameMetaControls.css';
import GameStore from '../../stores/GameStore';
import { saveState, loadState, decimalFormatter } from '../../lib/persistance';
import {
  FaPause,
  FaPlay,
  FaDesktop,
  FaSave,
  FaPlane
} from 'react-icons/fa/index.esm';
import {
  sendMessageError,
  sendMessageWarning,
  sendMessageInfo
} from '../GameMessages/GameMessages';

class GameMetaControls extends Component {
  constructor(props) {
    super();

    this.state = {
      paused: GameStore.paused,
      started: GameStore.started
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
      started: GameStore.started
    });
  };

  handlePauseResumeButtonClick = () => {
    GameStore[GameStore.paused ? 'resume' : 'pause']();
  };

  handleSaveButtonClick = () => {
    const game = JSON.parse(
      JSON.stringify(GameStore.toJson(), decimalFormatter(2))
    );
    const state = loadState();
    let name = prompt(
      'Name of your save?',
      `${GameStore.mapName} - ${new Date().toLocaleDateString()}`
    );
    if (!name) return sendMessageWarning('Please give a valid name...');
    if (state.games[name]) {
      var result = confirm(
        'This save already exists. Do you want to overwrite it?'
      );
      if (result === false)
        return sendMessageWarning(`${name} was not saved...`);
    }
    state.games[name] = game;
    saveState(state);
    sendMessageInfo(`${name} was saved...`);
  };

  render() {
    const paused = this.state.paused;
    return (
      <div className="gamemetacontrols">
        <button className="w-50" onClick={this.handlePauseResumeButtonClick}>
          {paused ? (
            <span>
              <FaPlay /> Resume
            </span>
          ) : (
            <span>
              <FaPause /> Pause
            </span>
          )}
        </button>
        <button className="w-50" onClick={this.handleSaveButtonClick}>
          <FaSave /> Save
        </button>
      </div>
    );
  }
}

export default GameMetaControls;
