import { Component } from 'preact';
import './AtcView.css';
import GameStore from '../../stores/GameStore';
import { airplanesById } from '../../lib/airplane-library/airplane-library';
import Communications from '../../lib/communications';
import SettingsStore from '../../stores/SettingsStore';
import TrafficStack from '../../components/TrafficStack/TrafficStack';
import SvgRadar from '../../components/SvgRadar/SvgRadar';
import { sendMessageWarning } from '../../components/GameMessages/GameMessages';
import communications from '../../lib/communications';
import { EventEmitter } from 'events';
import Airplane from '../../lib/airplane';

class AtcView extends Component {
  constructor(props) {
    super();
    this.state = {
      logsOnlySelf: false,
      infoPanelTgt: null,

      cmd: {
        tgt: null,
        heading: null,
        altitude: null,
        direction: null,
        speed: null,
        directionOld: null,
      }
    };

    this.emitter = new EventEmitter();
  }

  componentWillMount() {
    GameStore.on('change', this.handleGameStoreChange);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
  }

  handleGameStoreChange = () => {
    this.setState({});
  }

  handleSVGClick = e => {
    const airplane = getParent(e, element => (element.getAttribute('class') || '').indexOf('airplane') !== -1);
    if (!airplane) return;
    const index = airplane.getAttribute('data-index');
    this.handleAirplaneClick(index);
  }

  handleTrafficStackClick = e => {
    const airplane = getParent(e, element => (element.getAttribute('class') || '').indexOf('traffic-stack-entry') !== -1);
    if (!airplane) return;
    const index = airplane.getAttribute('data-index');
    this.handleAirplaneClick(index);
  }

  handleAirplaneClick = index => {
    const airplane = GameStore.traffic[index];
    if (airplane === this.state.cmd.tgt) {
      airplane.textRotation = (airplane.textRotation || 0) + 1;
      airplane.textRotation %= 4;
      this.setState({});
      return;
    }
    // if (this.state.cmd.tgt) this.handleCmdExecution(); // flush possible previous changes that werent yet debounced.
    this.setState({
      cmd: {
        tgt: airplane,
        direction: typeof airplane.tgtDirection === 'string' ? airplane.tgtDirection : null,
        altitude: airplane.tgtAltitude,
        heading: typeof airplane.tgtDirection === 'number' ? airplane.tgtDirection : null,
        speed: airplane.tgtSpeed,
        tgtVfrState: airplane.tgtVfrState
      }
    }, () => {
      this.emitter.emit('click', this.state.cmd);
    });
  }

  handleCmdExecution = () => {
    const cmd = this.state.cmd;
    if (!cmd.tgt) return;
    const delta = {};
    const model = airplanesById[cmd.tgt.typeId];
    if (cmd.goAround) {
      cmd.direction = '';
      cmd.heading = null;
    }
    if (typeof cmd.heading === 'number') {
      cmd.heading = (cmd.heading + 359) % 360 + 1;
    }
    if (cmd.direction && GameStore.callsigns[cmd.direction] && cmd.directionOld === false) {
      if (cmd.direction !== cmd.tgt.tgtDirection) delta.tgtDirection = cmd.direction;
      cmd.directionOld = true;
      cmd.heading = '';
    }
    else if (typeof cmd.heading === 'number' && cmd.heading !== cmd.tgt.tgtDirection) {
      delta.tgtDirection = cmd.heading;
      cmd.direction = '';
    }
    if (typeof cmd.altitude === 'number' && !Airplane.isVFR(cmd.tgt) && cmd.altitude !== cmd.tgt.tgtAltitude) delta.tgtAltitude = cmd.altitude = Math.min(model.ceiling * 1000, Math.max(2000, cmd.altitude));
    if (cmd.speed && cmd.speed !== cmd.tgt.tgtSpeed) delta.tgtSpeed = cmd.speed = Math.min(model.topSpeed, Math.max(model.minSpeed, cmd.speed));
    if (cmd.takeoff && cmd.tgt.rwy) {
      const rwyWaitingOn = GameStore.rwyWaitingOn(cmd.tgt);
      if (rwyWaitingOn.length > 0) {
        sendMessageWarning(`${communications.getCallsign(cmd.tgt, true)} cannot takeoff, they are behind ${communications.getCallsign(rwyWaitingOn.pop(), true)}`);
        return;
      }
      delta.waiting = false;
    }
    if (cmd.goAroundVFR) {
      delta.dirty = false;
    }
    if (typeof cmd.tgtVfrState === 'number' && cmd.tgtVfrState !== cmd.tgt.tgtVfrState) delta.tgtVfrState = cmd.tgtVfrState;
    if (Object.keys(delta).length > 0) {
      var cmdTxt = Communications.getCommandText(cmd, GameStore.winddir, GameStore.windspd, GameStore.map, GameStore.callsignsPos);
      const atcMsg = Communications.getCallsign(cmd.tgt) + ', ' + cmdTxt;
      GameStore.addLog(atcMsg, 'ATC');
      // pilot:
      const pilotMsg = cmdTxt + ', ' + Communications.getCallsign(cmd.tgt);
      GameStore.addLog(pilotMsg, Communications.getCallsign(cmd.tgt, true));

      if (SettingsStore.speechsynthesis) Communications.speak(atcMsg);
      Object.assign(cmd.tgt, delta);
      this.setState({ cmd });
    } else {
      // do nothing
    }
    if (cmd.takeoff) {
      delete cmd.takeoff;
    }
    if (cmd.goAroundVFR) {
      delete cmd.goAroundVFR;
    }
    if (cmd.goAround) {
      delete cmd.goAround;
    }
  }

  handleZoom = e => {
    GameStore.adjustZoom(-e.deltaY);
  }

  handleCmdChange = cmd => {
    this.setState({ cmd });
  }

  render() {
    return (
      <div className="atc-view">
        <SvgRadar onZoom={this.handleZoom} onClick={this.handleSVGClick} cmd={this.state.cmd} />

        <TrafficStack
          cmd={this.state.cmd}
          onChange={this.handleCmdChange}
          onCmdExecution={this.handleCmdExecution}
          emitter={this.emitter}
          onClick={this.handleTrafficStackClick} />
      </div >
    );
  }
}

const getParent = (e, matcher) => {
  let el = e.target;
  while (el) {
    if (matcher(el)) return el;
    el = el.parentElement;
  }
  return null;
};

export default AtcView;
