export const routeTypes = {
  INBOUND: 0,
  OUTBOUND: 1,
  ENROUTE: 2,
  0: 'inbound',
  1: 'outbound',
  2: 'enroute',
}

export const airplanes = [
  {
    id: 0,
    ceiling: 37,
    name: 'Boeing 737',
    shortName: 'B737',
    topSpeed: 320,
    landingSpeed: 140,
    minSpeed: 160,
    turningRate: [2, 3, 5],
    operators: [0, 1, 2],
  },
  {
    id: 1,
    name: 'Boeing 747',
    shortName: 'B747',
    topSpeed: 330,
    landingSpeed: 145,
    minSpeed: 180,
    turningRate: [2, 3, 4],
    ceiling: 41,
    operators: [0, 1, 2],
  }
];

export const operators = [
  {
    id: 0,
    name: 'KLM',
    shortName: 'KLM',
    callsign: 'KLM',
    color: '#00a1e4'
  }, {
    id: 1,
    name: 'Delta Airlines',
    callsign: 'DLT',
    shortName: 'Delta',
    color: '#003a70'
  }, {
    id: 2,
    name: 'JetBlue',
    callsign: 'JBU',
    shortName: 'JetBlue',
    color: '#003876'
  }, {
    id: 3,
    name: 'United Airlines',
    callsign: 'UAL',
    shortName: 'United',
    color: '#005DAA'
  }
];

export const airplanesById = Object.assign({}, ...airplanes.map(x => ({[x.id]: x})));

export const operatorsById = Object.assign({}, ...operators.map(x => ({[x.id]: x})));

