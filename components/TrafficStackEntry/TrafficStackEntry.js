import { Component } from 'preact';
import './TrafficStackEntry.css';
import {
  operatorsById,
  routeTypes,
  airplanesById
} from '../../lib/airplane-library/airplane-library';
import GameStore from '../../stores/GameStore';
import PlaneSpd from '../PlaneSpd/PlaneSpd';
import PlaneAlt from '../PlaneAlt/PlaneAlt';
import communications from '../../lib/communications';
import SettingsStore from '../../stores/SettingsStore';

const getPlaneColor = airplane => {
  switch (airplane.routeType) {
    case routeTypes.ENROUTE:
      return SettingsStore.enrouteTrafficColor;
    case routeTypes.OUTBOUND:
      return SettingsStore.outboundTrafficColor;
    case routeTypes.INBOUND:
      return SettingsStore.inboundTrafficColor;
    default:
      return SettingsStore.vfrTrafficColor;
  }
}

class TrafficStackEntry extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {
    GameStore.on('change', this.reRender);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.reRender);
  }

  reRender = () => {
    this.setState({});
  };

  componentWillReceiveProps(nextProps) {
    this.reRender();
  }

  render() {
    const airplane = this.props.airplane;
    const spd = <PlaneSpd airplane={airplane} tagName="span" />;
    const alt = <PlaneAlt airplane={airplane} tagName="span" />;
    const heading = `000${Math.floor(airplane.heading)}`.substr(-3) + '°';
    const direction =
      airplane.heading === airplane.tgtDirection
        ? null
        : '⇨' +
        (typeof airplane.tgtDirection === 'string'
          ? `${airplane.tgtDirection}`
          : `000${Math.floor(airplane.tgtDirection)}`.substr(-3)) +
        '°';
    const model = airplanesById[airplane.typeId];

    const color = getPlaneColor(airplane);

    return (
      <div style={{ backgroundColor: color }}
        className={`traffic-stack-entry ${routeTypes[
          airplane.routeType
        ].replace(/ /g, '-')} ${
          this.props.cmd.tgt === airplane
            ? 'traffic-active'
            : 'traffic-not-active'
          }`}
        data-index={this.props.index}
      >
        {communications.getCallsign(airplane, true)} {model.shortName} {spd}{' '}
        {alt} {heading}
        {direction}
        {airplane.outboundWaypoint ? ` ⇨${airplane.outboundWaypoint}` : null}
        {airplane.rwy ? <span> RWY {airplane.rwy}</span> : null}
        {airplane.tgs !== undefined && airplane.tgs > 0
          ? ` TGL ${airplane.tgs}`
          : null}
        <button
          onClick={this.props.onClick}
          class="airplane-traffic-stack-info-btn"
        >
          ?
        </button>
      </div>
    );
  }
}

export default TrafficStackEntry;
