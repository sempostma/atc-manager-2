import { Component } from 'preact';
import config from '../../lib/config';
import './GroundRunwaysSvg.css';
import GroundGameStore from '../../stores/GroundGameStore';

class GroundRunwaysSvg extends Component {
  constructor(props) {
    super();
    this.state = { loaded: props.loaded };
    if (props.loaded) this.setGroundGameStoreData();
  }

  getViewportXY = (x, y) => ({
    x: (x - this.boundsXY.x1) / (this.boundsXY.x2 - this.boundsXY.x1) * config.width,
    y: (y - this.boundsXY.y1) / (this.boundsXY.y2 - this.boundsXY.y1) * config.height,
  });

  componentDidUpdate = () => {
    this.setState({ loaded: this.props.loaded });
    if (this.props.loaded) this.setGroundGameStoreData();
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.loaded !== this.props.loaded;
  }

  setGroundGameStoreData = () => {
    const test = GroundGameStore;
    if (this.props.loaded === false) return;
    this.runwaysXY = GroundGameStore.apt.rwys.map((rwy, key) => {
      const llxy = this.props.latLngToXY;
      const end1 = llxy(rwy.ends[0].lat, rwy.ends[0].lng);
      const end2 = llxy(rwy.ends[1].lat, rwy.ends[1].lng);
      return ({
        x1: end1[0],
        y1: end1[1],
        x2: end2[0],
        y2: end2[1]
      });
    });
  }

  componentWillMount() {
    GroundGameStore.on('change', this.handleGroundGameStoreChange);
  }

  componentWillUnmount() {
    GroundGameStore.removeListener('change', this.handleGroundGameStoreChange);
  }

  handleGroundGameStoreChange = (() => {
    this.setState({});
    if (this.props.loaded) this.setGroundGameStoreData();
  }).bind(this);

  render() {
    if (!this.props.loaded) return;
    const rwys = this.runwaysXY.map(({ x1, y1, x2, y2 }, key) => {
      const c1 = this.getViewportXY(x1, y1);
      const c2 = this.getViewportXY(x2, y2);
      return (
        <line
          key={key}
          x1={c1.x}
          y1={c1.y}
          x2={c2.x}
          y2={c2.y}
          stroke="#fff"
          strokeWidth="2"
        />
      );
    });

    return <g className="GroundRunwaysSvg">{rwys}</g>;
  }
}

export default GroundRunwaysSvg;
