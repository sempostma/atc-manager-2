import { Component } from 'preact';
import './GroundRunwaysSvg.css';
import GroundGameStore from '../../stores/GroundGameStore';

class GroundRunwaysSvg extends Component {
  constructor(props) {
    super();
    this.state = {
    };

  }

  componentWillMount() {
    GroundGameStore.on('change', this.handleGroundGameStoreChange);
  }

  componentWillUnmount() {
    GroundGameStore.removeListener('change', this.handleGroundGameStoreChange);
  }

  handleGroundGameStoreChange = () => {
    this.setState({});
  }

  render() {
    if (!this.props.loaded) return;
    const rwys = GroundGameStore.apt.rwys.map((rwy, key) => {
      const llxy = this.props.latLngToXY;
      return (
        <line key={key} x1={llxy(rwy.ends[0].lat)} y1={llxy(rwy.ends[0].lng)}
          x2={llxy(rwy.ends[1].lat)} y2={llxy(rwy.ends[1].lng)}
          stroke="#fff" strokeWidth="2" />
      );
    });

    return (
      <g className="GroundRunwaysSvg">
        { rwys }
      </g>
    );
  }
}

export default GroundRunwaysSvg;
