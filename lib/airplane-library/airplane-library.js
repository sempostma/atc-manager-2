import { loadState } from '../persistance';
import defAirplanes from './default-airplanes';
import defOperators from './default-operators';

export const routeTypes = {
  INBOUND: 0,
  OUTBOUND: 1,
  ENROUTE: 2,
  VFR_CLOSED_PATTERN: 3,
  VFR_CLOSED_PATTERN_TG: 4,
  VFR_OUTBOUND: 5,
  VFR_INBOUND: 6,
  VFR_INBOUND_TG: 7,
  0: 'inbound',
  1: 'outbound',
  2: 'enroute',
};

export const defaultAirplanes = defAirplanes;
export const defaultOperators = defOperators;

let airplanesArr = [];
let operatorsArr = [];

export let airplanesById;
export let operatorsById;
export let airplanes;
export let operators;

export let refresh = () => {
  if (typeof window !== undefined) {
    const customAirplanes = loadState().customAirplanes || [];
    airplanesArr = defaultAirplanes.slice().concat(customAirplanes);

    const customOperators = loadState().customOperators || [];
    operatorsArr = defaultOperators.slice().concat(customOperators);
  }

  airplanesById = Object.assign({}, ...airplanesArr.map(x => ({ [x.id]: x })));

  operatorsById = Object.assign({}, ...operatorsArr.map(x => ({ [x.id]: x })));

  airplanes = Object.values(airplanesById);

  operators = Object.values(operatorsById);
};

refresh();

