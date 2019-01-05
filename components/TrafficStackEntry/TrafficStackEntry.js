import { Component } from 'preact';
import './TrafficStackEntry.css';
import { operatorsById, routeTypes, airplanesById } from '../../lib/airplane-library/airplane-library';
import GameStore from '../../stores/GameStore';
import PlaneSpd from '../PlaneSpd/PlaneSpd';
import PlaneAlt from '../PlaneAlt/PlaneAlt';
import communications from '../../lib/communications';

class TrafficStackEntry extends Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    GameStore.on('change', this.reRender);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.reRender);
  }

  reRender = () => {
    this.setState({});
  }

  componentWillReceiveProps(nextProps) {
    this.reRender();
  }

  render() {
    const airplane = this.props.airplane;
    const spd = <PlaneSpd airplane={airplane} tagName="span" />;
    const alt = <PlaneAlt airplane={airplane} tagName="span" />;
    const heading = `000${Math.floor(airplane.heading)}`.substr(-3);
    const model = airplanesById[airplane.typeId];

    return (<div className={`traffic-stack-entry ${routeTypes[airplane.routeType].replace(/ /g, '-')} ${this.props.cmd.tgt === airplane ? 'traffic-active' : 'traffic-not-active'}`} data-index={this.props.index}>
      {communications.getCallsign(airplane, true)} {spd} {alt} {model.shortName} {heading}°
      {airplane.outboundWaypoint ? `⇨${airplane.outboundWaypoint}` : null}
      {airplane.rwy ? <span> RWY {airplane.rwy}</span> : null}
      {airplane.tgs !== undefined && airplane.tgs > 0 ? ` TGL ${airplane.tgs}` : null}
      <button onClick={this.props.onClick} class="airplane-traffic-stack-info-btn">?</button>
    </div>);
  }
}

export default TrafficStackEntry;