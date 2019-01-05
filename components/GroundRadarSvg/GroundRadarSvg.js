import { Component } from 'preact';
import './GroundRadarSvg.css';
import GroundGameStore from '../../stores/GroundGameStore';
import GroundRunwaysSvg from '../GroundRunwaysSvg/GroundRunwaysSvg';

class GroundRadarSvg extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {
    GroundGameStore.on('change', this.handleGroundGameStoreChange);
  }

  componentWillUnmount() {
    GroundGameStore.removeListener('change', this.handleGroundGameStoreChange);
  }

  handleGroundGameStoreChange = () => {
    this.setState({});
  };

  setRef = el => (this.svgRef = el);

  render() {
    const width = typeof window !== 'undefined' ? window.innerWidth : 800;
    const height = typeof window !== 'undefined' ? window.innerHeight : 600;

    const style = `
.ground-taxi-nodes {
  stroke: green;
}
.ground-taxi-edges {
  stroke: green;
}`;

    return (
      <div className="GroundRadarSvg">
        <svg
          ref={this.setRef}
          xmlns="http://www.w3.org/2000/svg"
          className="atc-view-svg"
          width={width}
          height={height}
          viewBox="0 0 1280 720"
        >
          <style>{style}</style>
          <GroundRunwaysSvg
            loaded={this.props.loaded}
            latLngToXY={this.props.latLngToXY}
          />
        </svg>
      </div>
    );
  }
}

export default GroundRadarSvg;
