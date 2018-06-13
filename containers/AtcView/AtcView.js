import { Component } from 'preact';
import './AtcView.css';
import GameStore from '../../stores/GameStore';
import config from '../../lib/config';
import { airplanesById, routeTypes, operatorsById } from '../../lib/airplane-library';
import Settings from '../../components/Settings/Settings';
import Communications from '../../lib/communications';
import SettingsStore from '../../stores/SettingsStore';
import WayPoints from '../../components/WayPoints/WayPoints';
import Airport from '../../components/Airport/Airport';
import { landableRwys } from '../../lib/map';
import BackgroundSvg from '../../components/BackgroundSvg/BackgroundSvg';
import GameMetaControls from '../../components/GameMetaControls/GameMetaControls';

class AtcView extends Component {
  constructor(props) {
    super();
    this.state = {
      traffic: GameStore.traffic,
      gameWidth: GameStore.width,
      gameHeight: GameStore.height,
      settingsExpanded: false,
      cmd: {
        tgt: null,
        heading: null,
        altitude: null,
        speed: null,
      }
    };

    this.handleGameStoreChange = this.handleGameStoreChange.bind(this);
    this.handleAltitudeTgtChange = this.handleAltitudeTgtChange.bind(this);
    this.handleHeadingTgtChange = this.handleHeadingTgtChange.bind(this);
    this.handleSpeedTgtChange = this.handleSpeedTgtChange.bind(this);
    this.handleCmdExecution = this.handleCmdExecution.bind(this);
    this.handleCmdExecutionDebounced = debounce(this.handleCmdExecution, 1500);
    this.handleSVGClick = this.handleSVGClick.bind(this);
    this.handleTrafficStackClick = this.handleTrafficStackClick.bind(this);
    this.handleAirplaneClick = this.handleAirplaneClick.bind(this);
    this.handleDirectToTgtChange = this.handleDirectToTgtChange.bind(this);
    this.handleTakeoffClick = this.handleTakeoffClick.bind(this);
    this.handleExpandSettingsButtonClick = this.handleExpandSettingsButtonClick.bind(this);
    this.handleSettingsStoreChange = this.handleSettingsStoreChange.bind(this);

    this.dtcToDataListId = `dct-tgt-${Math.random().toString().replace('.', '')}`;
  }

  componentWillMount() {
    GameStore.on('change', this.handleGameStoreChange);
    SettingsStore.on('change', this.handleSettingsStoreChange);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
    SettingsStore.removeListener('change', this.handleSettingsStoreChange);
  }

  handleGameStoreChange() {
    this.setState({
      traffic: GameStore.traffic,
      gameWidth: GameStore.width,
      gameHeight: GameStore.height,
    });
  }

  handleSettingsStoreChange() {
    this.setState({});
  }

  handleCmdExecution() {
    const cmd = this.state.cmd;
    if (!cmd.tgt) return;
    const delta = {};
    const model = airplanesById[cmd.tgt.typeId];
    if (cmd.direction && GameStore.callsigns[cmd.direction]) {
      if (cmd.direction !== cmd.tgt.tgtDirection) delta.tgtDirection = cmd.direction;
    }
    else if (typeof cmd.heading === 'number' && cmd.heading !== cmd.tgt.tgtDirection) delta.tgtDirection = cmd.heading;
    if (typeof cmd.altitude === 'number' && cmd.altitude !== cmd.tgt.tgtAltitude) delta.tgtAltitude = cmd.altitude = Math.min(model.ceiling * 1000, Math.max(2000, cmd.altitude));
    if (cmd.speed && cmd.speed !== cmd.tgt.tgtSpeed) delta.tgtSpeed = cmd.speed = Math.min(model.topSpeed, Math.max(model.minSpeed, cmd.speed));
    if (cmd.takeoff && cmd.tgt.outboundRwy) delta.outboundRwy = undefined;
    if (Object.keys(delta).length > 0) {
      var cmdTxt = Communications.getCommandText(cmd, GameStore.winddir, GameStore.windspd);
      GameStore.addLog(cmdTxt, true);
      if (SettingsStore.speechsynthesis) Communications.speak(cmdTxt);
      Object.assign(cmd.tgt, delta);
      this.setState({ cmd });
    } else {
      // do nothing
      return;
    }
    console.log('UPDATE', delta);
  }

