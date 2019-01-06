import {
  routeTypes,
  airplanesById,
  VFRStates,
  rndModel,
  rndOperator,
  rndModelWithEnoughRwyLen
} from './airplane-library/airplane-library';
import config from './config';
import { EventEmitter } from 'events';
import { getMSABase, headingTo } from './map';
import { TakeoffRunwayAssignment } from './maps/runway-assignment';

let counter = 0;
const flightNums = [];
for (let i = 0; i < 1900; i++) flightNums[i] = i;
flightNums.sort(() => Math.random() - 0.5);

const rndNum = () => Math.floor(Math.random() * 10);
const rndLetter = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));
let regNumCounter = 0;
const t_obj = {};
for (let i = 0; i < 2000; i++) {
  let ret = '';
  do {
    ret = rndLetter() + rndLetter() + rndLetter() + rndNum() + rndNum();
  } while (t_obj[ret] === false);
  t_obj[ret] = true;
}
const regNums = Object.keys(t_obj);

const getMSABaseThousands = (msaBase, hdgFromAirportToPlane) => {
  const min = getMSABase(msaBase, hdgFromAirportToPlane);
  return Math.ceil(min / 1000) * 1000;
};

export const emitter = new EventEmitter();

const createAirplane = (x, y, heading, routeType, model, ga, map) => {
  let operatorId = model.operators.length > 0 ? rndOperator(model) : null;
  let speed = model.topSpeed;
  let altitudeThousands = Math.floor(
    model.ceiling * 0.5 - Math.random() * model.ceiling * 0.2
  );
  let altitude =
    ((altitudeThousands % 2 === 0) === heading < 180
      ? altitudeThousands - 1
      : altitudeThousands) * 1000;
  if (altitude < 10000) speed = Math.min(250, speed);
  let flight;
  if (ga) {
    flight = null;
  } else {
    flight = flightNums[counter++];
    counter %= 1950;
  }
  let typeId = model.id;
  return new Airplane(
    speed,
    altitude,
    heading,
    x,
    y,
    operatorId,
    flight,
    typeId,
    routeType
  );
};

const create = (x, y, heading, routeType, ga, map) => {
  let model = rndModelWithEnoughRwyLen(map.airport, ga);
  return createAirplane(x, y, heading, routeType, model, ga, map);
};

const headingToMiddle = (x, y) => {
  const hdgTo = headingTo(x, y, config.width / 2, config.height / 2);
  return Math.floor(hdgTo + 360) % 360;
};

const headingFromMiddle = (x, y) => {
  const hdgFrom = headingTo(config.width / 2, config.height / 2, x, y);
  Math.floor(hdgFrom + 360) % 360;
};

export default class Airplane {
  constructor(
    speed,
    altitude,
    heading,
    x,
    y,
    operatorId,
    flight,
    typeId,
    routeType
  ) {
    this.tgtAltitude = altitude;
    this.tgtDirection = heading;
    this.tgtSpeed = speed;
    this.operatorId = operatorId;
    this.speed = speed;
    this.altitude = altitude;
    this.heading = heading;
    this.x = x;
    this.y = y;
    this.flight = flight;
    this.path = [];
    this.typeId = typeId;
    this.routeType = routeType;
    this.textRotation = config.textRotation;
    this.dirty = undefined;
    this.rwy = undefined;
    this.outboundWaypoint = undefined;
    this.waiting = undefined;
    this.regNum = undefined;
    this.tgtVfrState = undefined;
    this.tgs = undefined;
    this.landing = undefined;
  }

  static create = (x, y, heading, routeType, ga, map) => {
    const airplane = create(x, y, heading, routeType, ga, map);

    emitter.emit('create', airplane);
    return airplane;
  };

  static getModel = airplane => {
    return airplanesById[airplane.typeId];
  }

  static getTurningRate = airplane => {
    const model = airplanesById[airplane.typeId];
    const turningRate = model.turningRate;

    if (airplane.speed <= model.minSpeed) {
      return turningRate[0];
    } else if (airplane.speed <= 250) {
      return (
        turningRate[0] +
        ((airplane.speed - model.minSpeed) / (250 - model.minSpeed)) *
        (turningRate[1] - turningRate[0])
      );
    } else {
      return (
        turningRate[1] +
        ((airplane.speed - 250) / (model.topSpeed - 250)) *
        (turningRate[2] - turningRate[1])
      );
    }
  };

  static createInbound(x, y, heading, map) {
    const airplane = Airplane.create(
      x,
      y,
      heading,
      routeTypes.INBOUND,
      false,
      map
    );

    const msaBaseThousands = getMSABaseThousands(
      map.msa.base,
      headingFromMiddle(x, y)
    );

    airplane.altitude = airplane.tgtAltitude = Math.max(
      airplane.altitude,
      msaBaseThousands
    );

    return airplane;
  }

