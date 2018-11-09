import { Component } from 'preact';
import './RouteVisualizer.css';
import GameStore from '../../stores/GameStore';
import { svgPath } from '../../lib/svg';
import config from '../../lib/config';
import { hdgToVector } from '../../lib/map';

class RouteVisualizer extends Component {
  constructor(props) {
    super();
    this.state = {
      points: [],
      zoom: GameStore.zoom
    };
  }

  componentWillMount() {
    this.setLine();
    this.props.emitter.on('click', this.setLine);
    this.props.emitter.on('cmdexecution', this.setLine);
    GameStore.on('change', this.setLine);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.setLine);
    this.props.emitter.removeListener('click', this.setLine);
    this.props.emitter.removeListener('cmdexecution', this.setLine);
  }

  handleGamestoreChange = () => this.setLine();

  setLine = () => {
    if (!this.props.cmd.tgt) return;
    console.log(this.props.cmd.tgt);
    const { x, y } = this.props.cmd.tgt;
    if (typeof this.props.cmd.tgt.tgtDirection === 'string') {
      const dir = GameStore.callsignsPos[this.props.cmd.tgt.tgtDirection];
      this.setState({ points: [{ 0: x, 1: y }, { 0: dir.x, 1: dir.y }], zoom: GameStore.zoom });
    } else if (typeof this.props.cmd.tgt.tgtDirection === 'number') {
      const v = hdgToVector(this.props.cmd.tgt.tgtDirection);
      const vlen = 10000;
      const vr = [v[0] * vlen + x, v[1] * vlen + y];
      this.setState({ points: [{ 0: x, 1: y }, { 0: vr[0], 1: vr[1] }], zoom: GameStore.zoom });
    } else {
      this.setState({ points: [], zoom: GameStore.zoom });
    }
  }

  render() {
    const path = svgPath(this.state.points.map(p => ([
      (p[0] - config.width / 2) * this.state.zoom + config.width / 2,
      (config.height / 2 - p[1]) * this.state.zoom + config.height / 2,
    ])));
    return (
      <g className="RouteVisualizer">
        <path d={path} class="plane-path" stroke="brown" />
      </g>
    );
  }
}

export default RouteVisualizer;
