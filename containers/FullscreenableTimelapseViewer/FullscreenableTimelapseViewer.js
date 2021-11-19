import { Component } from 'preact';
import './TimelapseViewer.css';
import TimelapsePlaybackStore from '../../stores/TimelapsePlaybackStore';
import {
  FaAngleDoubleRight,
  FaPlay,
  FaStop,
  FaAngleRight,
  FaCompress,
  FaExpand,
  FaArrowsAlt,
  FaSearch
} from 'react-icons/fa/index.esm';
import config from '../../lib/config';
import TimelapseStore from '../../stores/TimelapseStore';
import SettingsStore from '../../stores/SettingsStore';
import SvgRadar from '../../components/SvgRadar/SvgRadar';
import GameStore from '../../stores/GameStore';
import { lpad, debounce, gamestoreFramesTimeFmt } from '../../lib/util';
import Fullscreenable from 'react-fullscreenable';

class TimelapseViewer extends Component {
  constructor(props) {
    super();
    this.state = {
      cmd: {},
      interval: null,
      scrub: 0,
      scrubFocus: false,
      rawSpeed: 0,
      rawZoom: 1,
      show: true
    };
  }

  handleZoom = e => {
    // GameStore.adjustZoom(-e.deltaY);
  };

  handleSVGClick = e => {
  };

  componentWillMount() {
    TimelapsePlaybackStore.on(
      'change',
      this.handleTimelapsePlaybackStoreChange
    );
    if (typeof window !== 'undefined')
      document.addEventListener('mouseup', this.handleScrubDone);
    if (typeof window !== 'undefined')
      document.addEventListener('touchend', this.handleScrubDone);
  }

  componentWillUnmount() {
    TimelapsePlaybackStore.removeListener(
      'change',
      this.handleTimelapsePlaybackStoreChange
    );
    if (typeof window !== 'undefined')
      document.removeEventListener('mouseup', this.handleScrubDone);
    if (typeof window !== 'undefined')
      document.removeEventListener('touchend', this.handleScrubDone);
  }

  handleTimelapsePlaybackStoreChange = () => {
    this.setState({});
  };

  handleTogglePlay = () => {
    TimelapsePlaybackStore.toggle();
  };

  handleScrub = e => {
    TimelapsePlaybackStore.scrub(+e.target.value);
    this.setState({ scrub: +e.target.value });
  };

  handleScrubFocus = e => {
    this.setState({ scrubFocus: true });
  };

  handleScrubDone = e => {
    this.setState({ scrubFocus: false });
  };

  handleSpeed = e => {
    this.setState({ rawSpeed: +e.target.value });
    let speed = +e.target.value;
    if (speed < 0) speed = speed / 10 + 1;
    else speed = speed + 1;
    TimelapsePlaybackStore.speed = speed;
  };

  handleZoomSlider = e => {
    this.setState({ rawZoom: e.target.value });
    let zoom = +e.target.value;
    zoom = Math.pow(zoom, 2);
    GameStore.zoom = zoom;
    GameStore.emit('change');
  };

  handleMouseMove = e => {
    if (this.state.show !== true) this.setState({ show: true });
    this.handleMouseMoveDebounced();
  };

  handleMouseMoveDebounced = debounce(e => {
    if (this.state.show !== false) this.setState({ show: false });
  }, 3000);

  render() {
    const index = TimelapsePlaybackStore.index;
    const len = TimelapsePlaybackStore.timelapse.patches.length;

    return (
      <div className="TimelapseViewer">
        <div
          onMouseMove={this.handleMouseMove}
          class={`video-wrapper ${this.state.show ? 'show' : ''}`}
        >
          <SvgRadar
            timelapse
            className="video"
            onZoom={this.handleZoom}
            onClick={this.handleSVGClick}
            cmd={this.state.cmd}
          />
          <div className="video-ui">
            <button onClick={this.handleTogglePlay} className="video-play">
              {TimelapsePlaybackStore.interval !== null ? (
                <FaStop />
              ) : (
                <FaPlay />
              )}
            </button>
            <div className="video-speed">
              <div className="video-speed-label">
                <b>{TimelapsePlaybackStore.speed.toFixed(1)}</b>
              </div>
              <button className="video-speed-btn">
                {this.state.rawSpeed > 0 ? (
                  <FaAngleDoubleRight />
                ) : (
                  <FaAngleRight />
                )}
              </button>
              <input
                onInput={this.handleSpeed}
                value={this.state.rawSpeed}
                step="1"
                min="-9"
                max="9"
                orient="vertical"
                type="range"
                className="video-speed-slider"
              />
            </div>
            <div className="video-zoom">
              <button className="video-zoom-btn">
                <FaSearch />
              </button>
              <input
                onInput={this.handleZoomSlider}
                value={this.state.rawZoom}
                step="0.1"
                min="1"
                max={Math.sqrt(10)}
                orient="vertical"
                type="range"
                className="video-zoom-slider"
              />
            </div>
            <div className="range-slider video-visual-progress">
              <input
                style="width: calc(100% - 120px)"
                onInput={this.handleScrub}
                onFocus={this.handleScrubFocus}
                className="range-slider__range"
                type="range"
                value={this.state.scrubFocus ? this.state.scrub : index}
                min="0"
                max={len - 1}
                step="1"
              />
              <span style="width: 100px" className="range-slider__value">
                {gamestoreFramesTimeFmt(index)}/
                {gamestoreFramesTimeFmt(len - 1)}
              </span>
            </div>
            <button
              onClick={this.props.toggleFullscreen}
              className="video-fullscreen"
            >
              {this.props.isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const FullscreenableTimelapseViewer = Fullscreenable()(TimelapseViewer);

export default FullscreenableTimelapseViewer;