  static createOutbound(takeoffRwyAssignment, outboundWaypoint, map) {
    const model = rndModelWithEnoughRwyLen(map.airport, false);
    const rwyAssignment = takeoffRwyAssignment.getMeta(model, false);
    const { rwy, heading, x, y, } = rwyAssignment;
    let airplane = createAirplane(x, y, heading, routeTypes.OUTBOUND, model, false, map);
    const wp = map.waypoints[outboundWaypoint];
    const hdgFromMid = headingFromMiddle(wp.x, wp.y);
    const msaBaseThousands = getMSABaseThousands(map.msa.base, hdgFromMid);
    airplane.tgtAltitude = Math.max(airplane.tgtAltitude, msaBaseThousands);
    airplane.altitude = 0;
    airplane.speed = 0;
    airplane.dirty = false;
    airplane.rwy = rwy;
    airplane.outboundWaypoint = outboundWaypoint;
    airplane.waiting = true;
    emitter.emit('create', airplane, rwyAssignment);
    return airplane;
  }

  static createVFROutbound(takeoffRwyAssignment, outboundWaypoint, map) {
    const model = rndModelWithEnoughRwyLen(map.airport, true);
    const rwyAssignment = takeoffRwyAssignment.getMeta(model, true);
    const { rwy, heading, x, y, } = rwyAssignment;
    let airplane = create(x, y, heading, routeTypes.VFR_OUTBOUND, true, map);
    const wp = map.waypoints[outboundWaypoint];
    const hdgFromMid = headingFromMiddle(wp.x, wp.y);
    const msaBaseThousands = getMSABaseThousands(map.msa.base, hdgFromMid);
    airplane.tgtAltitude = Math.max(airplane.tgtAltitude, msaBaseThousands);
    airplane.altitude = 0;
    airplane.speed = 0;
    airplane.dirty = false;
    airplane.rwy = rwy;
    airplane.tgtVfrState = VFRStates.STRAIGHT_OUT;
    airplane.outboundWaypoint = outboundWaypoint;
    airplane.regNum = regNums[regNumCounter++];
    airplane.tgtDirection = outboundWaypoint;
    regNumCounter %= 2000;
    airplane.waiting = true;
    emitter.emit('create', airplane, rwyAssignment);
    return airplane;
  }

  static createEnroute(x, y, heading, outboundWaypoint, map) {
    let airplane = create(x, y, heading, routeTypes.ENROUTE, false, map);

    const msaBaseThousands = getMSABaseThousands(
      map.msa.base,
      headingFromMiddle(x, y)
    );

    airplane.altitude = airplane.tgtAltitude = Math.max(
      airplane.altitude,
      msaBaseThousands
    );

    airplane.outboundWaypoint = outboundWaypoint;
    emitter.emit('create', airplane);
    return airplane;
  }

  static createVFRClosedPattern(x, y, heading, rwy, touchandgo, map) {
    const routeType = touchandgo
      ? routeTypes.VFR_CLOSED_PATTERN_TG
      : routeTypes.VFR_CLOSED_PATTERN;
    let airplane = create(x, y, heading, routeType, true, map);
    airplane.altitude = 0;
    airplane.speed = 0;
    airplane.dirty = false;
    airplane.rwy = rwy;
    airplane.tgtDirection = rwy;
    airplane.tgtAltitude = 1000;
    airplane.regNum = regNums[regNumCounter++];
    airplane.tgtVfrState = VFRStates.RWY;
    regNumCounter %= 2000;
    airplane.waiting = true;
    if (touchandgo) {
      const rnd = Math.random() * (config.maxTouchAndGos - 1);
      airplane.tgs = Math.floor(rnd) + 1;
    }
    emitter.emit('create', airplane);
    return airplane;
  }

  static createVFREnroute(x, y, heading, outboundWaypoint, map) {
    let airplane = create(x, y, heading, routeTypes.VFR_ENROUTE, true, map);

    const msaBaseThousands = getMSABaseThousands(
      map.msa.base,
      headingFromMiddle(x, y)
    );

    const alt = Math.floor(Math.random() * 3 + 2) * 1000;
    airplane.altitude = airplane.tgtAltitude = Math.max(alt, msaBaseThousands);
    airplane.regNum = regNums[regNumCounter++];
    airplane.outboundWaypoint = airplane.tgtDirection = outboundWaypoint;
    airplane.tgtVfrState = VFRStates.OWN_DISCRETION;
    emitter.emit('create', airplane);
    return airplane;
  }

  static createVFRInbound(x, y, heading, touchandgo, map) {
    const routeType = touchandgo
      ? routeTypes.VFR_INBOUND_TG
      : routeTypes.VFR_INBOUND;
    let airplane = create(x, y, heading, routeType, true, map);
    const alt = Math.floor(Math.random() * 3 + 2) * 1000;
    const msaBaseThousands = getMSABaseThousands(
      map.msa.base,
      headingFromMiddle(x, y)
    );

    airplane.altitude = airplane.tgtAltitude = Math.max(alt, msaBaseThousands);
    airplane.regNum = regNums[regNumCounter++];
    airplane.tgtVfrState = VFRStates.RWY;
    regNumCounter %= 2000;
    if (touchandgo) {
      const rnd = Math.random() * (config.maxTouchAndGos - 1);
      airplane.tgs = Math.floor(rnd) + 1;
    }
    emitter.emit('create', airplane);
    return airplane;
  }

  static remove(airplane) {
    emitter.emit('remove', airplane);
  }

  static isVFR(airplane) {
    return (
      airplane.tgtVfrState !== undefined &&
      routeTypes[airplane.routeType].startsWith('vfr')
    );
  }
}
