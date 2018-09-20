import { Component } from 'preact';
import './TrafficStackEntry.css';
import { operatorsById, routeTypes, airplanesById } from '../../lib/airplane-library/airplane-library';
import GameStore from '../../stores/GameStore';
import PlaneSpd from '../PlaneSpd/PlaneSpd';
import PlaneAlt from '../PlaneAlt/PlaneAlt';

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

    return (<div className={`traffic-stack-entry ${routeTypes[airplane.routeType]} ${this.props.cmd.tgt === airplane ? 'traffic-active' : 'traffic-not-active'}`} data-index={this.props.index}>
      {operatorsById[airplane.operatorId].callsign}{airplane.flight} {spd} {alt} {model.shortName} {heading}°
      {airplane.outboundWaypoint ? `⇨${airplane.outboundWaypoint}` : null}
      {airplane.outboundRwy ? <span> RWY {airplane.outboundRwy}</span> : null}
      <button onClick={this.handleTrafficStackInfoButtonClick} class="airplane-traffic-stack-info-btn">?</button>
    </div>);
  }
}

export default TrafficStackEntry;
