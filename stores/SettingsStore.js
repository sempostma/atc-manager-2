import { EventEmitter } from 'events';
import Communications from '../lib/communications';
import { loadState, saveState } from '../lib/persistance';

class SettingsStore extends EventEmitter {
  constructor() {
    super();
    this.speechsynthesis = false;
    this.speechrecognition = false;
    this.voices = Communications.synth.getVoices()
      .filter(x => x.lang.startsWith('en'));
    this.backgroundColor = '#1e606b';
    this.radarColor = '#194850';
    this.foregroundColor = '#ffffff';
    this.fontColor = '#ffffff';
    this.sidColor = '#a5742a';
    this.starColor = '#1e29eb';
    this.msaColor = '#a5742a';
    this.pathVisualizerColor = '#a5742a';
    this.inboundTrafficColor = '#bbbbff';
    this.outboundTrafficColor = '#bbffbb';
    this.enrouteTrafficColor = '#ffffbb';
    this.vfrTrafficColor = '#c28750';
    this.dangerColor = '#ff0000';
    this.descendColor = '#ff0000';
    this.millibars = false;
    this.climbColor = '#00ff00';
    this.rate = Communications.rate;
    this.voice = Communications.voice;
    this.pitch = Communications.pitch;
    this.speed = 1;
    this.distanceCircles = true;
    this.distanceCirclesDistance = 200;
    this.distanceCirclesAmount = 5;
    this.sidsStars = false;
    this.routeVisualization = false;
    this.ilsPathLength = 250;
    this.ilsPathColor = '#8aa8ad';
    this.ilsDashInterval = [20, 30];
    this.useTextCmd = false;
    this.newPlaneInterval = 100;
    this.startingInboundPlanes = 3;
    this.startingOutboundPlanes = 2;
    this.startingEnroutePlanes = 1;
    this.radarFontsize = 14;
    this.ga = false;
    this.enroute = false;
    this.takeoffInOrder = false;
    this.goArounds = false;
    this.stopSpawn = false;
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
      if (JSON.stringify(settings[key]) === JSON.stringify(this.defaultSettings[key])) {
        delete settings[key];
      }
    });

    state.settings = settings;
    saveState(state);
  }

  handleVoicesChange() {
    this.voices = Communications.synth.getVoices()
      .filter(x => x.lang.startsWith('en'));
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
      [
        'distanceCircles', 
        'distanceCirclesDistance', 
        'takeoffInOrder',
        'useTextCmd', 
        'goArounds', 
        'stopSpawn', 
        'distanceCirclesAmount',
        'radarFontsize', 
        'distanceCircleColor', 
        'ilsPathLength', 'ilsPathColor',
        'ilsDashInterval', 
        'sepVialationCircleColor', 
        'ga', 
        'enroute',
        'sidsStars', 
        'routeVisualization', 
        'backgroundColor',
        'radarColor',
        'foregroundColor',
        'fontColor',
        'sidColor',
        'starColor',
        'msaColor',
        'pathVisualizerColor',
        'inboundTrafficColor',
        'outboundTrafficColor',
        'enrouteTrafficColor',
        'millibars',
        'vfrTrafficColor',
        'dangerColor',
        'descendColor',
        'climbColor',
      ], 4);
  }
}

const isNullOrUndefined = val => val === undefined && val === null;

export default new SettingsStore();


