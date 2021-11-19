import { Component } from 'preact';
import GameStore from '../../stores/GameStore';
import {
  FaCompress,
  FaDesktop,
  FaFileVideo,
  FaImage
} from 'react-icons/fa/index.esm';
import { activeRwys, getAltimeter } from '../../lib/map';
import { upcase, lpad } from '../../lib/util';
import './InfoPanel.css';
import { saveAs } from 'file-saver';
import SettingsStore from '../../stores/SettingsStore';
import {
  sendMessageInfo,
  sendMessageError
} from '../../components/GameMessages/GameMessages';
import TimelapseStore from '../../stores/TimelapseStore';
import { loadState } from '../../lib/persistance';
import TimelapseRecorder from '../../components/TimelapseRecorder/TimelapseRecorder';

const isFullscreen = () => typeof window !== 'undefined' &&
  !(
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
  );

const toggleFullScreen = () => {
  if (!isFullscreen()) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
};

class InfoPanel extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    GameStore.on('change', this.reRender);
    SettingsStore.on('change', this.reRender);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.reRender);
    SettingsStore.on('change', this.reRender);
  }

  reRender = () => this.setState({});

  handleTakeoffRunwayAssignInput = e => {
    const rwyName = e.srcElement.getAttribute('data-rwy-name');
    GameStore.disableTakoffsOnRwysSet[rwyName] = e.target.value;
  };

  handleScreenShotButtonClick = e => {
    if (!GameStore.svgEl) return;
    let source =
      '<?xml version="1.0" standalone="no"?>\n' + GameStore.svgEl.outerHTML;

    saveAs(
      new Blob([source], {
        type: 'image/svg+xml'
      }),
      `Screenshot ${GameStore.map.name}.svg`
    );
  };

  render() {
    const altimeter = (
      <span>
        {SettingsStore.millibars ? 'QHN' : 'Altimeter'}:{' '}
        {getAltimeter(GameStore.altimeter, SettingsStore.millibars)}
      </span>
    );
    const activeRunways = GameStore.airport.rwyusage
      ? activeRwys(GameStore.airport, GameStore.winddir)
      : [];

    const runwayUsage = rwy =>
      ['1', '2'].map(t => (
        <div className="rwyusage">
          {rwy['name' + t]} {lpad('' + rwy['hdg' + t], '0', 3)}°{' '}
          {rwy['elevation' + t]}FT {upcase(rwy.surface)}/{rwy['length' + t]}
          FT{' '}
          {activeRunways.includes(rwy['name' + t]) ? (
            <span>
              - Departure runway &nbsp;
              <select
                onInput={this.handleTakeoffRunwayAssignInput}
                data-rwy-name={rwy['name' + t]}
                value={GameStore.disableTakoffsOnRwysSet[rwy['name' + t]]}
              >
                <option default value="all">
                  All
                </option>
                {SettingsStore.ga && GameStore.map.ga > 0 && (
                  <option value="ga">General Aviation</option>
                )}
                {GameStore.map.commercial > 0 && (
                  <option value="commercial">Commercial Flights</option>
                )}
                <option value="none">None</option>
              </select>
            </span>
          ) : (
            ''
          )}
        </div>
      ));

    return (
      <div
        className={[this.props.expanded ? null : 'hidden', 'about-panel'].join(
          ' '
        )}
      >
        <div>
          Airport: {GameStore.mapName} - {GameStore.airport.callsign}
        </div>
        <div>
          <span>
            Wind: {lpad('' + Math.round(GameStore.winddir), '0', 3)}° /{' '}
            {Math.round(GameStore.windspd)} kts
          </span>
        </div>
        <div>
          <span>ATIS: {GameStore.getAtis()}</span>
        </div>
        <div>{altimeter}</div>
        <div>
          <span>Elevation: {GameStore.airport.elevation} FT</span>
        </div>
        <br />
        <div>Runways: </div>
        {GameStore.airport.runways &&
          GameStore.airport.runways.map(rwy => runwayUsage(rwy))}
        <br />
        <button className="button" onClick={this.handleScreenShotButtonClick}>
          <FaImage /> Save Radar as SVG
        </button>
        <button className="button" onClick={toggleFullScreen}>
          <FaDesktop /> {isFullscreen() ? 'Exit fullscreen' : 'Open fullscreen'}
        </button>
        <div>&nbsp;</div>
        <TimelapseRecorder />
        <div>&nbsp;</div>
        <button onClick={this.props.onToggle}>
          <FaCompress /> Hide Panel
        </button>
      </div>
    );
  }
}

export default InfoPanel;
