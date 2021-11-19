import { Component } from 'preact';
import './TimelapseRecorder.css';
import {
  FaCompress,
  FaDesktop,
  FaFileVideo,
  FaSave,
  FaStop,
  FaPlay,
  FaStart,
  FaVideo,
  FaShareAlt
} from 'react-icons/fa/index.esm';

import GameStore from '../../stores/GameStore';
import TimelapseStore from '../../stores/TimelapseStore';
import {
  sendMessageInfo,
  sendMessageError,
  sendMessageWarning
} from '../GameMessages/GameMessages';
import { loadState, saveState } from '../../lib/persistance';
import SharingPanel from '../SharingPanel/SharingPanel';
import { route } from 'preact-router';
import { compressToUTF16 } from 'lz-string';
import config from '../../lib/config';

class TimelapseRecorder extends Component {
  constructor(props) {
    super();
    this.state = {
      msg: '*Changing the game speed will also change the timelapse speed.',
      sharingPromise: null
    };
    this.wasSaved = false;
  }

  componentWillMount() {
    GameStore.on('change', this.reRender);
    TimelapseStore.on('change', this.reRender);
  }

  componentWillUnmount() {
    GameStore.removeListener('change', this.reRender);
    TimelapseStore.removeListener('change', this.reRender);
  }

  handleStartTimelapse = e => {
    if (TimelapseStore.recording === false && TimelapseStore.timelapse) {
      return sendMessageError(
        'Please save or discard your previous timelapse.'
      );
    }
    sendMessageInfo(
      'Changing the game speed will also change the timelapse speed.'
    );
    TimelapseStore.startTimelapse();
    this.wasSaved = false;
  };

  handleStopTimelapse = e => {
    TimelapseStore.stopTimelapse();
    this.setState({
      msg: 'Timelapse is stopped.'
    });
  };

  handleResetTimelapse = e => {
    if (this.wasSaved === false) {
      const result = confirm(
        'Timelapse was not saved. Do want to discard your timelapse without saving?'
      );
      if (!result) return;
      else sendMessageWarning('Timelapse was discarded.');
      this.setState({
        msg: <span className="color-red">Timelapse was discarded.</span>
      });
    } else {
      this.setState({
        msg: 'Timelapse was reset.',
        timelapseName: null
      });
    }
    TimelapseStore.resetTimelapse();
  };

  handleSaveTimelapse = e => {
    const timelapse = TimelapseStore.timelapse;
    const state = loadState();
    state.timelapses = state.timelapses || {};
    let name = prompt(
      'Name of your timelapse?',
      TimelapseStore.defaultTimelapseName()
    );
    if (!name) return sendMessageWarning('Please give a valid name...');
    if (state.timelapses[name]) {
      var result = confirm(
        'This timelapse already exists. Do you want to overwrite it?'
      );
      if (result === false)
        return sendMessageWarning(`${name} was not saved...`);
    }
    state.timelapses[name] = timelapse;
    saveState(state);
    sendMessageInfo(`${name} was saved...`);
    this.wasSaved = true;
    this.setState({
      msg: <span className="color-green">Timelapse was saved.</span>,
      timelapseName: name
    });
  };

  reRender = () => this.setState({});

  handleShareTimelapse = e => {
    if (typeof window === 'undefined') return;
    const stats = TimelapseStore.timelapse.stats;
    const sharingPromise = fetch('https://api.myjson.com/bins', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: compressToUTF16(JSON.stringify(TimelapseStore.timelapse))
      })
    })
      .then(response => response.text())
      .then(
        json =>
          JSON.parse(json)
            .uri.split('/')
            .slice(-1)[0]
      )
      .then(id => ({
        title:
          this.state.timelapseName || TimelapseStore.defaultTimelapseName(),
        text: `ATC Manager 2 timelapse with ${stats.departures} departures, \
  ${stats.enroutes} enroute flights and ${stats.arrivals} arrivals.`,
        url: `${config.url}timelapse/url?id=${id}`
      }));
    this.setState({ sharingPromise: sharingPromise });
  };

  handleShareClose = () => {
    this.setState({
      sharingPromise: null
    });
  };

  handlePlayTimelapse = () => {
    route('/timelapse/current');
  };

  render() {
    const state =
      TimelapseStore.recording === false && TimelapseStore.timelapse !== null
        ? 'done'
        : TimelapseStore.recording === false &&
          TimelapseStore.timelapse === null
          ? 'ready'
          : TimelapseStore.recording === true
            ? 'recording'
            : '';

    return (
      <div className="TimelapseRecorder">
        <div className={`timelapse ${this.state.reset ? 'reset' : ''}`}>
          <h5>Timelapse recorder</h5>
          <button
            disabled={state !== 'ready'}
            className="timelapse-start"
            onClick={this.handleStartTimelapse}
            title="Start timelapse"
          >
            <FaVideo />
          </button>
          <button
            disabled={state !== 'recording'}
            className="timelapse-stop"
            onClick={this.handleStopTimelapse}
            title="Stop timelapse"
          >
            <FaStop />
          </button>
          <button
            disabled={state !== 'done'}
            className="timelapse-save"
            onClick={this.handleSaveTimelapse}
            title="Save timelapse"
          >
            <FaSave />
          </button>
          <button
            disabled={state !== 'done'}
            className="timelapse-share"
            onClick={this.handleShareTimelapse}
            title="Share timelapse"
          >
            <FaShareAlt />
          </button>
          <button
            disabled={state !== 'done'}
            className="timelapse-reset"
            onClick={this.handleResetTimelapse}
            title="Reset timelapse"
          >
            &times;
          </button>
          <button
            disabled={state !== 'done'}
            className="timelapse-play"
            onClick={this.handlePlayTimelapse}
            title="Play timelapse"
          >
            <FaPlay />
          </button>
          <small className="game-speed">{this.state.msg}</small>
        </div>
        {this.state.sharingPromise ? (
          <SharingPanel
            promise={this.state.sharingPromise}
            onClose={this.handleShareClose}
          />
        ) : null}
      </div>
    );
  }
}

export default TimelapseRecorder;
