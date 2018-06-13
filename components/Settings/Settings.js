import { Component } from 'preact';
import './Settings.css';
import SettingsStore from '../../stores/SettingsStore';
import Communications from '../../lib/communications';
import GameStore from '../../stores/GameStore';

class Settings extends Component {
  constructor(props) {
    super();
    this.state = {
      difficulty: 'normal',
    };

    this.handleSpeechRecognitionSettingChange = this.handleSpeechRecognitionSettingChange.bind(this);
    this.handleSpeechSynthesisSettingChange = this.handleSpeechSynthesisSettingChange.bind(this);
    this.handleVoicesChange = this.handleVoicesChange.bind(this);
    this.handlePitchChange = this.handlePitchChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleSpeechVoiceChange = this.handleSpeechVoiceChange.bind(this);
    this.handleSettingsStoreChange = this.handleSettingsStoreChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleIlsPathColorChange = this.handleIlsPathColorChange.bind(this);
    this.handleDistanceCircleColor = this.handleDistanceCircleColor.bind(this);
  }

  componentWillMount() {
    SettingsStore.on('change', this.handleSettingsStoreChange);
    Communications.synth.addEventListener('voiceschanged', this.handleVoicesChange);
  }

  componentWillUnmount() {
    SettingsStore.removeListener('change', this.handleSettingsStoreChange);
    Communications.synth.removeEventListener('voiceschanged', this.handleVoicesChange);

  }

  handleSettingsStoreChange() {
    this.setState({});
  }

  handleSpeechVoiceChange(e) {
    SettingsStore.changeVoice(SettingsStore.voices[+e.target.value])
    SettingsStore.emit('change');
  }

  handleSpeechSynthesisSettingChange(e) {
    SettingsStore.speechsynthesis = e.target.checked;
    SettingsStore.emit('change');
  }

  handleSpeechRecognitionSettingChange(e) {
    SettingsStore.speechrecognition = e.target.checked;
    SettingsStore.emit('change');
  }

  handleVoicesChange(e) {
    SettingsStore.emit('change');
  }

  handlePitchChange(e) {
    SettingsStore.changePitch(+e.target.value);
    SettingsStore.emit('change');
  }

  handleRateChange(e) {
    SettingsStore.changeRate(+e.target.value);
    SettingsStore.emit('change');
  }

  handleSpeedChange(e) {
    SettingsStore.setSpeed(+e.target.value);
    SettingsStore.emit('change');
  }

  handleDifficultyChange(e) {
    switch (e.target.value) {
      case 'easy':
        SettingsStore.startingInboundPlanes = 1;
        SettingsStore.startingOutboundPlanes = 1;
        SettingsStore.newPlaneInterval = 180;
        break;
      case 'normal':
        SettingsStore.startingInboundPlanes = 3;
        SettingsStore.startingOutboundPlanes = 2;
        SettingsStore.newPlaneInterval = 100;
        break;
      case 'hard':
        SettingsStore.startingInboundPlanes = 4;
        SettingsStore.startingOutboundPlanes = 3;
        SettingsStore.newPlaneInterval = 70;
        break;
    }
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

  render() {
    return (
      <div className="settings">
        <div className="speechsynthesis-setting mb">
          <span>Speech Synthesis</span>
          <input type="checkbox" onInput={this.handleSpeechSynthesisSettingChange} checked={SettingsStore.speechsynthesis} />
        </div>
        <div className="speechsynthesis-voices-setting mb">
          <span>Speech Synthesis Voices</span>
          <select style="color: #333; background: #fff" onInput={this.handleSpeechVoiceChange}>
            {SettingsStore.voices.map((voice, i) => {
              return <option key={i} value={i}>{voice.name} - {voice.lang}</option>
            })}
          </select>
        </div>
        <span>Pitch:</span>
        <div className="speechsynthesis-pitch-setting range-slider mb">
          <input className="range-slider__range" type="range" min="0.1" max="2" step="0.1" value={SettingsStore.pitch} onInput={this.handlePitchChange} />
          <span class="range-slider__value">{SettingsStore.pitch}</span>
        </div>
        <span>Rate:</span>
        <div className="speechsynthesis-rate-setting range-slider mb">
          <input className="range-slider__range" type="range" min="0.1" max="2" step="0.1" value={SettingsStore.rate} onInput={this.handleRateChange} />
          <span class="range-slider__value">{SettingsStore.rate}</span>
        </div>
        <div className="mb">
          <span>Speech Recognition</span>
          <input type="checkbox" onInput={this.handleSpeechRecognitionSettingChange} checked={SettingsStore.speechrecognition} />
        </div>
        <span>Game Speed</span>
        <div className="range-slider mb">
          <input className="range-slider__range" type="range" min="0.1" max="10" step="0.1" value={SettingsStore.speed} onInput={this.handleSpeedChange} />
          <span class="range-slider__value">{SettingsStore.speed}</span>
        </div>
        <div className="mb">
          <span>Difficulty:</span>
          <select value={this.state.difficulty} onInput={this.handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb">
          <span>Distance Circle</span>
          <input type="checkbox" onInput={this.handleDistanceCircleChange} checked={SettingsStore.distanceCircles} />
        </div>
        <div className="mb">
          <span>Distance Circle Color:</span>
          <input type="color" value={SettingsStore.distanceCircleColor} onInput={this.handleDistanceCircleColor} />
        </div>
        <div className="mb">
          <span>ILS Indicator Color:</span>
          <input type="color" value={SettingsStore.ilsPathColor} onInput={this.handleIlsPathColorChange} />
        </div>
        <div className="mb">
          <span>Seperatorion Circle Color:</span>
          <input type="color" value={SettingsStore.sepVialationCircleColor} onInput={this.handleSepVialotionCircleColor} />
        </div>
      </div>
    );
  }
}

export default Settings;
