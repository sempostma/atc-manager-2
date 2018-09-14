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
import { landableRwys, idType, activeRwys } from '../../lib/map';
import BackgroundSvg from '../../components/BackgroundSvg/BackgroundSvg';
import GameMetaControls from '../../components/GameMetaControls/GameMetaControls';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaInfo, FaCommentDots, FaCog, FaCompress, FaPlane, FaPaperPlane, FaDesktop, FaQuestion } from 'react-icons/fa/index.mjs';
import GitHubButton from 'react-github-button';
import { saveAs } from 'file-saver';

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
      infoExpanded: false,
      logsOnlySelf: false,
      infoPanelTgt: null,

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

    if (typeof window !== 'undefined') window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
    SettingsStore.removeListener('change', this.handleSettingsStoreChange);

    if (typeof window !== 'undefined') window.removeEventListener('keypress', this.handleKeyPress);
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
      prevstate.cmd.heading = +e.target.value;
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
    if (!this.state.cmd.tgt) return;
    this.setState(prevstate => {
      prevstate.cmd.direction = e.target.value.toUpperCase().trim();
      prevstate.cmd.directionOld = false;
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

  handleCloseAirplaneInfoPanel = e => {
    this.setState({ infoPanelTgt: null });
  }

  handleTrafficStackInfoButtonClick = e => {
    const index = e.srcElement.parentElement.getAttribute('data-index');
    const airplane = this.state.traffic[index];
    const model = airplanesById[airplane.typeId];

    this.setState({ infoPanelTgt: { airplane, model } });
  }

  handleScreenShotButtonClick = e => {
    if (!GameStore.svgEl) return;
    let el = GameStore.svgEl.getElementsByTagName('svg')[0];
    let source = '<?xml version="1.0" standalone="no"?>\n' + el.outerHTML;

    saveAs(new Blob([source], {
      type: 'image/svg+xml'
    }), `Screenshot ${GameStore.map.name}.svg`);
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
      const textHeight = (airplane.outboundWaypoint ? 4 : 3) * 14;

      const textAnchor = airplane.textRotation === 1 || airplane.textRotation === 2 ? 'end' : 'start';
      const textTranslate = `translate(0, ${airplane.textRotation > 1 ? -textHeight : 0})`;

      return <g className={`airplane ${routeTypes[airplane.routeType]} ${this.state.cmd.tgt === airplane ? 'airplane-active' : 'airplane-inactive'}`}
        data-index={i} key={i} transform={`translate(${x}, ${y})`} data-heading={airplane.heading}>
        {violatingSep ? <circle r={config.threeMileRuleDistance} className="sep" /> : null}
        <circle cx="0" cy="0" r="2" stroke-width="0" />
        <line x1="0" y1="0" x2={ltx} y2={-lty} />
        <path stroke-dasharray="4, 5" d={path} />
        <text transform={textTranslate} text-anchor={textAnchor}>
          <tspan dy="1em">{operatorsById[airplane.operatorId].callsign}{airplane.flight}</tspan>
          <tspan dy="1em" x="0">{spd}</tspan>
          <tspan dy="1em" x="0">{alt}</tspan>
          {airplane.outboundWaypoint ? <tspan dy="1em" x="0">⇨{airplane.outboundWaypoint}</tspan> : null}
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
        <button onClick={this.handleTrafficStackInfoButtonClick} class="airplane-traffic-stack-info-btn">?</button>
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

    const directToValue = cmd.directionOld ? '' : cmd.direction;
    const directToPlaceholder = cmd.directionOld ? cmd.direction : '';

    return <div>
      <div>
        <span>Heading (°)</span>
        <input onInput={this.handleHeadingTgtChange} value={cmd.heading} type="number" step="10" />
      </div>
      <div>
        <span>Direct to </span>
        <input className="direct-to-input" type="text" value={directToValue} placeholder={directToPlaceholder}
          list={this.dtcToDataListId} onInput={this.handleDirectToTgtChange} />
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

  handleTakeoffRunwayAssignInput = e => {
    const rwyName = e.srcElement.getAttribute('data-rwy-name');
    GameStore.disableTakoffsOnRwysSet[rwyName] = !GameStore.disableTakoffsOnRwysSet[rwyName];
  }

  handleInfoExpanded = e => {
    this.setState({ infoExpanded: !this.state.infoExpanded });
  }

  render() {
    const airplanes = this.renderTraffic();
    const trafficstack = this.renderTrafficStack();
    const trafficcontrol = this.renderTrafficControl();
    const logs = (this.state.logsOnlySelf ? GameStore.selfLog : GameStore.log)

    const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

    const activeRunways = GameStore.airport.rwyusage ? activeRwys(GameStore.airport, GameStore.winddir) : [];

    const runwayUsage = rwy => {
      return <div>
        <div>{rwy.name1} {lpad('' + rwy.hdg1, '0', 3)}° {rwy.elevation1}FT {capitalize(rwy.surface)}/{rwy.length1}
          FT {activeRunways.includes(rwy.name1) ? <span>- Departure runway <label class="switch">
            <input type="checkbox" onInput={this.handleTakeoffRunwayAssignInput} data-rwy-name={rwy.name1}
              checked={!GameStore.disableTakoffsOnRwysSet[rwy.name1]} />
            <span class="slider"></span>
          </label></span> : ''}</div>
        <div>{rwy.name2} {lpad('' + rwy.hdg2, '0', 3)}° {rwy.elevation2}FT {capitalize(rwy.surface)}/{rwy.length2}
          FT {activeRunways.includes(rwy.name2) ? <span>- Departure runway <label class="switch">
            <input type="checkbox" onInput={this.handleTakeoffRunwayAssignInput} data-rwy-name={rwy.name2}
              checked={!GameStore.disableTakoffsOnRwysSet[rwy.name2]} />
            <span class="slider"></span>
          </label></span> : ''}</div>
      </div>
    }

    return (
      <div className="atc-view">
        <svg xmlns="http://www.w3.org/2000/svg" className="atc-view-svg" width={innerWidth - 250} height={innerHeight}
          onClick={this.handleSVGClick} viewBox="0 0 1280 720" style={`background: #194850; overflow: visible; font-size: ${SettingsStore.radarFontsize}px;`}>
          <style>{`
            text {
              font: 1em 'Helvetica';
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
              opacity: 0.7;
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
            .rwy-name {
              text-anchor: middle;
            }
          `}</style>
          <BackgroundSvg name={GameStore.id} />
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
              {this.state.settingsExpanded ? 'Hide options' : 'Expand options'}
            </button>
            <button className="w-100" onClick={this.handleLogsExpanded}><FaCommentDots />&nbsp;
              {this.state.logsExpanded ? 'Hide logs' : 'Expand logs'}
            </button>
            <button className="w-100" onClick={this.handleAboutExpanded}><FaQuestion />&nbsp;
              {this.state.aboutExpanded ? 'Hide about' : 'Expand about'}
            </button>
            <button className="w-100" onClick={this.handleInfoExpanded}><FaInfo />&nbsp;
              {this.state.infoExpanded ? 'Hide info' : 'Expand info'}
            </button>
            <GameMetaControls />
          </div>
        </div>

        <div className={[this.state.settingsExpanded ? null : 'hidden', 'settings-panel'].join(' ')}>
          <h5>Settings</h5>
          <hr />
          <Settings />
          <br />
          <button onClick={this.handleExpandSettingsButtonClick}><FaCompress /> Hide Options</button>
        </div>

        {
          this.state.infoPanelTgt !== null
            ? <div className={'airplane-info-panel'}>
              <h5>{Communications.getCallsign(this.state.infoPanelTgt.airplane)}</h5>
              <hr />
              <div>Airplane: {this.state.infoPanelTgt.model.name}</div>
              <div>Traffic Type: {capitalize(routeTypes[this.state.infoPanelTgt.airplane.routeType])}</div>
              <div>{this.state.infoPanelTgt.airplane.routeType === routeTypes.OUTBOUND && ('Departure runway: ' + this.state.infoPanelTgt.airplane.outboundRwy) || null}</div>
              <div>Operators: {this.state.infoPanelTgt.model.operators.map(o => operatorsById[o].name).join(', ')}</div>
              <br />
              <div>Speed: {this.state.infoPanelTgt.airplane.speed}KTS</div>
              <div>Altitude: {getAltFmtJSx(this.state.infoPanelTgt.airplane.altitude, 'span')}</div>
              <div>heading: {lpad('' + this.state.infoPanelTgt.airplane.heading, '0', 3)}°</div>
              <br />
              <div>Ceiling: {getAltFmtJSx(this.state.infoPanelTgt.model.ceiling * 1000, 'span')}</div>
              <div>Top speed: {this.state.infoPanelTgt.model.topSpeed}KTS</div>
              <div>Landing speed: {this.state.infoPanelTgt.model.landingSpeed}KTS</div>
              <div>Min speed: {this.state.infoPanelTgt.model.minSpeed}KTS</div>
              <div>Min landing runway length: {this.state.infoPanelTgt.model.landingMinRunwayLength}FT</div>
              <div>Min takeoff runway length: {this.state.infoPanelTgt.model.takeoffMinRunwayLength}FT</div>
              <br />
              <button onClick={this.handleCloseAirplaneInfoPanel}><FaCompress /> Hide Panel</button>
            </div>
            : null
        }

        <div className={[this.state.logsExpanded ? null : 'hidden', 'logs-panel'].join(' ')}>
          <div>Departures: {GameStore.departures}</div>
          <div>Arrivals: {GameStore.arrivals}</div>
          <div>Seperation violations: {GameStore.distanceVialations}</div>
          <div>Unpermitted departures: {GameStore.unpermittedDepartures}</div>

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

        <div className={[this.state.infoExpanded ? null : 'hidden', 'about-panel'].join(' ')}>
          <div>Airport: {GameStore.mapName} - {GameStore.airport.callsign}</div>
          <div><span>Wind: {lpad('' + GameStore.winddir, '0', 3)}° / {GameStore.windspd} kts</span></div>
          <div><span>ATIS: {GameStore.getAtis()}</span></div>
          <div><span>Altimeter: {GameStore.altimeter}</span></div>
          <div><span>Elevation: {GameStore.airport.elevation}</span></div>
          <br />
          <div>Runways: </div>
          {GameStore.airport.runways && GameStore.airport.runways.map(rwy => runwayUsage(rwy))}
          <br />
          <button className="button" onClick={this.handleScreenShotButtonClick}><FaDesktop /> Save Radar as SVG</button>
          <button onClick={this.handleInfoExpanded}><FaCompress /> Hide Panel</button>
        </div>

        <div className={[this.state.aboutExpanded ? null : 'hidden', 'about-panel'].join(' ')}>
          <GitHubButton type="stargazers" namespace="LesterGallagher" repo="atc-manager-2" />&nbsp;
          <GitHubButton type="watchers" namespace="LesterGallagher" repo="atc-manager-2" />&nbsp;
          <a class="header-btn" href="https://www.paypal.me/esstudio" target="_blank"><span class="legend">support</span><span class="paypal">paypal</span></a>
          <br /><br />
          ATC Manager 2 is a web based air traffic control game. Manage airspace of busy airports like Schiphol or Heathrow in a realistic simulator.
          Check out the <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager&hl=en_US" target="_blank">ATC Manager 1 App</a>
          <Donate />
          <br />
          <h5>A Special thanks to...</h5>
          <b>Donator(s) to the project: </b>
          <ul>
            <li>Joshua Jeffery [<a href="https://www.reddit.com/user/KableKiB" target="_blank">KableKiB</a>]</li>
          </ul>
          <b>Top Contributors:</b>
          <ul>
            <li><a href="https://www.reddit.com/user/KableKiB" target="_blank">KableKiB</a></li>
            <li><a href="https://www.reddit.com/user/AWT-Colin" target="_blank">AWT-Colin</a></li>
          </ul>
          <b>Others that have contributed to the project, gave feedback or helped in any other way:</b>
          <ul>
            <li><a href="https://www.reddit.com/user/KableKiB" target="_blank">KableKiB</a></li>
            <li><a href="https://www.reddit.com/user/chrstphd" target="_blank">chrstphd</a></li>
            <li><a href="https://www.reddit.com/user/wonderfulllama" target="_blank">wonderfulllama</a></li>
            <li><a href="https://www.reddit.com/user/jet86" target="_blank">jet86</a></li>
            <li><a href="https://www.reddit.com/user/Afirus" target="_blank">Afirus</a></li>
            <li><a href="https://www.reddit.com/user/xtesseract" target="_blank">xtesseract</a></li>
            <li><a href="https://www.reddit.com/user/FlightGearLego" target="_blank">FlightGearLego</a></li>
            <li><a href="https://www.reddit.com/user/PURRING_SILENCER" target="_blank">PURRING_SILENCER</a></li>
            <li><a href="https://www.reddit.com/user/wonderfulllama" target="_blank">wonderfulllama</a></li>
            <li><a href="https://www.reddit.com/user/ShadingVaz" target="_blank">ShadingVaz"</a></li>
            <li><a href="https://www.reddit.com/user/FlightGearLego" target="_blank">FlightGearLego</a></li>
            <li><a href="https://www.reddit.com/user/wonderfulllama" target="_blank">wonderfulllama</a></li>
            <li><a href="https://www.reddit.com/user/wichtel-goes-kerbal" target="_blank">wichtel-goes-kerbal</a></li>
            <li><a href="https://www.reddit.com/user/megaphoneCA" target="_blank">megaphoneCA</a></li>
            <li><a href="https://www.reddit.com/user/catullus48108" target="_blank">catullus48108</a></li>
            <li><a href="https://www.reddit.com/user/phil_57" target="_blank">phil_57</a></li>
            <li><a href="https://www.reddit.com/user/Syleril" target="_blank">Syleril</a></li>
            <li><a href="https://www.reddit.com/user/tbonge" target="_blank">tbonge</a></li>
            <li><a href="https://www.reddit.com/user/toasted-donut" target="_blank">toasted-donut</a></li>
            <li><a href="https://www.reddit.com/user/RoboRager" target="_blank">RoboRager</a></li>
            <li><a href="https://www.reddit.com/user/cplane97" target="_blank">cplane97</a></li>
            <li><a href="https://www.reddit.com/user/seungseung22" target="_blank">seungseung22</a></li>
          </ul>

          <a title="Contact" href="https://esstudio.site/contact/">Contact Me</a>
          <div>Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          <button onClick={this.handleAboutExpanded}><FaCompress /> Hide Panel</button>
        </div>

      </div >
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
  const cs = GameStore.callsignsPos[airplane.tgtDirection]
  const isLanding = cs && cs.ref.type === idType.RWY && airplane.routeType === routeTypes.INBOUND;
  if (Math.abs(airplane.tgtAltitude - airplane.altitude) > 100 && airplane.altitude && !isLanding) {
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

const capitalize = str => str.charAt(0).toUpperCase() + str.substr(1);

const lpad = (str, padChar, length) => {
  while (str.length < length)
    str = padChar + str;
  return str;
}

export default AtcView;
