import { Component } from 'preact';
import './AptDat.css';
import { history } from '../../index';
import { route } from 'preact-router';
import AptDatStore from '../../stores/AptDatStore';
import GroundAirportSvg from '../../components/GroundAirportSvg/GroundAirportSvg';

class AptDat extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="AptDat">
        <div className="panel">
          <h1>Apt Dat</h1>

          <svg width="580" height="400" viewBox="0 0 400 400">
            <GroundAirportSvg />
          </svg>
        </div>
      </div>
    );
  }
}

export default AptDat;
