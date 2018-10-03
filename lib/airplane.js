import { airplanes, routeTypes, airplanesById, VFRStates } from './airplane-library/airplane-library';
import config from './config';

let counter = 0;
const flightNums = [];
for (let i = 0; i < 1900; i++) flightNums[i] = i;
flightNums.sort(() => Math.random() - .5);

const rndNum = () => Math.floor(Math.random() * 10);
const rndLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
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

export default class Airplane {
  constructor(speed, altitude, heading, x, y, operatorId, flight, typeId, routeType) {
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
    this.textRotation = 0;
    this.dirty = true;
  }

  static getTurningRate = airplane => {
    const model = airplanesById[airplane.typeId];
    const turningRate = model.turningRate;

    if (airplane.speed <= model.minSpeed)
      return turningRate[0];
    else if (airplane.speed <= 250)
      return turningRate[0] + (airplane.speed - model.minSpeed) / (250 - model.minSpeed) * (turningRate[1] - turningRate[0]);
    else
      return turningRate[1] + (airplane.speed - 250) / (model.topSpeed - 250) * (turningRate[2] - turningRate[1]);
  }

  static create(x, y, heading, routeType, ga) {
    const possiblePlanes = airplanes.filter(ap => ga ? ap.ga > 0 : ap.commercial > 0); // TODO ga/comm sorting based on rarity
    let airplane = possiblePlanes[Math.floor(Math.random() * possiblePlanes.length)];
    let operatorId = airplane.operators.length > 0
      ? airplane.operators[Math.floor(Math.random() * airplane.operators.length)]
      : null;
    let speed = airplane.topSpeed;
    let altitudeThousands = Math.floor(airplane.ceiling * .5 - Math.random() * airplane.ceiling * .2);
    let altitude = ((altitudeThousands % 2 === 0) === (heading < 180) ? altitudeThousands - 1 : altitudeThousands) * 1000;
    if (altitude < 10000) speed = Math.min(250, speed);
    let flight; 
    if (ga) {
      flight = null;
    } else {
      flight = flightNums[counter++];
      counter %= 1950;
    }
    let typeId = airplane.id;
    return new Airplane(speed, altitude, heading, x, y, operatorId, flight, typeId, routeType);
  }

  static createOutbound(x, y, heading, rwy, outboundWaypoint) {
    let airplane = Airplane.create(x, y, heading, routeTypes.OUTBOUND);
    airplane.altitude = 0;
    airplane.speed = 0;
    airplane.dirty = false;
    airplane.rwy = rwy;
    airplane.outboundWaypoint = outboundWaypoint;
    airplane.waiting = true;
    return airplane;
  }

  static createVFROutbound(x, y, heading, rwy, outboundWaypoint) {
    let airplane = Airplane.create(x, y, heading, routeTypes.VFR_OUTBOUND, true);
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
    return airplane;
  }

  static createEnroute(x, y, heading, outboundWaypoint) {
    let airplane = Airplane.create(x, y, heading, routeTypes.ENROUTE);
    airplane.outboundWaypoint = outboundWaypoint;
    return airplane;
  }

  static createVFRClosedPattern(x, y, heading, rwy, touchandgo) {
    let airplane = Airplane.create(x, y, heading, touchandgo ? routeTypes.VFR_CLOSED_PATTERN_TG : routeTypes.VFR_CLOSED_PATTERN, true);
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
    if (touchandgo) airplane.tgs = Math.floor(Math.random()) * (config.maxTouchAndGos - 1) + 1;
    return airplane;
  }

  static createVFREnroute(x, y, heading, outboundWaypoint) {
    let airplane = Airplane.create(x, y, heading, routeTypes.VFR_ENROUTE, true);
    airplane.altitude = airplane.tgtAltitude = Math.floor(Math.random() * 3 + 2) * 1000;
    airplane.regNum = regNums[regNumCounter++];
    airplane.outboundWaypoint = airplane.tgtDirection = outboundWaypoint;
    airplane.tgtVfrState = VFRStates.OWN_DISCRETION;
    return airplane;
  }

  static createVFRInbound(x, y, heading, touchandgo) {
    let airplane = Airplane.create(x, y, heading, touchandgo ? routeTypes.VFR_INBOUND_TG : routeTypes.VFR_INBOUND, true);
    airplane.altitude = airplane.tgtAltitude = Math.floor(Math.random() * 3 + 2) * 1000;
    airplane.regNum = regNums[regNumCounter++];
    airplane.tgtVfrState = VFRStates.RWY;
    regNumCounter %= 2000;
    if (touchandgo) airplane.tgs = Math.floor(Math.random()) * (config.maxTouchAndGos - 1) + 1;
    return airplane;    
  }

  static isVFR(airplane) {
    return airplane.tgtVfrState !== undefined && routeTypes[airplane.routeType].startsWith('vfr');
  }
}


