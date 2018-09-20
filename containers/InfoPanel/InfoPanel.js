import { Component } from 'preact';
import GameStore from '../../stores/GameStore';
import { FaCompress, FaDesktop } from 'react-icons/fa/index.mjs';
import { activeRwys } from '../../lib/map';
import { upcase, lpad } from '../../lib/util';
import './InfoPanel.css';
import { saveAs } from 'file-saver';


class InfoPanel extends Component {
  constructor(props) {
    super();

  }

  componentWillMount() {
    GameStore.on('change', this.reRender);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.reRender);
  }

  reRender = () => this.setState({})

  handleTakeoffRunwayAssignInput = e => {
    const rwyName = e.srcElement.getAttribute('data-rwy-name');
    GameStore.disableTakoffsOnRwysSet[rwyName] = !GameStore.disableTakoffsOnRwysSet[rwyName];
  }

  handleScreenShotButtonClick = e => {
    if (!GameStore.svgEl) return;
    let el = GameStore.svgEl.getElementsByTagName('svg')[0];
    let source = '<?xml version="1.0" standalone="no"?>\n' + el.outerHTML;

    saveAs(new Blob([source], {
      type: 'image/svg+xml'
    }), `Screenshot ${GameStore.map.name}.svg`);
  }

  render() {
    const activeRunways = GameStore.airport.rwyusage ? activeRwys(GameStore.airport, GameStore.winddir) : [];

    const runwayUsage = rwy => ['1', '2'].map(t =>
      <div>{rwy.name1} {lpad('' + rwy['hdg' + t], '0', 3)}° {rwy['elevation' + t]}FT {upcase(rwy.surface)}/{rwy['length' + t]}
        FT {activeRunways.includes(rwy['name' + t]) ? <span>- Departure runway <label class="switch">
          <input type="checkbox" onInput={this.handleTakeoffRunwayAssignInput} data-rwy-name={rwy['name' + t]}
            checked={!GameStore.disableTakoffsOnRwysSet[rwy['name' + t]]} />
          <span class="slider"></span>
        </label></span> : ''}</div>);

    return (
      <div className={[this.props.expanded ? null : 'hidden', 'about-panel'].join(' ')}>
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
        <button onClick={this.props.onToggle}><FaCompress /> Hide Panel</button>
      </div>
    );
  }
}

export default InfoPanel;
