import { EventEmitter } from "events";
import { airplanesById, operatorsById } from "./airplane-library";

class Communications extends EventEmitter {
  constructor() {
    super();
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : { addEventListener: () => { }, getVoices: () => [] };
    this.voice = this.synth.getVoices()[0];
    this.pitch = 1;
    this.rate = 1.1;
  }

  getCallsign(airplane, short) { return [operatorsById[airplane.operatorId][short ? 'callsign' : 'shortName'] + (short ? '' : ' ') + airplane.flight]; }

  getCommandText(cmd, winddir, windspd) {
    const airplane = cmd.tgt;
    let txt = [];
    if (cmd.takeoff && cmd.tgt.outboundRwy) {
      txt.push(`takeoff runway ${cmd.tgt.outboundRwy}, the wind is ${winddir} at ${windspd} knots`);
    }
    if (cmd.direction) {
      if (cmd.direction !== cmd.tgt.tgtDirection)
        txt.push(`direct to ${cmd.direction}`);
    }
    else if (typeof cmd.heading === 'number' && cmd.heading !== cmd.tgt.tgtDirection) {
      const tHdg = cmd.heading;
      const hdg = airplane.heading;

      txt.push((tHdg - hdg) < -(hdg - tHdg)
        ? `turn left heading ${tHdg}`
        : `turn right heading ${tHdg}`);
    }
    if (cmd.altitude && cmd.altitude !== cmd.tgt.tgtAltitude) {
      const tAlt = cmd.altitude > 18000
        ? `flight level ${Math.round(cmd.altitude / 100)} `
        : `${cmd.altitude} feet `
      txt.push(cmd.altitude < airplane.altitude
        ? `descend and maintain ${tAlt}`
        : `climb and maintain ${tAlt}`);
    }
    if (cmd.speed && cmd.speed !== cmd.tgt.tgtSpeed) {
      txt.push(cmd.speed < airplane.speed
        ? `slow down to ${cmd.speed} knots`
        : `increase your airspeed to ${cmd.speed} knots`);
    }

    if (txt.length > 2) txt.splice(txt.length - 1, 0, 'and');
    txt = txt.join(' ').trim();
    return txt;
  }

  speak(txt) {
    var utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.voice = this.voice;
    utterThis.pitch = this.pitch;
    utterThis.rate = this.rate;
    utterThis.onerror = console.warn;
    this.synth.speak(utterThis);
  }
}

export default new Communications();
