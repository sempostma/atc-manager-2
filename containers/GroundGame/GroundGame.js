import { Component } from 'preact';
import './GroundGame.css';
import AptDatStore from '../../stores/AptDatStore';
import GroundAptView from '../GroundAptView/GroundAptView';
import GroundGameStore from '../../stores/GroundGameStore';
import { meterPerLatLng } from '../../lib/ground/navhelpers';

class GroundGame extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
    };

  }

  componentWillMount() {
    this.getAptByIcao('KBFI');
  }

  componentWillUnmount() {
  }

  getAptByIcao = async icao => {
    this.setState({ loaded: false });
    this.latLngToXY = null;
    await GroundGameStore.loadByIcao(icao);
    const { apt, aptNav } = GroundGameStore;
    const [meterPerLat, meterPerLng] = meterPerLatLng(aptNav.lat, aptNav.lng);

    this.latLngToXY = (lat, lng) => ([
      (lat - aptNav.lat) * meterPerLat,
      (lng - aptNav.lng) * meterPerLng
    ]);
    this.setState({ apt, aptNav, loaded: true });
  }

  render() {
    return (
      <div className="GroundGame">
        <GroundAptView loaded={this.state.loaded} latLngToXY={this.latLngToXY} />
      </div>
    );
  }
}

export default GroundGame;
