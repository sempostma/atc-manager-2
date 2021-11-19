import { Component } from 'preact';
import './TimelapseContainer.css';
import {
  FaLink,
  FaShareAlt,
  FaEnvelope,
  FaPlayCircle,
  FaDesktop,
  FaChartLine,
  FaSave
} from 'react-icons/fa/index.esm';
import FullscreenableTimelapseViewer from '../FullscreenableTimelapseViewer/FullscreenableTimelapseViewer';
import TimelapsePlaybackStore from '../../stores/TimelapsePlaybackStore';
import { gamestoreFramesTimeFmt, logErr } from '../../lib/util';
import GameStore from '../../stores/GameStore';
import { saveAs } from 'file-saver';
import config from '../../lib/config';
import SharingPanel from '../../components/SharingPanel/SharingPanel';
import TimelapseStore from '../../stores/TimelapseStore';
import { route } from 'preact-router';
import SavedGamesOpen from '../../components/SavedGamesOpen/SavedGamesOpen';
import TimelapseChart from '../../components/TimelapseChart/TimelapseChart';
import { sendMessageInfo } from '../../components/GameMessages/GameMessages';
import { compressToUTF16 } from 'lz-string';

class TimelapseContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      sharing: false,
      url: props.url
    };
    this.chartSvgRef = null;
  }

  handleScreenshotClick = () => {
    if (!GameStore.svgEl) return;
    let source =
      '<?xml version="1.0" standalone="no"?>\n' + GameStore.svgEl.outerHTML;

    saveAs(
      new Blob([source], {
        type: 'image/svg+xml'
      }),
      `Screenshot ${GameStore.map.name}.svg`
    );
  };

  componentWillMount() {
    TimelapsePlaybackStore.on('change', this.reRender);
    GameStore.on('change', this.reRender);
  }

  componentWillUnmount() {
    TimelapsePlaybackStore.removeListener('change', this.reRender);
    GameStore.removeListener('change', this.reRender);
  }

  reRender = () => this.setState({});

  sharingDone = () => this.setState({ sharing: false });

  share = () => {
    if (typeof window === 'undefined') return;
    const stats = TimelapsePlaybackStore.timelapse.stats;
    const timelapse = TimelapsePlaybackStore.timelapse;
    const sharingPromise = Promise.resolve()
      .then(() => {
        if (this.state.url) return this.state.url;
        else
          return fetch('https://api.myjson.com/bins', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content: compressToUTF16(
                JSON.stringify(TimelapsePlaybackStore.timelapse)
              )
            })
          })
            .then(response => response.text())
            .then(
              json =>
                JSON.parse(json)
                  .uri.split('/')
                  .slice(-1)[0]
            )
            .then(id => `${config.url}timelapse/url?id=${id}`);
      })
      .then(url => ({
        title: this.state.name || TimelapseStore.defaultTimelapseName(),
        text: `ATC Manager 2 timelapse with ${stats.departures} departures, \
${stats.enroutes} enroute flights and ${stats.arrivals} arrivals.`,
        url: url
      }))
      .catch(err => {
        logErr(err);
        this.setState({
          sharingPromise: null,
          sharing: false
        });
      });
    this.setState({
      sharingPromise: sharingPromise,
      sharing: true
    });
    sharingPromise.then(o => this.setState({ url: o.url }));
  };

  handleStartPlaying = () => {
    if (this.props.timelapseroute === 'current') {
      const result = confirm(
        'You have not saved your timelapse. Are you sure you want to continue?'
      );
      if (!result) return;
    }
    GameStore.startSaved(
      TimelapsePlaybackStore.states[TimelapsePlaybackStore.index]
    );
    route('/game');
  };

  handleSaveTimelapse = () => {
    const name = TimelapsePlaybackStore.save();
    if (!name) return;
    route('/timelapse/localstorage?key=' + name);
  };

  handleOverviewClick = () => {
    route('/timelapse/overview');
  };

  render() {
    return (
      <div className="TimelapseContainer">
        <div className="abs-container">
          <button onClick={this.handleOverviewClick}>Overview</button>
        </div>
        <div className="panel timelapse-header">
          <h3 className="text-center">{this.props.name}</h3>
          <p />
        </div>
        <FullscreenableTimelapseViewer />
        <div className="panel timelapse-footer">
          <div className="timelapse-footer-options">
            <div className="option" onClick={this.handleStartPlaying}>
              <FaPlayCircle /> Start playing timelapse at{' '}
              {gamestoreFramesTimeFmt(TimelapsePlaybackStore.index)}
            </div>
            <div className="option" onClick={this.share}>
              <FaShareAlt /> Share this timelapse
            </div>
            {this.props.timelapseroute !== 'localstorage' ? (
              <div className="option" onClick={this.handleSaveTimelapse}>
                <FaSave /> Save Timelapse
              </div>
            ) : null}
            <div className="option" onClick={this.handleScreenshotClick}>
              <FaDesktop /> Save Radar as SVG
            </div>
          </div>
        </div>
        <div className="panel">
          <SavedGamesOpen />
        </div>
        <div className="panel">
          <TimelapseChart />
        </div>
        {this.state.sharing ? <div className="panel-open-bg" /> : null}
        {this.state.sharing ? (
          <SharingPanel
            onClose={this.sharingDone}
            promise={this.state.sharingPromise}
          />
        ) : null}
      </div>
    );
  }
}

export default TimelapseContainer;
