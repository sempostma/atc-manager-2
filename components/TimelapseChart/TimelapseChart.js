import { Component } from 'preact';
import './TimelapseChart.css';
import {
  ComposedChart,
  Area,
  YAxis,
  Brush,
  Legend,
  Tooltip,
  ReferenceLine,
  Line,
  XAxis,
  CartesianGrid
} from 'recharts';
import TimelapsePlaybackStore from '../../stores/TimelapsePlaybackStore';

class TimelapseChart extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {
    TimelapsePlaybackStore.on(
      'change',
      this.handleTimelapsePlaybackStoreChange
    );
  }

  componentWillUnmount() {
    TimelapsePlaybackStore.removeListener(
      'change',
      this.handleTimelapsePlaybackStoreChange
    );
  }

  handleTimelapsePlaybackStoreChange = () => this.setState({});

  render() {
    return (
      <div className="TimelapseChart">
        <ComposedChart
          margin={{ left: -10, bottom: 5, right: 5, top: 5 }}
          width={580}
          height={400}
          data={TimelapsePlaybackStore.chart}
        >
          <Tooltip />
          <YAxis tick={{ fill: 'white' }} stroke="white" width={35} />
          <Line
            name="Seperation conflicts"
            dataKey="distanceVialations"
            stroke="red"
          />
          <Line name="Enroute flights" dataKey="enroutes" stroke="blue" />
          <Line name="Departed flights" dataKey="departures" stroke="blue" />
          <Line
            name="Unpermitted departures"
            dataKey="unpermittedDepartures"
            stroke="orange"
          />
          <Line name="Arrived flights" dataKey="arrivals" stroke="purple" />
          <Area
            title="Amount of airplanes in the air at a specific point"
            name="Traffic load"
            dataKey="trafficLength"
            fill="green"
            opacity={0.3}
          />
          <Legend />
        </ComposedChart>
      </div>
    );
  }
}

export default TimelapseChart;
