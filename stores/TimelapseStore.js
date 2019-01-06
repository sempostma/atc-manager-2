import { EventEmitter } from 'events';
import { loadState, saveState, decimalFormatter } from '../lib/persistance';
import GameStore from './GameStore';
import { diff, clone } from 'jsondiffpatch';

let lastState = null;

const decFmt = decimalFormatter(0);

class TimelapseStore extends EventEmitter {
  constructor() {
    super();
    GameStore.on('update', this.handleGameStoreUpdate);
    this.timelapse = null;
    this.recording = false;
  }

  defaultTimelapseName = () =>
    `${GameStore.mapName} timelapse - ${new Date().toLocaleDateString()}`;

  handleGameStoreUpdate = () => {
    if (this.recording && this.timelapse) {
      const state = JSON.parse(JSON.stringify(GameStore.toJson(), decFmt));
      var delta = clone(diff(lastState, state));
      this.timelapse.patches.push(delta);
      lastState = state;
    }
    this.emit('change');
  };

  startTimelapse = () => {
    this.recording = true;
    const state = JSON.parse(JSON.stringify(GameStore.toJson(), decFmt));
    lastState = clone(state);
    this.timelapse = {
      start: state,
      patches: [],
      stats: null
    };
    this.emit('change');
  };

  stopTimelapse = () => {
    this.recording = false;
    lastState = null;
    this.timelapse.stats = {
      departures: GameStore.departures - this.timelapse.start.departures,
      arrivals: GameStore.arrivals - this.timelapse.start.arrivals,
      distanceVialations:
        GameStore.distanceVialations - this.timelapse.start.distanceVialations,
      enroutes: GameStore.enroutes - this.timelapse.start.enroutes,
      unpermittedDepartures:
        GameStore.unpermittedDepartures -
        this.timelapse.start.unpermittedDepartures
    };
    this.emit('change');
  };

  resetTimelapse = () => {
    this.recording = false;
    lastState = null;
    this.timelapse = null;
    this.emit('change');
  };
}

export default new TimelapseStore();
