import { Component } from 'preact';
import './SettingsPanel.css';
import Settings from '../../components/Settings/Settings';
import { FaCompress } from 'react-icons/fa/index.mjs';
import GameStore from '../../stores/GameStore';

class SettingsPanel extends Component {
  constructor(props) {
    super();
    this.state = {
    };

  }

  render() {
    return (
      <div className={[this.props.expanded ? null : 'hidden', 'settings-panel'].join(' ')}>
        <h5>Settings</h5>
        <hr />
        <Settings />
        <br />
        <button onClick={this.props.onToggle}><FaCompress /> Hide Options</button>
      </div>
    );
  }
}

export default SettingsPanel;
