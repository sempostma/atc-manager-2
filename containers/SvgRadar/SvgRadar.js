import { Component } from 'preact';
import './SvgRadar.css';
import GameStore from '../../stores/GameStore';
import SettingsStore from '../../stores/SettingsStore';
import WayPoints from '../../components/WayPoints/WayPoints';
import Airport from '../../components/Airport/Airport';
import BackgroundSvg from '../../components/BackgroundSvg/BackgroundSvg';
import RadarTraffic from '../RadarTraffic/RadarTraffic';

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
      <RadarTraffic key={i} airplane={airplane} cmd={this.props.cmd} />);

    const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="atc-view-svg" width={innerWidth - 250} height={innerHeight}
        onClick={this.handleSVGClick} viewBox="0 0 1280 720" style={`background: #194850; overflow: visible; font-size: ${SettingsStore.radarFontsize}px;`}>
        <style>{getStyle()}</style>
        <BackgroundSvg name={GameStore.id} />
        <WayPoints />
        <Airport />
        {airplanes}
        <rect width="100%" height="100%" fill="none" stroke="#fff" stroke-dasharray="20, 20" />
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
.airplane.inbound line, .airplane.inbound path {
  stroke: #bbf;
}
.airplane.outbound line, .airplane.outbound path {
  stroke: #bfb;
}
.airplane.enroute line, .airplane.enroute path {
  stroke: #ffb;
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
