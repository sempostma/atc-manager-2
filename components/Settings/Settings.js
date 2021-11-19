import { Component } from 'preact';
import './Settings.css';
import SettingsStore from '../../stores/SettingsStore';
import Communications from '../../lib/communications';
import GameStore from '../../stores/GameStore';
import { FaCompress, FaExpand } from 'react-icons/fa/index.esm';
import config from '../../lib/config';
import { wipeServiceWorkerCache } from '../../lib/persistance';

class Settings extends Component {
  constructor(props) {
    super();
    this.state = {
      difficulty: 'normal',
      expanded: false,
      appearanceExpanded: false
    };
  }

  componentWillMount() {
    SettingsStore.on('change', this.handleSettingsStoreChange);
    Communications.synth.addEventListener(
      'voiceschanged',
      this.handleVoicesChange
    );
  }

  componentWillUnmount() {
    SettingsStore.removeListener('change', this.handleSettingsStoreChange);
    Communications.synth.removeEventListener(
      'voiceschanged',
      this.handleVoicesChange
    );
  }

  handleSettingsStoreChange = () => {
    this.setState({});
  };

  handleNewPlaneIntervalChange = e => {
    SettingsStore.newPlaneInterval = +e.target.value;
    SettingsStore.emit('change');
  };

  handleRadarFontSizeChange = e => {
    SettingsStore.radarFontsize = +e.target.value;
    SettingsStore.emit('change');
  };

  handleSpeechVoiceChange = e => {
    SettingsStore.changeATCVoice(SettingsStore.voices.find(voice =>
      voice.name === e.target.value));
    SettingsStore.emit('change');
  };

  handleSpeechSynthesisSettingChange = e => {
    SettingsStore.speechsynthesis = e.target.checked;
    SettingsStore.emit('change');
  };

  handleSpeechRecognitionSettingChange = e => {
    SettingsStore.speechrecognition = e.target.checked;
    SettingsStore.emit('change');
  };

  handleVoicesChange = e => {
    SettingsStore.emit('change');
  };

  handlePitchChange = e => {
    SettingsStore.changePitch(+e.target.value);
    SettingsStore.emit('change');
  };

  handleRateChange = e => {
    SettingsStore.changeRate(+e.target.value);
    SettingsStore.emit('change');
  };

