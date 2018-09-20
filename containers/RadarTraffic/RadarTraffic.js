import { Component } from 'preact';
import config from '../../lib/config';
import GameStore from '../../stores/GameStore';
import './RadarTraffic.css';
import { routeTypes, operatorsById } from '../../lib/airplane-library/airplane-library';
import { FaInfo, FaCommentDots, FaCog, FaCompress, FaPlane, FaPaperPlane, FaQuestion } from 'react-icons/fa/index.mjs';
import PlaneAlt from '../PlaneAlt/PlaneAlt';
import PlaneSpd from '../PlaneSpd/PlaneSpd';

class RadarTraffic extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    GameStore.on('change', this.handleGameStoreChange);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.handleGameStoreChange);
  }

  handleGameStoreChange = () => this.setState({});

  render() {
    const airplane = this.props.airplane;

    if (airplane.outboundRwy) return;
    const y = config.height - airplane.y;
    const x = airplane.x;
    const spd = <PlaneAlt airplane={airplane} tagName="tspan" />;
    const alt = <PlaneSpd airplane={airplane} tagName="tspan" />;
    const ltx = Math.sin(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
    const lty = Math.cos(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
    const path = 'M0,0 ' + airplane.path.map(p => `L${p[0] - airplane.x}, ${-(p[1] - airplane.y)}`);
    const violatingSep = GameStore.sepDistanceVialotions[airplane.flight];
    const textHeight = (airplane.outboundWaypoint ? 4 : 3) * 14;

    const textLineX = airplane.textRotation === 1 || airplane.textRotation === 2 ? -config.airplaneTextDistance : config.airplaneTextDistance;
    const textLineY = airplane.textRotation > 1 ? -config.airplaneTextDistance : config.airplaneTextDistance;

    const textAnchor = airplane.textRotation === 1 || airplane.textRotation === 2 ? 'end' : 'start';
    const textTransformY = airplane.textRotation > 1 ? -textHeight : 0;
    const textTranslate = `translate(${textLineX}, ${textTransformY + textLineY})`;

    return <g className={`airplane ${routeTypes[airplane.routeType]} ${this.props.cmd.tgt === airplane ? 'airplane-active' : 'airplane-inactive'}`}
      data-index={this.props.index} transform={`translate(${x}, ${y})`} data-heading={airplane.heading}>
      {violatingSep ? <circle r={config.threeMileRuleDistance} className="sep" /> : null}
      <circle cx="0" cy="0" r="2" stroke-width="0" />
      <line x1="0" y1="0" x2={ltx} y2={-lty} />
      <path stroke-dasharray="4, 5" d={path} />
      <line x1="0" y1="0" x2={textLineX} y2={textLineY} />
      <g>
        <text transform={textTranslate} text-anchor={textAnchor}>
          <tspan dy="1em">{operatorsById[airplane.operatorId].callsign}{airplane.flight}</tspan>
          <tspan dy="1em" x="0">{spd}</tspan>
          <tspan dy="1em" x="0">{alt}</tspan>
          {airplane.outboundWaypoint ? <tspan dy="1em" x="0">⇨{airplane.outboundWaypoint}</tspan> : null}
        </text>
      </g>
    </g>;
  }
}

export default RadarTraffic;
