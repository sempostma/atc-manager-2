import { EventEmitter } from 'events';
import Airplane from '../lib/airplane';
import config from '../lib/config';
import Communications from '../lib/communications';

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
    this.distanceCircleColor = '#009000';
    this.ilsPathLength = 250;
    this.ilsPathColor = '#ffffbb';
    this.ilsDashInterval = [20, 30];
    this.sepVialationCircleColor = '#ff0000';
    this.newPlaneInterval = 100;
    this.startingInboundPlanes = 3;
    this.startingOutboundPlanes = 2;


    this.changePitch = this.changePitch.bind(this);
    this.changeRate = this.changeRate.bind(this);
    this.changeVoice = this.changeVoice.bind(this);
    this.handleVoicesChange = this.handleVoicesChange.bind(this);
    Communications.synth.addEventListener('voiceschanged', this.handleVoicesChange);
  }

  handleVoicesChange() {
    this.voices = Communications.synth.getVoices();
    if (Communications.voice === undefined) {
      this.voice = this.voices[0];
      Communications.voice = this.voice;
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
}


export default new SettingsStore();
