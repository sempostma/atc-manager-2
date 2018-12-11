import { Component } from 'preact';
import './GroundAptView.css';
import GroundRadarSvg from '../../components/GroundRadarSvg/GroundRadarSvg';

class GroundAptView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="GroundAptView">
        <GroundRadarSvg
          loaded={this.props.loaded}
          latLngToXY={this.props.latLngToXY}
        />
      </div>
    );
  }
}

export default GroundAptView;
