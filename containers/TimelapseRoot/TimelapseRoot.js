import { Component } from 'preact';
import './TimelapseRoot.css';
import TimelapseStore from '../../stores/TimelapseStore';
import TimelapsePlaybackStore from '../../stores/TimelapsePlaybackStore';
import { loadState } from '../../lib/persistance';
import { getParameterByName, logErr } from '../../lib/util';
import { sendMessageError } from '../../components/GameMessages/GameMessages';
import TimelapseContainer from '../TimelapseContainer/TimelapseContainer';
import TimelapseOverview from '../TimelapseOverview/TimelapseOverview';
import GameStore from '../../stores/GameStore';
import { route } from 'preact-router';
import { decompressFromUTF16 } from 'lz-string';

export const rethrow = msg => {
  return err => {
    sendMessageError(msg);
    throw err;
  };
};

class TimelapseRoot extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    this.loadRoute();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.timelapseroute !== this.props.timelapseroute)
      this.loadRoute();
  }

  setOverview = () =>
    this.setState({ timelapseroute: 'overview', loading: false });

  loadRoute() {
    this.setState(
      {
        timelapseroute: this.props.timelapseroute,
        loading: true,
        progress: 0,
        url: null,
        name: ''
      },
      () => {
        if (this.state.timelapseroute === 'current') {
          if (!TimelapseStore.timelapse)
            this.setState({ timelapseroute: 'overview', loading: false });
          else {
            if (GameStore.started) {
              if (confirm('You have unsaved progress. Do you want to save?')) {
                if (TimelapsePlaybackStore.saveGame() === false) {
                  return route('/game');
                }
              }
              GameStore.stop();
            }
            TimelapsePlaybackStore.loadPromise(TimelapseStore.timelapse)
              .then(() => {
                this.setState({
                  loading: false,
                  name: TimelapseStore.defaultTimelapseName()
                });
              })
              .catch(this.setOverview);
          }
        } else if (
          this.state.timelapseroute === 'localstorage' &&
          typeof window !== 'undefined'
        ) {
          const set = loadState().timelapses || {};
          const key = getParameterByName('key', window.location.href);
          const timelapse = set[key];
          if (!timelapse) {
            alert('Unable to load timelapse');
            return this.setState({
              timelapseroute: 'overview',
              loading: false
            });
          }
          if (GameStore.started) {
            if (confirm('You have unsaved progress. Do you want to save?')) {
              if (TimelapsePlaybackStore.saveGame() === false) {
                return route('/game');
              }
            }
            GameStore.stop();
          }
          TimelapsePlaybackStore.loadPromise(timelapse)
            .then(() => {
              this.setState({
                loading: false,
                name: key
              });
            })
            .catch(err => {
              logErr(err);
              this.setOverview();
            });
        } else if (this.state.timelapseroute === 'url') {
          if (typeof window === 'undefined') return;
          const id = getParameterByName('id', window.location.href);
          fetch(`https://api.myjson.com/bins/${id}`)
            .then(response => response.text())
            .then(json => JSON.parse(json))
            .then(savedTimelapseEncoded => {
              const timelapse = JSON.parse(
                decompressFromUTF16(savedTimelapseEncoded.content)
              );
              if (!timelapse)
                return this.setState({
                  timelapseroute: 'overview',
                  loading: false
                });
              if (GameStore.started) {
                if (
                  confirm('You have unsaved progress. Do you want to save?')
                ) {
                  if (TimelapsePlaybackStore.saveGame() === false) {
                    return route('/game');
                  }
                }
                GameStore.stop();
              }
              TimelapsePlaybackStore.loadPromise(timelapse)
                .then(() => {
                  this.setState({
                    loading: false,
                    url: location.href,
                    name: 'Shared timelapse'
                  });
                })
                .catch(err => {
                  logErr(err);
                  this.setOverview();
                });
            })
            .catch(err => {
              logErr(err);
              sendMessageError('Could not retrieve timelapse :(');
              this.setState({ loading: false, timelapseroute: 'overview' });
            });
        } else {
          this.setState({
            loading: false,
            timelapseroute: 'overview'
          });
        }
      }
    );
  }

  componentWillUnmount() { }

  render() {
    const showOverview = this.state.timelapseroute === 'overview';
    return (
      <div className={`TimelapseRoot ${this.state.loading ? 'loading' : ''}`}>
        {!this.state.loading ? (
          <div className="content">
            {showOverview ? (
              <TimelapseOverview />
            ) : (
                <TimelapseContainer
                  timelapseroute={this.state.timelapseroute}
                  url={this.state.url}
                  name={this.state.name}
                />
              )}
          </div>
        ) : (
            <div class="loader mid" />
          )}
      </div>
    );
  }
}

export default TimelapseRoot;
