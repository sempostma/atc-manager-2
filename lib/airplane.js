import { airplanes, routeTypes, airplanesById } from './airplane-library/airplane-library';

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
    this.textRotation = 0;
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

  static create(x, y, heading, routeType) {
    let airplane = airplanes[Math.floor(Math.random() * airplanes.length)];
    let operatorId = airplane.operators.length > 0 
      ? airplane.operators[Math.floor(Math.random() * airplane.operators.length)]
      : null;
    let speed = airplane.topSpeed;
    let altitudeThousands = Math.floor(airplane.ceiling * .5 - Math.random() * airplane.ceiling * .2);
    let altitude = ((altitudeThousands % 2 === 0) === (heading < 180) ? altitudeThousands - 1 : altitudeThousands) * 1000;
    if (altitude < 10000) speed = Math.min(250, speed);
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
    airplane.outboundWaypoint = outboundWaypoint;
    return airplane;
  }

  static createEnroute(x, y, heading, outboundWaypoint) {
    let airplane = Airplane.create(x, y, heading, routeTypes.ENROUTE);
    airplane.outboundWaypoint = outboundWaypoint;
    return airplane;
  }

}


