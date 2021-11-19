import { Component } from 'preact';
import GameStore from '../../stores/GameStore';
import { FaCompress, FaDesktop } from 'react-icons/fa/index.esm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { landableRwys, idType, activeRwys } from '../../lib/map';
import { upcase, lpad } from '../../lib/util';
import Communications from '../../lib/communications';
import './AirplaneInfoPanel.css';
import {
  routeTypes,
  operatorsById
} from '../../lib/airplane-library/airplane-library';
import AltFmt from '../../components/AltFmt/AltFmt';

class AirplaneInfoPanel extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    if (!this.props.infoPanelTgt) return null;
    return (
      <div className={'airplane-info-panel'}>
        <h5>
          {Communications.getCallsign(this.props.infoPanelTgt.airplane, true)}
        </h5>
        <hr />
        <div>Airplane: {this.props.infoPanelTgt.model.name}</div>
        <div>
          Traffic Type:{' '}
          {upcase(routeTypes[this.props.infoPanelTgt.airplane.routeType])}
        </div>
        <div>
          {(this.props.infoPanelTgt.airplane.routeType ===
            routeTypes.OUTBOUND &&
            'Departure runway: ' + this.props.infoPanelTgt.airplane.rwy) ||
            null}
        </div>
        <div>
          Operators:{' '}
          {this.props.infoPanelTgt.model.operators
            .map(o => operatorsById[o].name)
            .join(', ') || 'None'}
        </div>
        <br />
        <div>Speed: {this.props.infoPanelTgt.airplane.speed.toFixed(0)}KTS</div>
        <div>
          Altitude:{' '}
          <AltFmt
            altitude={this.props.infoPanelTgt.airplane.altitude.toFixed(0)}
            tagName="span"
          />
        </div>
        <div>
          heading:{' '}
          {lpad(
            '' + this.props.infoPanelTgt.airplane.heading.toFixed(0),
            '0',
            3
          )}
          °
        </div>
        <br />
        <div>
          Ceiling:{' '}
          <AltFmt
            altitude={this.props.infoPanelTgt.model.ceiling * 1000}
            tagName="span"
          />
        </div>
        <div>Top speed: {this.props.infoPanelTgt.model.topSpeed}KTS</div>
        <div>
          Landing speed: {this.props.infoPanelTgt.model.landingSpeed}KTS
        </div>
        <div>Min speed: {this.props.infoPanelTgt.model.minSpeed}KTS</div>
        <div>
          Min landing runway length:{' '}
          {this.props.infoPanelTgt.model.landingMinRunwayLength}FT
        </div>
        <div>
          Min takeoff runway length:{' '}
          {this.props.infoPanelTgt.model.takeoffMinRunwayLength}FT
        </div>
        <br />
        <button onClick={this.props.onToggle}>
          <FaCompress /> Hide Panel
        </button>
      </div>
    );
  }
}

export default AirplaneInfoPanel;
