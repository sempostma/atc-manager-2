import { Component } from 'preact';
import './TimelapseRoot.css';
import TimelapseStore from '../../stores/TimelapseStore';
import TimelapsePlaybackStore from '../../stores/TimelapsePlaybackStore';
import { loadState } from '../../lib/persistance';
import { getParameterByName } from '../../lib/util';
import { sendMessageError } from '../../components/GameMessages/GameMessages';
import TimelapseContainer from '../TimelapseContainer/TimelapseContainer';
import WindowLoader from '../../components/WindowLoader/WindowLoader';

export const rethrow = msg => {
  return err => {
    sendMessageError(msg);
    throw err;
  };
};



class TimelapseRoot extends Component {
  constructor(props) {
    super();
    this.state = {
      timelapseroute: props.timelapseroute,
      loading: true,
      progress: 0,
      url: null,
      name: '',
    };

    if (this.state.timelapseroute === 'current') {
      if (!TimelapseStore.timelapse) this.state.timelapseroute = 'overview';
      else {
        TimelapsePlaybackStore.loadPromise(TimelapseStore.timelapse)
          .then(() => {
            this.setState({
              loading: false,
              name: TimelapseStore.defaultTimelapseName(),
            });
          });
      }
    } else if (this.state.timelapseroute === 'localstorage' && typeof window !== 'undefined') {
      const set = loadState().timelapses || {};
      const key = getParameterByName('key', window.location.href);
      const timelapse = set[key];
      if (!timelapse) this.state.timelapseroute = 'overview';
      else TimelapsePlaybackStore.loadPromise(timelapse)
        .then(() => {
          this.setState({
            loading: false,
            name: key,
          });
        });
    } else if (this.state.timelapseroute === 'url') {
      if (typeof window === 'undefined') return;
      const id = getParameterByName('id', window.location.href);
      fetch(`https://api.myjson.com/bins/${id}`)
        .then(response => response.text())
        .then(json => JSON.parse(json))
        .then(timelapse => {
          if (!timelapse) this.setState({
            timelapseroute: 'overview',
            loading: false
          });
          else TimelapsePlaybackStore.loadPromise(timelapse)
            .then(() => {
              this.setState({
                loading: false,
                url: location.href,
                name: 'Shared timelapse'
              });
            });
        })
        .catch(err => {
          sendMessageError('Could not retrieve timelapse :(');
          this.setState({ loading: false, timelapseroute: 'overview' });
        });
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const showOverview = this.state.timelapseroute === 'overview';
    const loading = false;
    return (
      <div className={`TimelapseRoot ${this.state.loading ? 'loading' : ''}`}>
        {!this.state.loading
          ? <div className="content">
            {showOverview ? 'Overview' : <TimelapseContainer timelapseroute={this.state.timelapseroute} url={this.state.url} name={this.state.name} />}
          </div>
          : <div class="loader mid" />}
      </div>
    );
  }
}

export default TimelapseRoot;
