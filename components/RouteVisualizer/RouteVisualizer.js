import { Component } from 'preact';
import './RouteVisualizer.css';
import GameStore from '../../stores/GameStore';
import { svgPath } from '../../lib/svg';
import config from '../../lib/config';
import { hdgToVector } from '../../lib/map';
import Airplane from '../../lib/airplane';

class RouteVisualizer extends Component {
  constructor(props) {
    super();
    this.state = {
      points: [],
      zoom: GameStore.zoom
    };
  }

  componentWillMount = () => {
    this.setLine();
    if (this.props.emitter) {
      this.props.emitter.on('cmdtgt', this.setLine);
      this.props.emitter.on('cmdexecution', this.setLine);
    }
    GameStore.on('change', this.setLine);
  };

  componentWillUnmount = () => {
    GameStore.removeListener('change', this.setLine);
    if (this.props.emitter) {
      this.props.emitter.removeListener('cmdtgt', this.setLine);
      this.props.emitter.removeListener('cmdexecution', this.setLine);
    }
  };

  setLine = () => {
    const tgt = this.props.cmd.tgt;
    if (!tgt) return;
    if (Airplane.isVFR(tgt)) return;
    const { x, y } = tgt;
    if (typeof tgt.tgtDirection === 'string') {
      const a = GameStore.callsigns[tgt.tgtDirection];
      if (GameStore.callsigns[tgt.tgtDirection].class === 'route') {
        return this.setState({ points: [], zoom: GameStore.zoom });
      }
      const dir = GameStore.callsignsPos[tgt.tgtDirection];
      this.setState({
        points: [{ 0: x, 1: y }, { 0: dir.x, 1: dir.y }],
        zoom: GameStore.zoom
      });
    } else if (typeof tgt.tgtDirection === 'number') {
      const v = hdgToVector(tgt.tgtDirection);
      const vlen = 10000;
      const vr = [v[0] * vlen + x, v[1] * vlen + y];
      this.setState({
        points: [{ 0: x, 1: y }, { 0: vr[0], 1: vr[1] }],
        zoom: GameStore.zoom
      });
    } else {
      this.setState({ points: [], zoom: GameStore.zoom });
    }
  };

  render() {
    const path = svgPath(
      this.state.points.map(p => [
        (p[0] - config.width / 2) * this.state.zoom + config.width / 2,
        (config.height / 2 - p[1]) * this.state.zoom + config.height / 2
      ])
    );
    return (
      <g className="RouteVisualizer">
        <path d={path} class="plane-path" stroke="brown" />
      </g>
    );
  }
}

export default RouteVisualizer;
