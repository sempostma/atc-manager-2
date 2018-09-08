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
import Donate from '../Donate/Donate';
import { landableRwys } from '../../lib/map';
import BackgroundSvg from '../../components/BackgroundSvg/BackgroundSvg';
import GameMetaControls from '../../components/GameMetaControls/GameMetaControls';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaInfo, FaCommentDots, FaCog, FaCompress, FaPlane, FaPaperPlane } from 'react-icons/fa';
class AtcView extends Component {
  constructor(props) {
    super();
    this.state = {
      traffic: GameStore.traffic,
      gameWidth: GameStore.width,
      gameHeight: GameStore.height,
      settingsExpanded: false,
      logsExpanded: false,
      aboutExpanded: false,
      logsOnlySelf: false,

      cmd: {
        tgt: null,
        heading: null,
        altitude: null,
        speed: null,
      }
    };

    this.dtcToDataListId = `dct-tgt-${Math.random().toString().replace('.', '')}`;
  }

  componentWillMount() {
    GameStore.on('change', this.handleGameStoreChange);
    SettingsStore.on('change', this.handleSettingsStoreChange);

    window.addEventListener('keypress', this.keyPress);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
    SettingsStore.removeListener('change', this.handleSettingsStoreChange);

    window.removeEventListener('keypress', this.keyPress);
  }

  handleKeyPress = e => {
    if (e.keyCode == 13 && this.state.cmd.tgt) {
      this.handleCmdExecution();
      return false;
    }
  }

  handleGameStoreChange = () => {
    this.setState({
      traffic: GameStore.traffic,
      gameWidth: GameStore.width,
      gameHeight: GameStore.height,
    });
  }

  handleSettingsStoreChange = () => {
    this.setState({});
  }

