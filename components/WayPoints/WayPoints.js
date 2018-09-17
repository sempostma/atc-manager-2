import { Component } from 'preact';
import './WayPoints.css';
import GameStore from '../../stores/GameStore';

class WayPoints extends Component {
  constructor(props) {
    super();
    this.state = {
      waypoints: GameStore.waypoints,
    };


    this.handleGameStoreStart = this.handleGameStoreStart.bind(this);
  }

  componentWillMount() {
    GameStore.on('start', this.handleGameStoreStart);
  }

  componentWillUnmount() {
    GameStore.removeListener('start', this.handleGameStoreStart);
  }

  handleGameStoreStart() {
    this.setState({
      waypoints: GameStore.waypoints,
    });
  }

  render() {
    const waypointsJsx = Object.keys(this.state.waypoints).map(w => {
      const waypoint = this.state.waypoints[w];
      return <g className="waypoint" transform={`translate(${waypoint.x} ${GameStore.height - waypoint.y})`}>
        <circle r="2" />
        <text x="4">{w}</text>
      </g>;
    });

    return (
      <g className="waypoints">
        {waypointsJsx}
      </g>
    );
  }
}

export default WayPoints;
