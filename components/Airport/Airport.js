import { Component } from 'react';
import GameStore from '../../stores/GameStore';
import config from '../../lib/config';
import SettingsStore from '../../stores/SettingsStore';

class Airport extends Component {
  constructor(props) {
    super();
    this.state = {
      airport: GameStore.airport
    };

    this.handleGameStoreStart = this.handleGameStoreStart.bind(this);
  }

  componentWillMount() {
    GameStore.on('start', this.handleGameStoreStart);
  }

  componentWillUnmount() {
    GameStore.removeListener('start', this.handleGameStoreStart);
  }

  handleGameStoreStart() {
    this.setState({
      airport: GameStore.airport
    });
  }

  renderRwy(rwy) {
    const len = rwy.length * config.rwyLenScale;
    let x1 = Math.sin((rwy.hdg1 * Math.PI) / 180) * -len * GameStore.zoom;
    let y1 = Math.cos((rwy.hdg1 * Math.PI) / 180) * -len * GameStore.zoom;
    let x2 = Math.sin((rwy.hdg2 * Math.PI) / 180) * -len * GameStore.zoom;
    let y2 = Math.cos((rwy.hdg2 * Math.PI) / 180) * -len * GameStore.zoom;

    let ilsx1 =
      Math.sin((rwy.hdg1 * Math.PI) / 180) *
      -SettingsStore.ilsPathLength *
      GameStore.zoom;
    let ilsy1 =
      Math.cos((rwy.hdg1 * Math.PI) / 180) *
      -SettingsStore.ilsPathLength *
      GameStore.zoom;
    let ilsx2 =
      Math.sin((rwy.hdg2 * Math.PI) / 180) *
      -SettingsStore.ilsPathLength *
      GameStore.zoom;
    let ilsy2 =
      Math.cos((rwy.hdg2 * Math.PI) / 180) *
      -SettingsStore.ilsPathLength *
      GameStore.zoom;

    return (
      <g
        className="rwy"
        transform={`translate(${rwy.x * GameStore.zoom} ${-rwy.y *
          GameStore.zoom})`}
      >
        <line
          className="ils-line ils-line-1"
          stroke-dasharray={SettingsStore.ilsDashInterval.join()}
          x1={x1}
          y1={-y1}
          x2={ilsx1}
          y2={-ilsy1}
        />
        <line
          className="ils-line ils-line-2"
          stroke-dasharray={SettingsStore.ilsDashInterval.join()}
          x1={x2}
          y1={-y2}
          x2={ilsx2}
          y2={-ilsy2}
        />
        <line className="rwy-line" x1={x1} y1={-y1} x2={x2} y2={-y2} />
        <text
          className="rwy-name"
          x={x1 * rwy.labelSpread1}
          y={-y1 * rwy.labelSpread1 + 4}
        >
          {rwy.name1}
        </text>
        <text
          className="rwy-name"
          x={x2 * rwy.labelSpread2}
          y={-y2 * rwy.labelSpread2 + 4}
        >
          {rwy.name2}
        </text>
      </g>
    );
  }

  render() {
    const airport = this.state.airport;
    if (!airport || !airport.runways) return null;

    const x = config.width / 2 + airport.x;
    const y = config.height / 2 + airport.y;

    const airportJsx = airport.runways.map(rwy => this.renderRwy(rwy));
    let distanceCirlces = null;
    if (SettingsStore.distanceCircles) {
      distanceCirlces = new Array(SettingsStore.distanceCirclesAmount);
      for (let i = 0; i < distanceCirlces.length; i++) {
        distanceCirlces[i] = (
          <circle
            key={i}
            r={(i + 1) * SettingsStore.distanceCirclesDistance * GameStore.zoom}
            fill="none"
            stroke={SettingsStore.distanceCircleColor}
          />
        );
      }
    }

    return (
      <g className="Airport" transform={`translate(${x} ${y})`}>
        {distanceCirlces}
        <circle r="2" fill="#fff" />
        <g className="runways">{airportJsx}</g>
        <text x="4">{this.state.airport.callsign}</text>
      </g>
    );
  }
}

export default Airport;
