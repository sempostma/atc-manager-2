import { Component } from 'preact';
import css from './Settings.css';
import SettingsStore from '../../stores/SettingsStore';
import Communications from '../../lib/communications';
import GameStore from '../../stores/GameStore';
import { FaCompress, FaExpand } from 'react-icons/fa/index.mjs';
import config from '../../lib/config';

class Settings extends Component {
  constructor(props) {
    super();
    this.state = {
      difficulty: 'normal',
      expanded: false,
    };
  }

  componentWillMount() {
    SettingsStore.on('change', this.handleSettingsStoreChange);
    Communications.synth.addEventListener('voiceschanged', this.handleVoicesChange);
  }

  componentWillUnmount() {
    SettingsStore.removeListener('change', this.handleSettingsStoreChange);
    Communications.synth.removeEventListener('voiceschanged', this.handleVoicesChange);

  }

  handleSettingsStoreChange = () => {
    this.setState({});
  }

  handleNewPlaneIntervalChange = e => {
    SettingsStore.newPlaneInterval = +e.target.value;
    SettingsStore.emit('change');
  }

  handleRadarFontSizeChange = e => {
    SettingsStore.radarFontsize = +e.target.value;
    SettingsStore.emit('change');
  }

  handleSpeechVoiceChange = e => {
    SettingsStore.changeVoice(SettingsStore.voices[+e.target.value]);
    SettingsStore.emit('change');
  }

  handleSpeechSynthesisSettingChange = e => {
    SettingsStore.speechsynthesis = e.target.checked;
    SettingsStore.emit('change');
  }

  handleSpeechRecognitionSettingChange = e => {
    SettingsStore.speechrecognition = e.target.checked;
    SettingsStore.emit('change');
  }

  handleVoicesChange = e => {
    SettingsStore.emit('change');
  }

  handlePitchChange = e => {
    SettingsStore.changePitch(+e.target.value);
    SettingsStore.emit('change');
  }

  handleRateChange = e => {
    SettingsStore.changeRate(+e.target.value);
    SettingsStore.emit('change');
  }

  handleSpeedChange = e => {
    SettingsStore.setSpeed(+e.target.value);
    SettingsStore.emit('change');
  }

  handleDifficultyChange = e => {
    switch (e.target.value) {
    case 'easy':
      SettingsStore.startingInboundPlanes = 1;
      SettingsStore.startingOutboundPlanes = 1;
      SettingsStore.startingEnroutePlanes = 0;
      SettingsStore.newPlaneInterval = 180;
      break;
    case 'normal':
      SettingsStore.startingInboundPlanes = 3;
      SettingsStore.startingOutboundPlanes = 2;
      SettingsStore.startingEnroutePlanes = 1;
      SettingsStore.newPlaneInterval = 100;
      break;
    case 'hard':
      SettingsStore.startingInboundPlanes = 4;
      SettingsStore.startingOutboundPlanes = 3;
      SettingsStore.startingEnroutePlanes = 0;
      SettingsStore.newPlaneInterval = 70;
      break;
    }
    this.setState({
      difficulty: e.target.value,
    });
  }

  handleIlsPathColorChange(e) {
    SettingsStore.ilsPathColor = e.target.value;
    SettingsStore.emit('change');
  }

  handleDistanceCircleColor(e) {
    SettingsStore.distanceCircleColor = e.target.value;
    SettingsStore.emit('change');
  }

  handleSepVialotionCircleColor(e) {
    SettingsStore.sepVialationCircleColor = e.target.value;
    SettingsStore.emit('change');
  }

  handleDistanceCircleChange(e) {
    SettingsStore.distanceCircles = e.target.checked;
    SettingsStore.emit('change');
  }

  handleToggleExpandClick = e => {
    this.setState({ expanded: !this.state.expanded });
  }

  handleGA = e => {
    SettingsStore.ga = e.target.checked;
    SettingsStore.emit('change');
  }

  handleEnroute = e => {
    SettingsStore.enroute = e.target.checked;
    SettingsStore.emit('change');
  }