  handleSpeedChange = e => {
    SettingsStore.setSpeed(+e.target.value);
    SettingsStore.emit('change');
  };

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
      difficulty: e.target.value
    });
  };

  handleIlsPathColorChange(e) {
    SettingsStore.ilsPathColor = e.target.value;
    SettingsStore.emit('change');
  }

  handleToggleExpandClick = e => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleAppearanceExpanded = e => {
    this.setState({ appearanceExpanded: !this.state.appearanceExpanded });
  };

  handleChange = name => e => {
    SettingsStore[name] = e.target.value;
    SettingsStore.emit('change');
  };

  handleCheckboxChange = name => e => {
    SettingsStore[name] = !SettingsStore[name];
    SettingsStore.emit('change');
  };

  clearCaches = async () => {
    await wipeServiceWorkerCache();
    alert('Caches have been cleared. This does not affect your saves.');
  }

  render() {
    const atcVoiceName = SettingsStore.atcVoice;
    return (
      <div className="settings">
        <span>Game Speed</span>
        <div className="range-slider mb">
          <input
            className="range-slider__range"
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={SettingsStore.speed}
            onInput={this.handleSpeedChange}
          />
          <span class="range-slider__value">{SettingsStore.speed}x</span>
        </div>
        <div className="mb">
          <span>Difficulty:</span>
          <select
            value={this.state.difficulty}
            onInput={this.handleDifficultyChange}
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb SwitchInput">
          <span>General Aviation</span>
          <label class="switch">
            <input
              type="checkbox"
              onInput={this.handleCheckboxChange('ga')}
              checked={SettingsStore.ga}
            />
            <span class="slider" />
          </label>
        </div>
        <div className="mb SwitchInput">
          <span>Enroute Traffic</span>
          <label class="switch">
            <input
              type="checkbox"
              onInput={this.handleCheckboxChange('enroute')}
              checked={SettingsStore.enroute}
            />
            <span class="slider" />
          </label>
        </div>

        <button onClick={this.handleAppearanceExpanded}>
          {this.state.appearanceExpanded ? (
            <span>
              <FaCompress /> Hide appearance settings
            </span>
          ) : (
              <span>
                <FaExpand /> Show appearance settings{' '}
              </span>
            )}
        </button>
        <div
          style="border: 1px solid #1e606b; border-radius: 5px; padding: 5px;"
          className={this.state.appearanceExpanded ? null : 'hidden'}
        >
          <div className="mb SwitchInput">
            <span>Distance circle</span>
            <label class="switch">
              <input
                type="checkbox"
                onInput={this.handleCheckboxChange('distanceCircles')}
                checked={SettingsStore.distanceCircles}
              />
              <span class="slider" />
            </label>
          </div>
          <div className="takeoff-in-order mb SwitchInput">
            <span>Route visualization</span>
            <label class="switch">
              <input
                type="checkbox"
                onInput={this.handleCheckboxChange('routeVisualization')}
                checked={SettingsStore.routeVisualization}
              />
              <span class="slider" />
            </label>
          </div>
          <span>Radar font size:</span>
          <div className="fontsize-setting range-slider mb">
            <input
              className="range-slider__range"
              type="range"
              min="8"
              max="30"
              step="1"
              value={SettingsStore.radarFontsize}
              onInput={this.handleRadarFontSizeChange}
            />
            <span class="range-slider__value">
              {SettingsStore.radarFontsize} pixels
            </span>
          </div>
          <div className="mb ColorInput">
            <span>ILS indicator color:</span>
            <input
              type="color"
              value={SettingsStore.ilsPathColor}
              onInput={this.handleIlsPathColorChange}
            />
          </div>
          <div className="mb ColorInput">
            <span>Danger color:</span>
            <input
              type="color"
              value={SettingsStore.dangerColor}
              onInput={this.handleChange('dangerColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Background color:</span>
            <input
              type="color"
              value={SettingsStore.backgroundColor}
              onInput={this.handleChange('backgroundColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Foreground color:</span>
            <input
              type="color"
              value={SettingsStore.foregroundColor}
              onInput={this.handleChange('foregroundColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Radar color:</span>
            <input
              type="color"
              value={SettingsStore.radarColor}
              onInput={this.handleChange('radarColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Sid color:</span>
            <input
              type="color"
              value={SettingsStore.sidColor}
              onInput={this.handleChange('sidColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Star color:</span>
            <input
              type="color"
              value={SettingsStore.starColor}
              onInput={this.handleChange('starColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Inbound traffic color:</span>
            <input
              type="color"
              value={SettingsStore.inboundTrafficColor}
              onInput={this.handleChange('inboundTrafficColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Enroute traffic color:</span>
            <input
              type="color"
              value={SettingsStore.enrouteTrafficColor}
              onInput={this.handleChange('enrouteTrafficColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Outbound traffic color:</span>
            <input
              type="color"
              value={SettingsStore.outboundTrafficColor}
              onInput={this.handleChange('outboundTrafficColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>VFR traffic color:</span>
            <input
              type="color"
              value={SettingsStore.vfrTrafficColor}
              onInput={this.handleChange('vfrTrafficColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Path color:</span>
            <input
              type="color"
              value={SettingsStore.pathVisualizerColor}
              onInput={this.handleChange('pathVisualizerColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Climb color:</span>
            <input
              type="color"
              value={SettingsStore.climbColor}
              onInput={this.handleChange('climbColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>Descend color:</span>
            <input
              type="color"
              value={SettingsStore.descendColor}
              onInput={this.handleChange('descendColor')}
            />
          </div>
          <div className="mb ColorInput">
            <span>MSA color:</span>
            <input
              type="color"
              value={SettingsStore.msaColor}
              onInput={this.handleChange('msaColor')}
            />
          </div>
        </div>

        <button onClick={this.handleToggleExpandClick}>
          {this.state.expanded ? (
            <span>
              <FaCompress /> Hide advanced settings
            </span>
          ) : (
              <span>
                <FaExpand /> Show advanced settings{' '}
              </span>
            )}
        </button>
        <div
          style="border: 1px solid #1e606b; border-radius: 5px; padding: 5px;"
          className={this.state.expanded ? null : 'hidden'}
        >
          <div className="speechsynthesis-setting mb SwitchInput">
            <span>Speech synthesis</span>
            <label class="switch">
              <input
                type="checkbox"
                onInput={this.handleCheckboxChange('speechsynthesis')}
                checked={SettingsStore.speechsynthesis} />
              <span class="slider" />
            </label>
          </div>
          <div className={['speechsynthesis-voices-setting', 'mb',
            SettingsStore.speechsynthesis ? 'show' : 'hidden'].join(' ')}>
            <span>Speech synthesis voices</span>
            <select onInput={this.handleSpeechVoiceChange} value={atcVoiceName}>
              {SettingsStore.voices.map((voice, i) => {
                return (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} - {voice.lang}
                  </option>
                );
              })}
            </select>
          </div>
          <span>Pitch:</span>
          <div className="speechsynthesis-pitch-setting range-slider mb">
            <input
              className="range-slider__range"
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={SettingsStore.pitch}
              onInput={this.handlePitchChange}
            />
            <span class="range-slider__value">{SettingsStore.pitch}x</span>
          </div>
          <span>Rate:</span>
          <div className="speechsynthesis-rate-setting range-slider mb">
            <input
              className="range-slider__range"
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={SettingsStore.rate}
              onInput={this.handleRateChange}
            />
            <span class="range-slider__value">{SettingsStore.rate}x</span>
          </div>
          {/* <div className="mb">
          <span>Speech Recognition</span>
          <label class="switch">
            <input type="checkbox" onInput={this.handleSpeechRecognitionSettingChange} checked={SettingsStore.speechrecognition} />
            <span class="slider"></span>
          </label>
        </div> */}
          {SettingsStore.stopSpawn ? null : (
            <div>
              <span>Spawn plane interval:</span>
              <div className="range-slider mb">
                <input
                  className="range-slider__range"
                  type="range"
                  min="10"
                  max="400"
                  step="10"
                  value={SettingsStore.newPlaneInterval}
                  onInput={this.handleNewPlaneIntervalChange}
                />
                <span class="range-slider__value">
                  {SettingsStore.newPlaneInterval} seconds
                </span>
              </div>
            </div>
          )}
          <div>
            <div className="mb SwitchInput">
              <span>Stop planes spawning</span>
              <label class="switch">
                <input
                  type="checkbox"
                  onInput={this.handleCheckboxChange('stopSpawn')}
                  checked={SettingsStore.stopSpawn}
                />
                <span class="slider" />
              </label>
            </div>
            <div className="mb SwitchInput">
              <span>Go-arounds</span>
              <label class="switch">
                <input
                  type="checkbox"
                  onInput={this.handleCheckboxChange('goArounds')}
                  checked={SettingsStore.goArounds}
                />
                <span class="slider" />
              </label>
            </div>
            <div className="takeoff-in-order mb SwitchInput">
              <span>Takeoff in order</span>
              <label class="switch">
                <input
                  type="checkbox"
                  onInput={this.handleCheckboxChange('takeoffInOrder')}
                  checked={SettingsStore.takeoffInOrder}
                />
                <span class="slider" />
              </label>
            </div>
            <div
              className="mb SwitchInput"
              title="Use millibars instead of inches of mercury for the airport altimeter"
            >
              <span>Millibars</span>
              <label class="switch">
                <input
                  type="checkbox"
                  onInput={this.handleCheckboxChange('millibars')}
                  checked={SettingsStore.millibars}
                />
                <span class="slider" />
              </label>
            </div>
            <div className="mb SwitchInput">
              <span>Sids/Stars</span>
              <label class="switch">
                <input
                  type="checkbox"
                  onInput={this.handleCheckboxChange('sidsStars')}
                  checked={SettingsStore.sidsStars}
                />
                <span class="slider" />
              </label>
            </div>
            <div className="mb SwitchInput">
              <span>Text commands</span>
              <label class="switch">
                <input
                  type="checkbox"
                  onInput={this.handleCheckboxChange('useTextCmd')}
                  checked={SettingsStore.useTextCmd}
                />
                <span class="slider" />
              </label>
            </div>
            <div className="mb">
              <button onClick={this.clearCaches} class="button">Clear Caches</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
