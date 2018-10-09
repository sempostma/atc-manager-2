import { Component } from 'preact';
import './TimelapseChart.css';
import { ComposedChart, Area, YAxis, Brush, Legend, ReferenceLine, Line, XAxis, CartesianGrid, Tooltip } from 'precharts';
import TimelapsePlaybackStore from '../../stores/TimelapsePlaybackStore';

class TimelapseChart extends Component {
  constructor(props) {
    super();
    this.state = {
    };

  }

  componentWillMount() {
    TimelapsePlaybackStore.on('change', this.handleTimelapsePlaybackStoreChange);
  }

  componentWillUnmount() {
    TimelapsePlaybackStore.removeListener('change', this.handleTimelapsePlaybackStoreChange);
  }

  handleTimelapsePlaybackStoreChange = () => this.setState({});

  render() {
    return (
      <div className="TimelapseChart">
        <ComposedChart
          compact={true}
          margin={{ left: -10, bottom: 5, right: 5, top: 5 }}
          width={580}
          height={400}
          data={TimelapsePlaybackStore.chart}>
          {/* <XAxis dataKey="name" orientation="bottom" height={20} /> */}
          <YAxis tick={{ fill: 'white' }} stroke="white" width={35} />
          {/* <CartesianGrid strokeDasharray="20 20" /> */}
          <Line name="Seperation conflicts" dataKey="distanceVialations" stroke="red" />
          <Line name="Enroute flights" dataKey="enroutes" stroke="blue" />
          <Line name="Unpermitted departures" dataKey="unpermittedDepartures" stroke="orange" />
          <Line name="Arrived flights" dataKey="arrivals" stroke="purple" />
          <Area title="Amount of airplanes in the air at a specific point" name="Traffic load" dataKey="trafficLength" fill="green" opacity={.3} />
          <Tooltip width="1" cursor={false} />
        </ComposedChart>
      </div >
    );
  }
}

export default TimelapseChart;