  handleHeadingTgtChange(e) {
    this.setState(prevstate => {
      prevstate.cmd.heading = (+e.target.value + 360) % 360;
      prevstate.cmd.direction = null;
      return prevstate;
    });
    this.handleCmdExecutionDebounced();
  }

  handleAltitudeTgtChange(e) {
    this.setState(prevstate => {
      prevstate.cmd.altitude = Math.min(+e.target.max, e.target.value);
      return prevstate;
    });
    this.handleCmdExecutionDebounced();
  }

  handleSpeedTgtChange(e) {
    this.setState(prevstate => {
      prevstate.cmd.speed = Math.min(+e.target.max, e.target.value);
      return prevstate;
    });
    this.handleCmdExecutionDebounced();
  }

  handleDirectToTgtChange(e) {
    const id = e.target.value;
    if (!this.state.cmd.tgt) return;
    this.setState(prevstate => {
      prevstate.cmd.direction = e.target.value;
      return prevstate;
    });
    if (GameStore.callsigns[id])
      this.handleCmdExecutionDebounced();
  }

  handleSVGClick(e) {
    for (let i = 0; i < e.path.length; i++) {
      if (e.path[i].tagName === 'SVG') break;
      if (e.path[i].classList && e.path[i].classList.contains('airplane')) {
        const index = e.path[i].getAttribute('data-index');
        this.handleAirplaneClick(index);
        break;
      }
    }
  }

  handleTrafficStackClick(e) {
    for (let i = 0; i < e.path.length; i++) {
      if (e.path[i].classList.contains('traffic-stack')) break;
      if (e.path[i].classList && e.path[i].classList.contains('traffic-stack-entry')) {
        const index = e.path[i].getAttribute('data-index');
        this.handleAirplaneClick(index);
        break;
      }
    }
  }

  handleAirplaneClick(index) {
    const airplane = this.state.traffic[index];
    if (this.state.cmd.tgt) this.handleCmdExecution(); // flush possible previous changes that werent yet debounced.
    this.setState({
      cmd: {
        tgt: airplane,
        direction: typeof airplane.tgtDirection === 'string' ? airplane.tgtDirection : null,
        altitude: airplane.tgtAltitude,
        heading: typeof airplane.tgtDirection === 'number' ? airplane.tgtDirection : null,
        speed: airplane.tgtSpeed,
      }
    });
  }

  handleTakeoffClick() {
    this.setState(prevstate => {
      prevstate.cmd.takeoff = true;
      return prevstate;
    });
    this.handleCmdExecutionDebounced();
  }

  handleExpandSettingsButtonClick() {
    this.setState({ settingsExpanded: !this.state.settingsExpanded });
  }

