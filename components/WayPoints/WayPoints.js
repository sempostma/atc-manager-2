import { Component } from 'preact';
import './WayPoints.css';
import GameStore from '../../stores/GameStore';
import config from '../../lib/config';
import { idType } from '../../lib/map';

class WayPoints extends Component {
  constructor(props) {
    super();
    this.state = {
      waypoints: GameStore.waypoints
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
      waypoints: GameStore.waypoints
    });
  }

  render() {
    const waypointsJsx = Object.keys(this.state.waypoints)
      .filter(x => this.state.waypoints[x].type !== idType.DIRECTION)
      .map(w => {
        const waypoint = this.state.waypoints[w];
        const x =
          (waypoint.x - config.width / 2) * GameStore.zoom + config.width / 2;
        const y =
          (config.height / 2 - waypoint.y) * GameStore.zoom + config.height / 2;
        let textTranslateY = 0;
        if (waypoint.textRotation === 1 || waypoint.textRotation === 3)
          textTranslateY = 7;
        return (
          <g
            className="waypoint"
            onContextMenu={e => this.props.onContextMenu(e, waypoint, w)}
            transform={`translate(${x} ${y})`}
          >
            <circle r="2" />
            <text y={textTranslateY} x="4">
              {w}
            </text>
          </g>
        );
      });

    return <g className="waypoints">{waypointsJsx}</g>;
  }
}

export default WayPoints;
