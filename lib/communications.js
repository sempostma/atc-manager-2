import { EventEmitter } from 'events';
import {
  operatorsById,
  VFRStates,
  routeTypes
} from './airplane-library/airplane-library';
import { angleDelta, idType } from './map';
import Airplane from './airplane';

class Communications extends EventEmitter {
  constructor() {
    super();
    this.synth =
      typeof window !== 'undefined'
        ? window.speechSynthesis
        : { addEventListener: () => { }, getVoices: () => [] };
    this.atcVoice = undefined;
    this.pitch = 1;
    this.rate = 1.1;
  }

  getCallsign(airplane, short) {
    const operator = operatorsById[airplane.operatorId];
    if (operator) {
      const model = Airplane.getModel(airplane);
      const cs =
        operator[short ? 'callsign' : 'shortName'] +
        (short ? '' : ' ') +
        airplane.flight;
      return (model.class === 'heavy' || model.class === 'super') &&
        !short
        ? cs + ' ' + model.class
        : cs;
    } else {
      if (short) {
        return airplane.regNum;
      } else {
        return airplane.regNum.replace(
          /[A-Z]/g,
          match => natoAlphabet[match[0]] + ' '
        );
      }
    }
  }

  getCommandText(cmd, winddir, windspd, map, callsignsPos) {
    const airplane = cmd.tgt;
    const model = Airplane.getModel(airplane);
    let txt = [];
    const winddirtxt = winddir.toFixed(0);
    const windspdtxt = windspd.toFixed(0);
    if (cmd.takeoff && cmd.tgt.rwy) {
      if (cmd.tgt.routeType === routeTypes.VFR_OUTBOUND) {
        txt.push(
          `takeoff runway ${cmd.tgt.rwy}, the wind is ${windspdtxt} at ` +
          `${winddirtxt} knots, depart ${VFRStates[cmd.tgtVfrState]}`
        );
      } else if (Airplane.isVFR(cmd.tgt)) {
        txt.push(
          `takeoff runway ${cmd.tgt.rwy}, the wind is ${windspdtxt} at ` +
          `${winddirtxt} knots, remain in pattern`
        );
      } else {
        txt.push(
          `takeoff runway ${cmd.tgt.rwy}, the wind is ${windspdtxt} ` +
          `at ${winddirtxt} knots`
        );
      }
    }
    if (cmd.goAround) {
      txt.push(
        `go around, fly runway heading, climb to ${cmd.tgt.tgtAltitude}` +
        'await further instructions'
      );
    }
    if (cmd.goAroundVFR) {
      txt.push(`go around ${cmd.tgt.rwy}, remain in pattern`);
    }
    if (cmd.tgtVfrState !== undefined && !cmd.takeoff) {
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

    if (
      cmd.direction !== undefined &&
      cmd.direction !== cmd.tgt.tgtDirection &&
      csPos &&
      csPos.ref
    ) {
      if (csPos.ref.type === idType.RWY) {
        if (model.class === 'light' || Math.random() > 0.95) {
          txt.push(
            `cleared visual approach runway ${cmd.direction}, ` +
            'maintain current heading until established.'
          );
        } else {
          txt.push(
            `cleared ils runway ${cmd.direction} approach, ` +
            'maintain current heading untill established.'
          );
        }
        // if (csPos.ref.type === idType.RWY) {
        //   txt.push(
        //     `clear to land runway ${cmd.direction}, ` +
        //       `the wind is ${winddirtxt} at ${windspdtxt} knots`
        //   );
      } else {
        txt.push(`direct to ${cmd.direction}`);
      }
    } else if (
      typeof cmd.heading === 'number' &&
      cmd.heading !== cmd.tgt.tgtDirection
    ) {
      const tHdg = cmd.heading;
      const hdg = airplane.heading;

      txt.push(
        angleDelta(hdg, tHdg) > 0
          ? `turn right heading ${tHdg}`
          : `turn left heading ${tHdg}`
      );
    }
    if (
      cmd.altitude &&
      cmd.altitude !== cmd.tgt.tgtAltitude &&
      !Airplane.isVFR(cmd.tgt)
    ) {
      const tAlt =
        cmd.altitude > 18000
          ? `flight level ${Math.round(cmd.altitude / 100)} `
          : `${cmd.altitude} feet `;
      txt.push(
        cmd.altitude < airplane.altitude
          ? `descend and maintain ${tAlt}`
          : `climb and maintain ${tAlt}`
      );
    }
    if (cmd.speed && cmd.speed !== cmd.tgt.tgtSpeed) {
      txt.push(
        cmd.speed < airplane.speed
          ? `slow down to ${cmd.speed} knots`
          : `increase your airspeed to ${cmd.speed} knots`
      );
    }

    if (txt.length > 2) txt.splice(txt.length - 1, 0, 'and');
    txt = txt.join(' ').trim();
    return txt;
  }

  speak(txt) {
    var utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.voice = this.atcVoice;
    utterThis.pitch = this.pitch;
    utterThis.rate = this.rate;
    utterThis.onerror = console.warn;
    this.synth.speak(utterThis);
  }
}

export const codeToNato = code => {
  const result = [];
  const chars = code.split('');
  for (const char of chars) {
    const u = char.toUpperCase();
    if (u in natoAlphabet) {
      result.push(natoAlphabet[u] + ' ');
    }
    else {
      result.push(char);
    }
  }
  return result.join('');
};

export const natoAlphabet = {
  A: 'Alfa',
  B: 'Bravo',
  C: 'Charlie',
  D: 'Delta',
  E: 'Echo',
  F: 'Foxtrot',
  G: 'Golf',
  H: 'Hotel',
  I: 'India',
  J: 'Juliett',
  K: 'Kilo',
  L: 'Lima',
  M: 'Mike',
  N: 'November',
  O: 'Oscar',
  P: 'Papa',
  Q: 'Quebec',
  R: 'Romeo',
  S: 'Sierra',
  T: 'Tango',
  U: 'Uniform',
  V: 'Victor',
  W: 'Whiskey',
  X: 'X-ray',
  Y: 'Yankee',
  Z: 'Zulu'
};

export default new Communications();
