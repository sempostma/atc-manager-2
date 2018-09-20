import { Component } from 'preact';
import { FaInfo, FaCommentDots, FaCog, FaCompress, FaPlane, FaPaperPlane, FaQuestion } from 'react-icons/fa/index.mjs';
import './TrafficStack.css';
import GameStore from '../../stores/GameStore';
import GameMetaControls from '../../components/GameMetaControls/GameMetaControls';
import { routeTypes, operatorsById, airplanesById } from '../../lib/airplane-library/airplane-library';
import PlaneSpd from '../PlaneSpd/PlaneSpd';
import PlaneAlt from '../PlaneSpd/PlaneSpd';
import { landableRwys } from '../../lib/map';
import config from '../../lib/config';
import Communications from '../../lib/communications';
import SettingsStore from '../../stores/SettingsStore';

import SettingsPanel from '../SettingsPanel/SettingsPanel';
import InfoPanel from '../InfoPanel/InfoPanel';
import AboutPanel from '../AboutPanel/AboutPanel';
import AirplaneInfoPanel from '../AirplaneInfoPanel/AirplaneInfoPanel';
import LogsPanel from '../LogsPanel/LogsPanel';

class TrafficStack extends Component {
  constructor(props) {
    super();
    this.state = {
      settingsExpanded: false,
      logsExpanded: false,
      aboutExpanded: false,
      infoExpanded: false,
      cmd: props.cmd,
    };

    this.dtcToDataListId = `dct-tgt-${Math.random().toString().replace('.', '')}`;
  }

  componentWillMount() {
    GameStore.on('change', this.handleGameStoreChange);
    if (typeof window !== 'undefined') window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
    if (typeof window !== 'undefined') window.removeEventListener('keypress', this.handleKeyPress);
  }


  handleKeyPress = e => {
    if (e.keyCode == 13 && this.state.cmd.tgt) {
      this.props.onCmdExecution();
      return false;
    }
  }

  handleGameStoreChange = () => {
    this.setState({});
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
    this.props.onChange(this.state.cmd);
  }

  handleAboutExpanded = () => {
    this.setState({ aboutExpanded: !this.state.aboutExpanded });
  }

  handleLogsExpanded = () => {
    this.setState({ copied: false, logsExpanded: !this.state.logsExpanded });
  }

  handleLogsCopied = () => {
    this.setState({ logsCopied: true });
  }

  handleCloseAirplaneInfoPanel = e => {
    this.setState({ infoPanelTgt: null });
  }

  handleTrafficStackInfoButtonClick = e => {
    const index = e.srcElement.parentElement.getAttribute('data-index');
    const airplane = GameStore.traffic[index];
    const model = airplanesById[airplane.typeId];

    this.setState({ infoPanelTgt: { airplane, model } });
  }

  handleGoAroundClick = e => {
    const airplane = this.state.cmd.tgt;
    this.setState({
      cmd: {
        tgt: airplane,
        direction: '',
        altitude: airplane.tgtAltitude,
        heading: Math.round(airplane.heading + 359) % 360 + 1,
        speed: airplane.tgtSpeed,
      }
    });
    // TODO: Speech
  }

  handleInfoExpanded = e => {
    this.setState({ infoExpanded: !this.state.infoExpanded });
  }

  renderTrafficStack = () => {
    return GameStore.traffic.map((airplane, i) => {
      const spd = <PlaneSpd airplane={airplane} tagName="span" />;
      const alt = <PlaneAlt airplane={airplane} tagName="span" />;
      const heading = `000${Math.floor(airplane.heading)}`.substr(-3);
      const model = airplanesById[airplane.typeId];
      return (<div className={`traffic-stack-entry ${routeTypes[airplane.routeType]} ${this.props.cmd.tgt === airplane ? 'traffic-active' : 'traffic-not-active'}`} data-index={i} key={i}>
        {operatorsById[airplane.operatorId].callsign}{airplane.flight} {spd} {alt} {model.shortName} {heading}°
        {airplane.outboundWaypoint ? `⇨${airplane.outboundWaypoint}` : null}
        {airplane.outboundRwy ? <span> RWY {airplane.outboundRwy}</span> : null}
        <button onClick={this.handleTrafficStackInfoButtonClick} class="airplane-traffic-stack-info-btn">?</button>
      </div>);
    });
  }

  renderTrafficControl = () => {
    const cmd = this.props.cmd;
    if (!cmd.tgt) return;
    const model = airplanesById[cmd.tgt.typeId];
    const topSpeed = cmd.tgt.altitude > 10000 ? model.topSpeed : Math.min(model.topSpeed, 250);

    const landableRwyNamesArr = this.props.cmd.tgt && this.props.cmd.tgt.altitude < 3200
      ? landableRwys(GameStore.airport, this.props.cmd.tgt, config.width, config.height)
        .map(lr => lr.rev ? lr.rwy.name2 : lr.rwy.name1)
      : [];
    const landableRwysArr = landableRwyNamesArr.map(name => <option value={name} />);

    const directToValue = cmd.directionOld ? '' : cmd.direction;
    const directToPlaceholder = cmd.directionOld ? cmd.direction : '';

    return (<div>
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
        <button onClick={this.props.onCmdExecution}><FaPaperPlane /> Give Command</button>
      </div>
      <div>
        <button onClick={this.handleTakeoffClick} className={cmd.tgt.outboundRwy ? '' : 'hidden'}><FaPlane /> Takeoff</button>
      </div>
      <div>{
        cmd.tgt.routeType === routeTypes.INBOUND && landableRwysArr.length > 0 && landableRwyNamesArr.includes(cmd.tgt.tgtDirection) === false
          ? 'Land using "Direct to"'
          : null
      }</div>
      <div>{
        cmd.tgt.routeType === routeTypes.INBOUND && landableRwysArr.length > 0 && landableRwyNamesArr.includes(cmd.tgt.tgtDirection)
          ? <button onClick={this.handleGoAroundClick}><FaPlane /> Go Around</button>
          : null
      }</div>
    </div>);
  }

  render() {
    const trafficStack = this.renderTrafficStack();
    const trafficControl = this.renderTrafficControl();

    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

    return (
      <div>
        <div className="traffic-stack-wrapper" style={{ height: innerHeight }}>
          <div className="traffic-stack">
            <div className="wind">wind: {GameStore.winddir}° @ {GameStore.windspd}KTS</div>
            {trafficStack}
          </div>
          <div className="traffic-control">
            {trafficControl}
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

        {/* panels */}
        <SettingsPanel expanded={this.state.settingsExpanded} onToggle={this.handleExpandSettingsButtonClick} />
        <AirplaneInfoPanel infoPanelTgt={this.state.infoPanelTgt} getAltFmtJSx={this.props.getAltFmtJSx} onToggle={this.handleCloseAirplaneInfoPanel} />
        <LogsPanel expanded={this.state.logsExpanded} onToggle={this.handleLogsExpanded} />
        <InfoPanel expanded={this.state.infoExpanded} onToggle={this.handleInfoExpanded} />
        <AboutPanel expanded={this.state.aboutExpanded} onToggle={this.handleAboutExpanded} />
      </div>

    );
  }
}

export default TrafficStack;