  render() {
    return (
      <div className="settings">
        <span>Game Speed</span>
        <div className="range-slider mb">
          <input className="range-slider__range" type="range" min="0.1" max="10" step="0.1" value={SettingsStore.speed} onInput={this.handleSpeedChange} />
          <span class="range-slider__value">{SettingsStore.speed}x</span>
        </div>
        <div className="mb">
          <span>Difficulty:</span>
          <select value={this.state.difficulty} onInput={this.handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className={`mb ${css.SwitchInput}`}>
          <span>Distance circle</span>
          <label class="switch">
            <input type="checkbox" onInput={this.handleDistanceCircleChange} checked={SettingsStore.distanceCircles} />
            <span class="slider"></span>
          </label>
        </div>
        <div className={`mb ${css.SwitchInput}`}>
          <span>General Aviation</span>
          <label class="switch">
            <input type="checkbox" onInput={this.handleGA} checked={SettingsStore.ga} />
            <span class="slider"></span>
          </label>
        </div>
        <div className={`mb ${css.SwitchInput}`}>
          <span>Enroute Traffic</span>
          <label class="switch">
            <input type="checkbox" onInput={this.handleEnroute} checked={SettingsStore.enroute} />
            <span class="slider"></span>
          </label>
        </div>
        <div className={`mb ${css.ColorInput}`}>
          <span>Distance circle color:</span>
          <input type="color" value={SettingsStore.distanceCircleColor} onInput={this.handleDistanceCircleColor} />
        </div>
        <div className={`mb ${css.ColorInput}`}>
          <span>ILS indicator color:</span>
          <input type="color" value={SettingsStore.ilsPathColor} onInput={this.handleIlsPathColorChange} />
        </div>
        <div className={`mb ${css.ColorInput}`}>
          <span>Seperatorion circle color:</span>
          <input type="color" value={SettingsStore.sepVialationCircleColor} onInput={this.handleSepVialotionCircleColor} />
        </div>
        <span>Radar font size:</span>
        <div className="fontsize-setting range-slider mb">
          <input className="range-slider__range" type="range" min="8" max="30" step="1" value={SettingsStore.radarFontsize} onInput={this.handleRadarFontSizeChange} />
          <span class="range-slider__value">{SettingsStore.radarFontsize} pixels</span>
        </div>

        <button onClick={this.handleToggleExpandClick}>{this.state.expanded
          ? <span><FaCompress /> Hide advanced settings</span>
          : <span><FaExpand /> Show advanced settings </span>}</button>
        <div style="border: 1px solid #1e606b; border-radius: 5px; padding: 5px;" className={this.state.expanded ? null : 'hidden'}>
          <div className={`speechsynthesis-setting mb ${css.SwitchInput}`}>
            <span>Speech synthesis</span>
            <label class="switch">
              <input type="checkbox" onInput={this.handleSpeechSynthesisSettingChange} checked={SettingsStore.speechsynthesis} />
              <span class="slider"></span>
            </label>
          </div>
          <div className="speechsynthesis-voices-setting mb">
            <span>Speech synthesis voices</span>
            <select onInput={this.handleSpeechVoiceChange}>
              {SettingsStore.voices.map((voice, i) => {
                return <option key={i} value={i}>{voice.name} - {voice.lang}</option>;
              })}
            </select>
          </div>
          <span>Pitch:</span>
          <div className="speechsynthesis-pitch-setting range-slider mb">
            <input className="range-slider__range" type="range" min="0.1" max="2" step="0.1" value={SettingsStore.pitch} onInput={this.handlePitchChange} />
            <span class="range-slider__value">{SettingsStore.pitch}x</span>
          </div>
          <span>Rate:</span>
          <div className="speechsynthesis-rate-setting range-slider mb">
            <input className="range-slider__range" type="range" min="0.1" max="2" step="0.1" value={SettingsStore.rate} onInput={this.handleRateChange} />
            <span class="range-slider__value">{SettingsStore.rate}x</span>
          </div>
          {/* <div className="mb">
          <span>Speech Recognition</span>
          <label class="switch">
            <input type="checkbox" onInput={this.handleSpeechRecognitionSettingChange} checked={SettingsStore.speechrecognition} />
            <span class="slider"></span>
          </label>
        </div> */}
          <span>Spawn plane interval:</span>
          <div className="fontsize-setting range-slider mb">
            <input className="range-slider__range" type="range" min="20" max="400" step="10" value={SettingsStore.newPlaneInterval} onInput={this.handleNewPlaneIntervalChange} />
            <span class="range-slider__value">{SettingsStore.newPlaneInterval} seconds</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
