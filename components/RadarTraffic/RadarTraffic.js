import { Component } from 'preact';
import config from '../../lib/config';
import GameStore from '../../stores/GameStore';
import './RadarTraffic.css';
import { routeTypes } from '../../lib/airplane-library/airplane-library';
import PlaneAlt from '../PlaneAlt/PlaneAlt';
import PlaneSpd from '../PlaneSpd/PlaneSpd';
import communications from '../../lib/communications';
import Airplane from '../../lib/airplane';

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

    if (airplane.waiting) return;
    const y =
      (config.height / 2 - airplane.y) * GameStore.zoom + config.height / 2;
    const x =
      (airplane.x - config.width / 2) * GameStore.zoom + config.width / 2;
    const spd = <PlaneAlt airplane={airplane} tagName="tspan" />;
    const alt = <PlaneSpd airplane={airplane} tagName="tspan" />;
    const ltx =
      Math.sin((airplane.heading * Math.PI) / 180) *
      config.headingIndicatorLineLen;
    const lty =
      Math.cos((airplane.heading * Math.PI) / 180) *
      config.headingIndicatorLineLen;
    const path =
      'M0,0 ' +
      (airplane.path || []).map(
        p =>
          `L${(p[0] - airplane.x) * GameStore.zoom}, ${-(p[1] - airplane.y) *
            GameStore.zoom}`
      );
    const violatingSep =
      GameStore.sepDistanceVialotions[
        communications.getCallsign(airplane, true)
      ];
    const textHeight = (airplane.outboundWaypoint ? 4 : 3) * 14;

    const textLineX =
      airplane.textRotation === 1 || airplane.textRotation === 2
        ? -config.airplaneTextDistance
        : config.airplaneTextDistance;
    const textLineY =
      airplane.textRotation > 1
        ? -config.airplaneTextDistance
        : config.airplaneTextDistance;

    const textAnchor =
      airplane.textRotation === 1 || airplane.textRotation === 2
        ? 'end'
        : 'start';
    const textTransformY = airplane.textRotation > 1 ? -textHeight : 0;
    const textTranslate = `translate(${textLineX}, ${textTransformY +
      textLineY})`;

    const sepRadius = Airplane.isVFR(airplane)
      ? config.oneMileRuleDistance
      : config.threeMileRuleDistance;
    const tooLow = !!GameStore._oldMsaViolations[
      communications.getCallsign(airplane, true)
    ];

    const classList = [
      'airplane',
      routeTypes[airplane.routeType].replace(/ /g, '-'),
      this.props.cmd.tgt === airplane ? 'airplane-active' : 'airplane-inactive',
      tooLow && 'too-low'
    ].filter(x => x !== undefined);

    return (
      <g
        className={classList.join(' ')}
        data-index={this.props.index}
        transform={`translate(${x}, ${y})`}
        data-heading={airplane.heading}
      >
        {violatingSep ? (
          <circle r={sepRadius * GameStore.zoom} className="sep" />
        ) : null}
        {/* <circle cx="0" cy="0" r="2" stroke-width="0" /> */}
        <rect
          width="5"
          height="5"
          x="-2.5"
          y="-2.5"
          fill="none"
          strokeWidth="2"
        />
        <line x1="0" y1="0" x2={ltx} y2={-lty} />
        <path
          stroke-dasharray={`${4 * GameStore.zoom}, ${5 * GameStore.zoom}`}
          d={path}
        />
        <line x1="0" y1="0" x2={textLineX} y2={textLineY} />
        <g>
          <text transform={textTranslate} text-anchor={textAnchor}>
            <tspan dy="1em">{communications.getCallsign(airplane, true)}</tspan>
            <tspan dy="1em" x="0">
              {spd}
            </tspan>
            <tspan dy="1em" x="0">
              {alt}
            </tspan>
            {airplane.outboundWaypoint ? (
              <tspan dy="1em" x="0">
                ⇨{airplane.outboundWaypoint}
              </tspan>
            ) : null}
            {tooLow ? (
              <tspan className="too-low-text" dy="1em" x="0">
                TOO LOW
              </tspan>
            ) : null}
          </text>
        </g>
      </g>
    );
  }
}

export default RadarTraffic;
