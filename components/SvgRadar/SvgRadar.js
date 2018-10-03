import { Component } from 'preact';
import './SvgRadar.css';
import GameStore from '../../stores/GameStore';
import SettingsStore from '../../stores/SettingsStore';
import WayPoints from '../../components/WayPoints/WayPoints';
import Airport from '../../components/Airport/Airport';
import BackgroundSvg from '../../components/BackgroundSvg/BackgroundSvg';
import RadarTraffic from '../RadarTraffic/RadarTraffic';
import config from '../../lib/config';

class SvgRadar extends Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    GameStore.on('change', this.reRender);
    SettingsStore.on('change', this.reRender);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.reRender);
    SettingsStore.removeListener('change', this.reRender);
  }

  reRender = () => {
    this.setState({});
  }

  render() {
    const airplanes = GameStore.traffic.map((airplane, i) => 
      <RadarTraffic key={i} index={i} airplane={airplane} cmd={this.props.cmd} />);

    const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

    const transformScale = `translate(${config.width / 2} ${config.height / 2}) scale(${GameStore.zoom}) translate(-${config.width / 2} -${config.height / 2})`;

    return (
      <svg onWheel={this.props.onZoom} xmlns="http://www.w3.org/2000/svg" className="atc-view-svg" width={innerWidth - 250} height={innerHeight}
        onClick={this.props.onClick} viewBox="0 0 1280 720" style={`background: #194850; overflow: visible; font-size: ${SettingsStore.radarFontsize}px;`}>
        <style>{getStyle()}</style>
        <g transform={transformScale}>
          <BackgroundSvg name={GameStore.id} />
        </g>
        <WayPoints />
        <Airport />
        {airplanes}
        <rect width="100%" height="100%" fill="none" stroke="#fff" stroke-dasharray="20, 20" transform={transformScale} />
      </svg>
    );
  }
}

const getStyle = () => {
  return `text {
  font: 1em 'Helvetica';
  fill: #fff;
}
.airplane circle {
  fill: #fff;
}
.airplane line, .airplane path {
  stroke: #fff;
  stroke-width: 1;
  fill: none;
}
.airplane.inbound line, .airplane.inbound path, .airplane.inbound rect {
  stroke: #bbf;
}
.airplane.outbound line, .airplane.outbound path, .airplane.outbound rect {
  stroke: #bfb;
}
.airplane.enroute line, .airplane.enroute path, .airplane.enroute rect {
  stroke: #ffb;
}
.airplane.vfr-closed-pattern-touch-and-go line, .airplane.vfr-closed-pattern-touch-and-go path, .airplane.vfr-closed-pattern-touch-and-go rect, 
.airplane.vfr-outbound line, .airplane.vfr-outbound path, .airplane.vfr-outbound rect,
.airplane.vfr-enroute line, .airplane.vfr-enroute path, .airplane.vfr-enroute rect, 
.airplane.vfr-inbound-full-stop line, .airplane.vfr-inbound-full-stop path, .airplane.vfr-inbound-full-stop rect,
.airplane.vfr-inbound-touch-and-go line, .airplane.vfr-inbound-touch-and-go path, .airplane.vfr-inbound-touch-and-go rect,
.airplane.vfr-closed-pattern-full-stop line, .airplane.vfr-closed-pattern-full-stop path, .airplane.vfr-closed-pattern-full-stop rect {
  stroke: rgb(194, 135, 80);
}
.airplane.inbound text, .airplane.inbound circle {
  fill: #bbf;
}
.airplane.outbound text, .airplane.outbound circle {
  fill: #bfb;
}
.airplane.enroute text, .airplane.enroute circle {
  fill: #ffb;
}
.airplane.vfr-closed-pattern-touch-and-go text, .airplane.vfr-closed-pattern-touch-and-go circle,
.airplane.vfr-outbound text, .airplane.vfr-outbound circle,
.airplane.vfr-enroute text, .airplane.vfr-enroute circle,
.airplane.vfr-inbound-full-stop text, .airplane.vfr-inbound-full-stop circle,
.airplane.vfr-inbound-touch-and-go text, .airplane.inbound-touch-and-go circle,
.airplane.vfr-closed-pattern-full-stop text, .airplane.vfr-closed-pattern-full-stop circle {
  fill: rgb(194, 135, 80);
}
.airplane tspan.up {
  fill: #0f0;
}
.airplane tspan.down {
  fill: #f00;
}
.waypoint circle {
  fill: #fff;
}
.rwy-line {
  stroke: #fff;
  stroke-width: 3;
  opacity: 0.7;
}
.ils-line {
  stroke: ${SettingsStore.ilsPathColor};
  stroke-width: 1;
}
.background path {
  fill: #1e606b;
}
.airplane circle.sep {
  fill: ${SettingsStore.sepVialationCircleColor};
  fill-opacity: 0.2;
  stroke: #f00;
}
.rwy-name {
  text-anchor: middle;
}
`;
};

export default SvgRadar;
