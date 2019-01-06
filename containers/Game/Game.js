import { Component } from 'preact';
import './Game.css';
import AtcView from '../AtcView/AtcView';
import GameStore from '../../stores/GameStore';
import SettingsStore from '../../stores/SettingsStore';

class Game extends Component {
  constructor(props) {
    super();
    this.name = SettingsStore.selectedMapId;
  }

  componentWillMount() {
    if (GameStore.started) return;
    else GameStore.startMap(this.name);
  }

  render() {
    return (
      <div className="Game">
        <div id="atc-game">
          <AtcView />
        </div>
      </div>
    );
  }
}

export default Game;
