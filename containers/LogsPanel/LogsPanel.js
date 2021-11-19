import { Component } from 'preact';
import './LogsPanel.css';
import GameStore from '../../stores/GameStore';
import { FaCompress } from 'react-icons/fa/index.esm';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class LogsPanel extends Component {
  constructor(props) {
    super();
    this.state = {
      logsOnlySelf: false
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleOnlySelfButton = () => {
    this.setState({ logsOnlySelf: !this.state.logsOnlySelf });
  };

  render() {
    const logs = this.state.logsOnlySelf ? GameStore.selfLog : GameStore.log;
    return (
      <div
        className={[this.props.expanded ? null : 'hidden', 'logs-panel'].join(
          ' '
        )}
      >
        <div>Departures: {GameStore.departures}</div>
        <div>Arrivals: {GameStore.arrivals}</div>
        <div>Seperation violations: {GameStore.distanceVialations}</div>
        <div>Unpermitted departures: {GameStore.unpermittedDepartures}</div>

        <div class="logs-container">
          <div class="logs-inner">
            {logs.slice(logs.length - 10, logs.length).map((x, i) => (
              <div key={i}>{x}</div>
            ))}
          </div>
        </div>
        <div style={{ color: '#19242e' }}>
          {this.state.logsCopied ? 'Copied.' : '\u00a0'}
        </div>
        <CopyToClipboard
          text={logs.join('\r\n')}
          onCopy={this.handleLogsCopied}
        >
          <button>Copy logs</button>
        </CopyToClipboard>
        <button onClick={this.handleOnlySelfButton}>
          {this.state.logsOnlySelf ? 'Show all' : 'Only me'}
        </button>
        <button onClick={this.props.onToggle}>
          <FaCompress /> Hide Panel
        </button>
      </div>
    );
  }
}

export default LogsPanel;