  renderTraffic() {
    return this.state.traffic.map((airplane, i) => {
      if (airplane.outboundRwy) return;
      const y = this.state.gameHeight - airplane.y;
      const x = airplane.x;
      const spd = getSpdJsx(airplane, 'tspan');
      const alt = getAltJsx(airplane, 'tspan');
      const outboundWaypoint = airplane.outboundWaypoint;
      const ltx = Math.sin(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
      const lty = Math.cos(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
      const path = 'M0,0 ' + airplane.path.map(p => `L${p[0] - airplane.x}, ${-(p[1] - airplane.y)}`);
      const violatingSep = GameStore.sepDistanceVialotions[airplane.flight];
      return <g className={`airplane ${routeTypes[airplane.routeType]}`} data-index={i} key={i} transform={`translate(${x}, ${y})`} data-heading={airplane.heading}>
        {violatingSep ? <circle r={config.threeMileRuleDistance} className="sep" /> : null}
        <circle cx="0" cy="0" r="2" stroke-width="0" />
        <line x1="0" y1="0" x2={ltx} y2={-lty} />
        <path stroke-dasharray="4, 5" d={path} />
        <text>
          <tspan dy="1em">{operatorsById[airplane.operatorId].callsign}{airplane.flight}</tspan>
          <tspan dy="1em" x="0">{spd}</tspan>
          <tspan dy="1em" x="0">{alt}</tspan>
          {outboundWaypoint ? <tspan dy="1em" x="0">⇨{outboundWaypoint}</tspan> : null}
        </text>
      </g>;
    });
  }

  renderTrafficStack() {
    return this.state.traffic.map((airplane, i) => {
      const spd = getSpdJsx(airplane, 'span');
      const alt = getAltJsx(airplane, 'span');
      const heading = `000${Math.floor(airplane.heading)}`.substr(-3);
      const model = airplanesById[airplane.typeId];
      const outboundWaypoint = airplane.outboundWaypoint;
      return <div className={`traffic-stack-entry ${routeTypes[airplane.routeType]}`} data-index={i} key={i}>
        {operatorsById[airplane.operatorId].callsign}{airplane.flight} {spd} {alt} {model.shortName} {heading}°
        {outboundWaypoint ? `⇨${outboundWaypoint}` : null}
      </div>
    });
  }

  renderTrafficControl() {
    const cmd = this.state.cmd;
    if (!cmd.tgt) return;
    const model = airplanesById[cmd.tgt.typeId];
    const topSpeed = cmd.tgt.altitude > 10000 ? model.topSpeed : Math.min(model.topSpeed, 250);
    const landableRwysArr = this.state.cmd.tgt && this.state.cmd.tgt.altitude < 3200
      ? landableRwys(GameStore.airport, this.state.cmd.tgt, this.state.gameWidth, this.state.gameHeight)
        .map(lr => lr.rev ? lr.rwy.name2 : lr.rwy.name1).map(name => <option value={name} />)
      : null;
    return <div>
      <div>
        <span>Heading (°)</span>
        <input onInput={this.handleHeadingTgtChange} value={cmd.heading} type="number" step="10" />
      </div>
      <div>
        <span>Direct to </span>
        <input style="color: #333" value={cmd.direction} list={this.dtcToDataListId} onInput={this.handleDirectToTgtChange} />
        <datalist id={this.dtcToDataListId}>
          {cmd.tgt.routeType === routeTypes.INBOUND ? landableRwysArr : null}
          {Object.keys(GameStore.waypoints).map(w => <option value={w} />)}
        </datalist>
      </div>
      <div>
        <span>Speed (KTS)</span>
        <input onInput={this.handleSpeedTgtChange} value={cmd.speed} type="number" max={topSpeed} step="10" />
      </div>
      <div>
        <span>Altitude (FT)</span>
        <input onInput={this.handleAltitudeTgtChange} value={cmd.altitude} type="number" max={model.ceiling * 1000} step="1000" />
      </div>
      <div>
        <button onClick={this.handleTakeoffClick} className={cmd.tgt.outboundRwy ? '' : 'hidden'}>Takeoff</button>
      </div>
    </div>
  }

  render() {
    const airplanes = this.renderTraffic();
    const trafficstack = this.renderTrafficStack();
    const trafficcontrol = this.renderTrafficControl();

    return (
      <div className="atc-view">
        <svg xmlns="http://www.w3.org/2000/svg" className="atc-view-svg" width={window.innerWidth - 250} height={window.innerHeight}
          onClick={this.handleSVGClick} viewBox="0 0 1280 720" style="background: #194850">
          <style>{`
            text {
              font: 14px 'Helvetica';
              fill: #fff;
            }
            .airplane circle {
              fill: #fff;
            }
            .airplane line, .airplane path {
              stroke: #fff;
              stroke-width: 1;
              fill: none;
            }
            .airplane.inbound line, .airplane.inbound path {
              stroke: #bbf;
            }
            .airplane.outbound line, .airplane.outbound path {
              stroke: #bfb;
            }
            .airplane.enroute line, .airplane.enroute path {
              stroke: #ffb;
            }
            .airplane.inbound text, .airplane.inbound circle {
              fill: #bbf;
            }
            .airplane.outbound text, .airplane.outbound circle {
              fill: #bfb;
            }
            .airplane.enroute text, .airplane.enroute circle {
              fill: #ffb;
            }
            .airplane tspan.up {
              fill: #0f0;
            }
            .airplane tspan.down {
              fill: #f00;
            }
            .waypoint circle {
              fill: #fff;
            }
            .rwy-line {
              stroke: #fff;
              stroke-width: 3;
            }
            .ils-line {
              stroke: ${SettingsStore.ilsPathColor};
              stroke-width: 1;
            }
            .background path {
              fill: #1e606b;
            }
            .airplane circle.sep {
              fill: ${SettingsStore.sepVialationCircleColor};
              fill-opacity: 0.2;
              stroke: #f00;
            }
          `}</style>
          <BackgroundSvg name={GameStore.mapName} />
          <WayPoints />
          <Airport />
          {airplanes}
          <rect width="100%" height="100%" fill="none" stroke="#fff" stroke-dasharray="20, 20" />
        </svg>
        <div className="abs-container scores">
          <div>Departures: {GameStore.departures}</div>
          <div>Arrivals: {GameStore.arrivals}</div>
          <div>Seperation violations: {GameStore.distanceVialations}</div>
        </div>
        <div className="traffic-stack-wrapper" style={{ height: window.innerHeight }}>
          <div><span>Wind: {GameStore.winddir}° / {GameStore.windspd} kts</span></div>
          <div><span>Traffic:</span></div>
          <div className="traffic-stack" onClick={this.handleTrafficStackClick}>
            {trafficstack}
          </div>
          <div className={this.state.settingsExpanded ? null : 'hidden'}>
            <Settings />
          </div>
          <button onClick={this.handleExpandSettingsButtonClick}>
            {this.state.settingsExpanded ? 'Hide Options' : 'Expand Options'}
          </button>
          <div className="traffic-control">
            {trafficcontrol}
          </div>
          <GameMetaControls />
        </div>
      </div>
    );
  }
}

const debounce = (func, delay) => {
  let inDebounce
  return function () {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

const getSpdJsx = (airplane, TagName) => {
  if (Math.abs(airplane.speed - airplane.tgtSpeed) > 5) {
    return <TagName>
      {Math.round(airplane.speed)}KTS
      {airplane.tgtSpeed > airplane.speed ? <TagName className="up">
        ⇧{Math.round(airplane.tgtSpeed)}KTS</TagName> : <TagName className="down">
          ⇩{Math.round(airplane.tgtSpeed)}KTS</TagName>}
    </TagName>
  } else {
    return <TagName>{Math.round(airplane.speed)}KTS</TagName>
  }
}

const getAltFmtJSx = (alt, TagName) =>
  <TagName>{alt > 18000
    ? `FL${Math.floor(alt * .01)}`
    : `${Math.floor(alt)}FT`}</TagName>;


const getAltJsx = (airplane, TagName) => {
  if (Math.abs(airplane.tgtAltitude - airplane.altitude) > 100) {
    return <TagName>{getAltFmtJSx(airplane.altitude, TagName)}
      {airplane.tgtAltitude > airplane.altitude ? <TagName className="up">
        ⇧{getAltFmtJSx(airplane.tgtAltitude, TagName)}</TagName> : <TagName className="down">
          ⇩{getAltFmtJSx(airplane.tgtAltitude, TagName)}</TagName>}
    </TagName>;
  } else {
    return getAltFmtJSx(airplane.altitude, TagName);
  }
}

export default AtcView;
