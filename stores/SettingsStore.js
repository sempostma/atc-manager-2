import { EventEmitter } from 'events';
import Communications from '../lib/communications';
import { loadState, saveState } from '../lib/persistance';

class SettingsStore extends EventEmitter {
  constructor() {
    super();
    this.speechsynthesis = false;
    this.speechrecognition = false;
    this.voices = Communications.synth.getVoices();
    this.rate = Communications.rate;
    this.voice = Communications.voice;
    this.pitch = Communications.pitch;
    this.speed = 1;
    this.distanceCircles = true;
    this.distanceCirclesDistance = 200;
    this.distanceCirclesAmount = 5;
    this.distanceCircleColor = '#8aa8ad';
    this.ilsPathLength = 250;
    this.ilsPathColor = '#8aa8ad';
    this.ilsDashInterval = [20, 30];
    this.sepVialationCircleColor = '#ff0000';
    this.newPlaneInterval = 100;
    this.startingInboundPlanes = 3;
    this.startingOutboundPlanes = 2;
    this.startingEnroutePlanes = 1;
    this.radarFontsize = 14;
    this.ga = false;
    this.enroute = false;
    this.takeoffInOrder = false;
    this.defaultSettings = JSON.parse(this.toJson());

    const persistedSettings = loadState().settings;
    if (persistedSettings) {
      Object.keys(persistedSettings).forEach(key => {
        if (!isNullOrUndefined(persistedSettings[key])) 
          this[key] = persistedSettings[key];
      });
    }

    this.addListener('change', () => {
      this.persist();
    });

    this.changePitch = this.changePitch.bind(this);
    this.changeRate = this.changeRate.bind(this);
    this.changeVoice = this.changeVoice.bind(this);
    this.handleVoicesChange = this.handleVoicesChange.bind(this);
    Communications.synth.addEventListener('voiceschanged', this.handleVoicesChange);
  }

  persist = () => {
    const state = loadState();
    const settings = JSON.parse(this.toJson());
    Object.keys(settings).forEach(key => {
      if (JSON.stringify(settings[key]) === JSON.stringify(this.defaultSettings[key])) delete settings[key];
    });

    state.settings = settings;
    saveState(state);
  }

  handleVoicesChange() {
    this.voices = Communications.synth.getVoices();
    if (Communications.voice === undefined) {
      this.voice = Communications.voice = this.voices[0];
    }
  }

  changePitch(pitch) {
    Communications.pitch = pitch;
    this.pitch = pitch;
    this.emit('change');
  }

  changeRate(rate) {
    Communications.rate = rate;
    this.rate = rate;
    this.emit('change');
  }

  changeVoice(voice) {
    Communications.voice = voice;
    this.voice = voice;
    this.emit('change');
  }

  setSpeed(speed) {
    this.speed = speed;
    this.emit('change');
  }

  toJson = () => {
    return JSON.stringify(this,
      ['distanceCircles', 'distanceCirclesDistance', 'takeoffInOrder',
        'distanceCirclesAmount', 'radarFontsize', 'distanceCircleColor', 'ilsPathLength', 'ilsPathColor', 'ilsDashInterval', 
        'startingEnroutePlanes', 'sepVialationCircleColor', 'ga', 'enroute'], 4);
  }
}

const isNullOrUndefined = val => val === undefined && val === null;

export default new SettingsStore();


