import { EventEmitter } from 'events';
import { operatorsById, VFRStates, routeTypes } from './airplane-library/airplane-library';
import { angleDelta, idType } from './map';
import Airplane from './airplane';

class Communications extends EventEmitter {
  constructor() {
    super();
    this.synth = typeof window !== 'undefined'
      ? window.speechSynthesis
      : { addEventListener: () => { }, getVoices: () => [] };
    this.voice = undefined;
    this.pitch = 1;
    this.rate = 1.1;
  }

  getCallsign(airplane, short) {
    const operator = operatorsById[airplane.operatorId];
    if (operator) {
      const cs = operator[short ? 'callsign' : 'shortName']
        + (short ? '' : ' ')
        + airplane.flight;
      return (airplane.class === 'heavy' || airplane.class === 'super') && !short
        ? cs + ' ' + airplane.class
        : cs;
    } else {
      if (short) {
        return airplane.regNum;
      } else {
        return airplane.regNum.replace(/[A-Z]/g, match => natoAlphabet[match[0]] + ' ');
      }
    }
  }

  getCommandText(cmd, winddir, windspd, map, callsignsPos) {
    const airplane = cmd.tgt;
    let txt = [];
    const winddirtxt = winddir.toFixed(0);
    const windspdtxt = windspd.toFixed(0);
    if (cmd.takeoff && cmd.tgt.rwy) {
      if (cmd.tgt.routeType === routeTypes.VFR_OUTBOUND) {
        txt.push(`takeoff runway ${cmd.tgt.rwy}, the wind is ${windspdtxt} at `
          + `${winddirtxt} knots, depart ${VFRStates[cmd.tgtVfrState]}`);
      } else if (Airplane.isVFR(cmd.tgt)) {
        txt.push(`takeoff runway ${cmd.tgt.rwy}, the wind is ${windspdtxt} at `
          + `${winddirtxt} knots, remain in pattern`);
      } else {
        txt.push(`takeoff runway ${cmd.tgt.rwy}, the wind is ${windspdtxt} `
          + `at ${winddirtxt} knots`);
      }
    }
    if (cmd.goAround) {
      txt.push(`go around ${cmd.tgt.rwy}, fly runway heading, `
        + 'await further instructions');
    }
    if (cmd.goAroundVFR) {
      txt.push(`go around ${cmd.tgt.rwy}, remain in pattern`);
    }
    if (cmd.tgtVfrState !== undefined && (!cmd.takeoff)) {
      if (cmd.tgtVfrState === VFRStates.FINAL) {
        txt.push(`cleared for final runway ${cmd.tgt.tgtDirection}`);
      } else if (cmd.tgtVfrState === VFRStates.RWY) {
        txt.push(`cleared for runway ${cmd.tgt.tgtDirection}`);
      } else if (cmd.tgtVfrState === VFRStates.EXIT_45_DEG_OUT) {
        txt.push(`depart 45 degrees out runway ${cmd.tgt.rwy}`);
      } else if (cmd.tgtVfrState === VFRStates.STRAIGHT_OUT) {
        txt.push(`depart straight out runway ${cmd.tgt.rwy}`);
      } else if (cmd.tgtVfrState === VFRStates.STRAIGHT_IN) {
        txt.push(`straight in runway ${cmd.tgt.tgtDirection}`);
      } else {
        txt.push(`extend ${VFRStates[cmd.tgtVfrState]}`);
      }
    }
    const csPos = callsignsPos[cmd.direction];

    if (cmd.direction !== undefined
      && cmd.direction !== cmd.tgt.tgtDirection
      && csPos
      && csPos.ref) {
      if (csPos.ref.type === idType.RWY) {

        txt.push(`clear to land runway ${cmd.direction}, `
          + `the wind is ${winddirtxt} at ${windspdtxt} knots`);
      } else {
        txt.push(`direct to ${cmd.direction}`);
      }
    }
    else if (typeof cmd.heading === 'number'
      && cmd.heading !== cmd.tgt.tgtDirection) {

      const tHdg = cmd.heading;
      const hdg = airplane.heading;

      txt.push(angleDelta(hdg, tHdg) > 0
        ? `turn right heading ${tHdg}`
        : `turn left heading ${tHdg}`);
    }
    if (cmd.altitude
      && cmd.altitude !== cmd.tgt.tgtAltitude
      && !Airplane.isVFR(cmd.tgt)) {

      const tAlt = cmd.altitude > 18000
        ? `flight level ${Math.round(cmd.altitude / 100)} `
        : `${cmd.altitude} feet `;
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

export const natoAlphabet = {
  'A': 'Alfa',
  'B': 'Bravo',
  'C': 'Charlie',
  'D': 'Delta',
  'E': 'Echo',
  'F': 'Foxtrot',
  'G': 'Golf',
  'H': 'Hotel',
  'I': 'India',
  'J': 'Juliett',
  'K': 'Kilo',
  'L': 'Lima',
  'M': 'Mike',
  'N': 'November',
  'O': 'Oscar',
  'P': 'Papa',
  'Q': 'Quebec',
  'R': 'Romeo',
  'S': 'Sierra',
  'T': 'Tango',
  'U': 'Uniform',
  'V': 'Victor',
  'W': 'Whiskey',
  'X': 'X-ray',
  'Y': 'Yankee',
  'Z': 'Zulu'
};

export default new Communications();
