import { Component } from 'preact';
import './MSABlocks.css';
import { polyBounds, average } from '../../lib/util';

class MSABlocks extends Component {
  constructor(props) {
    super();

    const { zoom } = props;

    const bounds = polyBounds(props.polygon);
    const x = (average([bounds[1], bounds[3]]) - 640) * zoom + 640;
    const y = (average([bounds[0], bounds[2]]) - 360) * zoom + 360;

    this.state = { zoom, x, y };
    this.points = props.polygon
      .map(p => [p[0], 720 - p[1]].join(','))
      .join(' ');
  }

  componentWillReceiveProps(nextProps) {
    const { zoom } = nextProps;

    const bounds = polyBounds(nextProps.polygon);
    const x = (average([bounds[1], bounds[3]]) - 640) * zoom + 640;
    const y = (average([bounds[0], bounds[2]]) - 360) * zoom + 360;

    this.setState({ zoom, x, y });
  }

  render() {
    return (
      <g className="msa-polygon">
        <polygon
          points={this.points}
          transform={`translate(640 360) scale(${
            this.state.zoom
          }) translate(-640 -360)`}
        />
        <text x={this.state.x} y={720 - this.state.y}>
          {this.props.msa}
        </text>
      </g>
    );
  }
}

export default MSABlocks;