  handleCmdExecution = () => {
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
      return;
    }
    console.log('UPDATE', delta);
  }

  handleHeadingTgtChange = (e) => {
    this.setState(prevstate => {
      prevstate.cmd.heading = (+e.target.value + 359) % 360 + 1; 
    });
  }

  handleAltitudeTgtChange = e => {
    this.setState(prevstate => {
      prevstate.cmd.altitude = Math.min(+e.target.max, e.target.value);
      return prevstate;
    });
  }

  handleSpeedTgtChange = e => {
    this.setState(prevstate => {
      prevstate.cmd.speed = Math.min(+e.target.max, e.target.value);
      return prevstate;
    });
  }

  handleDirectToTgtChange = e => {
    const id = e.target.value;
    if (!this.state.cmd.tgt) return;
    this.setState(prevstate => {
      prevstate.cmd.direction = e.target.value;
      return prevstate;
    });
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
    const airplane = this.state.traffic[index];
    if (airplane === this.state.cmd.tgt) return;
    // if (this.state.cmd.tgt) this.handleCmdExecution(); // flush possible previous changes that werent yet debounced.
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

  handleTakeoffClick = () => {
    this.setState(prevstate => {
      prevstate.cmd.takeoff = true;
      return prevstate;
    });
    this.handleCmdExecution();
  }

  handleExpandSettingsButtonClick = () => {
    this.setState({ settingsExpanded: !this.state.settingsExpanded });
  }

  handleAboutExpanded = () => {
    this.setState({ aboutExpanded: !this.state.aboutExpanded });
  }

  handleLogsExpanded = () => {
    this.setState({ copied: false, logsExpanded: !this.state.logsExpanded });
  }

  handleOnlySelfButton = () => {
    this.setState({ logsOnlySelf: !this.state.logsOnlySelf });
  }

  handleLogsCopied = () => {
    this.setState({ logsCopied: true });
  }

  renderTraffic = () => {
    return this.state.traffic.map((airplane, i) => {
      if (airplane.outboundRwy) return;
      const y = this.state.gameHeight - airplane.y;
      const x = airplane.x;
      const spd = getSpdJsx(airplane, 'tspan');
      const alt = getAltJsx(airplane, 'tspan');
      const ltx = Math.sin(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
      const lty = Math.cos(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
      const path = 'M0,0 ' + airplane.path.map(p => `L${p[0] - airplane.x}, ${-(p[1] - airplane.y)}`);
      const violatingSep = GameStore.sepDistanceVialotions[airplane.flight];
      return <g className={`airplane ${routeTypes[airplane.routeType]} ${this.state.cmd.tgt === airplane ? 'airplane-active' : 'airplane-inactive'}`}
        data-index={i} key={i} transform={`translate(${x}, ${y})`} data-heading={airplane.heading}>
        {violatingSep ? <circle r={config.threeMileRuleDistance} className="sep" /> : null}
        <circle cx="0" cy="0" r="2" stroke-width="0" />
        <line x1="0" y1="0" x2={ltx} y2={-lty} />
        <path stroke-dasharray="4, 5" d={path} />
        <text>
          <tspan dy="1em">{operatorsById[airplane.operatorId].callsign}{airplane.flight}</tspan>
          <tspan dy="1em" x="0">{spd}</tspan>
          <tspan dy="1em" x="0">{alt}</tspan>
          { airplane.outboundWaypoint ? <tspan dy="1em" x="0">⇨{airplane.outboundWaypoint}</tspan> : null }
        </text>
      </g>;
    });
  }

  renderTrafficStack = () => {
    return this.state.traffic.map((airplane, i) => {
      const spd = getSpdJsx(airplane, 'span');
      const alt = getAltJsx(airplane, 'span');
      const heading = `000${Math.floor(airplane.heading)}`.substr(-3);
      const model = airplanesById[airplane.typeId];
      return <div className={`traffic-stack-entry ${routeTypes[airplane.routeType]} ${this.state.cmd.tgt === airplane ? 'traffic-active' : 'traffic-not-active'}`} data-index={i} key={i}>
        {operatorsById[airplane.operatorId].callsign}{airplane.flight} {spd} {alt} {model.shortName} {heading}°
        {airplane.outboundWaypoint ? `⇨${airplane.outboundWaypoint}` : null}
        {airplane.outboundRwy ? <span> RWY {airplane.outboundRwy}</span> : null}
      </div>
    });
  }

  renderTrafficControl = () => {
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
        <input type="text" value={cmd.direction} list={this.dtcToDataListId} onInput={this.handleDirectToTgtChange} />
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
        <button onClick={this.handleCmdExecution}><FaPaperPlane /> Give Command</button>
      </div>
      <div>
        <button onClick={this.handleTakeoffClick} className={cmd.tgt.outboundRwy ? '' : 'hidden'}><FaPlane /> Takeoff</button>
      </div>
      <div>{
        cmd.tgt.routeType === routeTypes.INBOUND && landableRwysArr && landableRwysArr.length > 0
          ? 'Land using "Direct to"'
          : null
      }</div>
    </div>
  }

  render() {
    const airplanes = this.renderTraffic();
    const trafficstack = this.renderTrafficStack();
    const trafficcontrol = this.renderTrafficControl();
    const logs = (this.state.logsOnlySelf ? GameStore.selfLog : GameStore.log)

    const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

    return (
      <div className="atc-view">
        <svg xmlns="http://www.w3.org/2000/svg" className="atc-view-svg" width={innerWidth - 250} height={innerHeight}
          onClick={this.handleSVGClick} viewBox="0 0 1280 720" style="background: #194850; overflow: visible">
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

        </div>

        <div className="traffic-stack-wrapper" style={{ height: innerHeight }}>
          <div className="traffic-stack" onClick={this.handleTrafficStackClick}>
            {trafficstack}
          </div>
          <div className="traffic-control">
            {trafficcontrol}
          </div>
          <div className="atc-view-buttons">
            <button className="w-100" onClick={this.handleExpandSettingsButtonClick}><FaCog />&nbsp;
              {this.state.settingsExpanded ? 'Hide Options' : 'Expand Options'}
            </button>
            <button className="w-100" onClick={this.handleLogsExpanded}><FaCommentDots />&nbsp;
              {this.state.logsExpanded ? 'Hide Logs' : 'Expand Logs'}
            </button>
            <button className="w-100" onClick={this.handleAboutExpanded}><FaInfo />&nbsp;
              {this.state.aboutExpanded ? 'Hide Info' : 'Expand Info'}
            </button>
            <GameMetaControls />
          </div>
        </div>

        <div className={[this.state.aboutExpanded ? null : 'hidden', 'about-panel'].join(' ')}>
          <div><span>Wind: {GameStore.winddir}° / {GameStore.windspd} kts</span></div>
          <div><span>ATIS: {GameStore.getAtis()}</span></div>
          <div><span>Altimeter: {GameStore.altimeter}</span></div>
          <br />
          Atc Manager 2 is a web based air traffic control game. Manage airspace of busy airports like Schiphol or Heathrow in a realistic simulator.
          Check out the <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager&hl=en_US" target="_blank">ATC Manager 1 App</a>
          <Donate />
          <br />
          <a title="Contact" href="https://esstudio.site/contact/">Contact Me</a>
          <div>Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          <button onClick={this.handleAboutExpanded}><FaCompress /> Hide Panel</button>
        </div>

        <div className={[this.state.logsExpanded ? null : 'hidden', 'logs-panel'].join(' ')}>
          <div>Departures: {GameStore.departures}</div>
          <div>Arrivals: {GameStore.arrivals}</div>
          <div>Seperation violations: {GameStore.distanceVialations}</div>
          <div class="logs-container">
            <div class="logs-inner">
              {logs.slice(logs.length - 10, logs.length).map((x, i) => <div key={i}>{x}</div>)}
            </div>
          </div>
          <div style={{ color: '#19242e' }}>{this.state.logsCopied ? 'Copied.' : '\u00a0'}</div>
          <CopyToClipboard text={logs.join('\r\n')}
            onCopy={this.handleLogsCopied}>
            <button>Copy logs</button>
          </CopyToClipboard>
          <button onClick={this.handleOnlySelfButton}>{this.state.logsOnlySelf
            ? 'Show all'
            : 'Only me'}</button>
          <button onClick={this.handleLogsExpanded}><FaCompress /> Hide Panel</button>
        </div>

        <div className={[this.state.settingsExpanded ? null : 'hidden', 'settings-panel'].join(' ')}>
          <h5>Settings</h5>
          <hr />
          <Settings />
          <button onClick={this.handleExpandSettingsButtonClick}><FaCompress /> Hide Options</button>
        </div>
      </div>
    );
  }
}

const getSpdJsx = (airplane, TagName) => {
  const tgtSpeed = airplane.altitude < 10000 ? Math.min(airplane.tgtSpeed, 250) : airplane.tgtSpeed;
  if (Math.abs(airplane.speed - tgtSpeed) > 5) {
    return <TagName>
      {Math.round(airplane.speed)}KTS
      {tgtSpeed > airplane.speed ? <TagName className="up">
        ⇧{Math.round(tgtSpeed)}KTS</TagName> : <TagName className="down">
          ⇩{Math.round(tgtSpeed)}KTS</TagName>}
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

const getParent = (e, matcher) => {
  let el = e.target;
  while (el) {
    if (matcher(el)) return el;
    el = el.parentElement;
  }
  return null;
}

export default AtcView;
