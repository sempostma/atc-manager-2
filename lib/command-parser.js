import Airplane from './airplane';
import communications from './communications';
import {
  allowedVFRStates,
  VFRStates,
  airplanesById
} from './airplane-library/airplane-library';

const mkCmd = (oldCmd, newCmd) => {
  Object.assign(oldCmd, newCmd);
  return oldCmd;
};

const cmds = {
  turn: {
    regex: /(turn|hdg)( left| right)?( heading)? ([0-9]{1,3})/i,
    action: (cmd, [turn, direction, heading, deg]) =>
      mkCmd(cmd, { heading: +deg % 360 })
  },
  altitude: {
    regex: /(climb|descend|alt)( and)?( maintain)? (FL ?[0-9]{1,3}|[0-9]{1,6})/i,
    action: (cmd, [climbDescend, and, maintain, altitude]) => {
      if (altitude.startsWith('FL'))
        altitude = +altitude.replace('FL', '').trim() * 100;
      else altitude = +altitude;
      altitude = Math.max(2000, Math.min(cmd.tgt.altitude, altitude));
      return mkCmd(cmd, { altitude });
    }
  },
  direct: {
    regex: /(direct|dct)( to)? ([a-z0-9]{2,5})/i,
    action: (cmd, [dct, to, id]) => {
      return mkCmd(cmd, { direction: id.toUpperCase(), directionOld: false });
    }
  },
  goAround: {
    regex: /go ?around/i,
    action: cmd => {
      if (Airplane.isVFR(cmd.tgt)) {
        return mkCmd(cmd, { goAroundVFR: true });
      } else {
        return mkCmd(cmd, { goAround: true });
      }
    }
  },
  speed: {
    regex: /(reduce|increase) speed( to)? ([0-9]{1,3})/i,
    action: (cmd, [reduceIncrease, to, speed]) => {
      const model = airplanesById[cmd.tgt.typeId];
      const clampedSpd = Math.min(
        model.topSpeed,
        Math.max(model.minSpeed, +speed)
      );
      return mkCmd(cmd, { speed: clampedSpd });
    }
  },
  spd: {
    regex: /spd ([0-9]{1,3})/i,
    action: (cmd, [speed]) => {
      const model = airplanesById[cmd.tgt.typeId];
      const clampedSpd = Math.min(
        model.topSpeed,
        Math.max(model.minSpeed, +speed)
      );
      return mkCmd(cmd, { speed: clampedSpd });
    }
  },
  takeoff: {
    regex: /(clear for )?takeoff/i,
    action: cmd => {
      return mkCmd(cmd, { takeoff: true });
    }
  },
  tgtVfrState: {
    regex: /extend ([a-z]+)/i,
    action: (cmd, [direction]) => {
      const allowedStates = allowedVFRStates(cmd.tgt);
      const allowedStatesNames = allowedStates.map(x => ({
        val: x,
        name: VFRStates[x]
      }));
      const state = allowedStatesNames.find(
        state => state.name.indexOf(direction.toLowerCase()) !== -1
      );
      if (state) return mkCmd(cmd, { tgtVfrState: state.val });
      else return cmd;
    }
  }
};

export const parse = (traffic, text, oldCmd) => {
  text = text.toUpperCase();
  const split = text.split(' ');
  let callsign = split[0];
  let command = split.slice(1).join(' ');
  let airplane = traffic.find(
    t => callsign === communications.getCallsign(t, true)
  );
  if (!airplane) {
    airplane = oldCmd.tgt;
    command = split.join(' ');
  }
  if (!airplane) return null;
  const matchedCmd = Object.values(cmds).find(c => c.regex.test(command));
  if (!matchedCmd) return null;
  const cmd = {
    tgt: airplane,
    direction:
      typeof airplane.tgtDirection === 'string' ? airplane.tgtDirection : null,
    altitude: airplane.tgtAltitude,
    heading:
      typeof airplane.tgtDirection === 'number' ? airplane.tgtDirection : null,
    speed: airplane.tgtSpeed,
    tgtVfrState: airplane.tgtVfrState
  };
  const output = command.match(matchedCmd.regex);
  return matchedCmd.action(cmd, [...output.slice(1)]);
};
