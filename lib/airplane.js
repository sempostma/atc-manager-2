import { airplanes, routeTypes } from './airplane-library';

let counter = 0;
const flightNums = [];
for (let i = 0; i < 1900; i++) flightNums[i] = i;
flightNums.sort(() => Math.random() - .5);

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
  }

  static create(x, y, heading, routeType) {
    let airplane = airplanes[Math.floor(Math.random() * airplanes.length)];
    let operatorId = airplane.operators[Math.floor(Math.random() * airplane.operators.length)];
    let speed = airplane.topSpeed;
    let altitudeThousands = Math.floor(airplane.ceiling * .5 - Math.random() * airplane.ceiling * .2);
    let altitude = ((altitudeThousands % 2 === 0) === (heading < 180) ? altitudeThousands - 1 : altitudeThousands) * 1000;
    let flight = flightNums[counter++];
    counter %= 1950;
    let typeId = airplane.id;
    return new Airplane(speed, altitude, heading, x, y, operatorId, flight, typeId, routeType);
  }

  static createOutbound(x, y, heading, rwy, outboundWaypoint) {
    let airplane = Airplane.create(x, y, heading, routeTypes.OUTBOUND);
    airplane.altitude = 0;
    airplane.speed = 0;
    airplane.outboundRwy = rwy;
    airplane.outboundWaypoint = outboundWaypoint
    return airplane;
  }
}


