import { loadState } from '../persistance';
import defAirplanes from './default-airplanes';
import defOperators from './default-operators';
import { longestRunway, longestRunwayLen } from '../map';

export const routeTypes = {
  INBOUND: 0,
  OUTBOUND: 1,
  ENROUTE: 2,
  VFR_CLOSED_PATTERN: 3,
  VFR_CLOSED_PATTERN_TG: 4,
  VFR_OUTBOUND: 5,
  VFR_INBOUND: 6,
  VFR_INBOUND_TG: 7,
  VFR_ENROUTE: 8,

  0: 'inbound',
  1: 'outbound',
  2: 'enroute',
  3: 'vfr closed pattern full stop',
  4: 'vfr closed pattern touch and go',
  5: 'vfr outbound',
  6: 'vfr inbound full stop',
  7: 'vfr inbound touch and go',
  8: 'vfr enroute'
};

export const VFRStates = {
  RWY: 0,
  UPWIND: 1,
  CROSSWIND: 2,
  DOWNWIND: 3,
  BASE: 4,
  FINAL: 5,

  STRAIGHT_OUT: 6,
  EXIT_45_DEG_OUT: 7,
  OWN_DISCRETION: 8,
  STRAIGHT_IN: 9,

  0: 'runway',
  1: 'upwind',
  2: 'crosswind',
  3: 'downwind',
  4: 'base',
  5: 'final',

  6: 'straight out',
  7: '45 deg out',
  8: 'own discretion',
  9: 'straight in'
};

export const allowedVFRStates = airplane => {
  const routeType = airplane.routeType;
  switch (routeType) {
    case routeTypes.VFR_CLOSED_PATTERN:
      return [
        VFRStates.RWY,
        VFRStates.UPWIND,
        VFRStates.CROSSWIND,
        VFRStates.DOWNWIND,
        VFRStates.BASE,
        VFRStates.FINAL
      ];
    case routeTypes.VFR_CLOSED_PATTERN_TG:
      return [
        VFRStates.RWY,
        VFRStates.UPWIND,
        VFRStates.CROSSWIND,
        VFRStates.DOWNWIND,
        VFRStates.BASE,
        VFRStates.FINAL
      ];
    case routeTypes.VFR_OUTBOUND:
      if (airplane.tgtVfrState === VFRStates.OWN_DISCRETION)
        return [VFRStates.OWN_DISCRETION];
      return [
        VFRStates.STRAIGHT_OUT,
        VFRStates.EXIT_45_DEG_OUT,
        VFRStates.OWN_DISCRETION
      ];
    case routeTypes.VFR_INBOUND:
      return [
        VFRStates.RWY,
        VFRStates.UPWIND,
        VFRStates.CROSSWIND,
        VFRStates.DOWNWIND,
        VFRStates.BASE,
        VFRStates.FINAL,
        VFRStates.STRAIGHT_IN
      ];
    case routeTypes.VFR_INBOUND_TG:
      return [
        VFRStates.RWY,
        VFRStates.UPWIND,
        VFRStates.CROSSWIND,
        VFRStates.DOWNWIND,
        VFRStates.BASE,
        VFRStates.FINAL,
        VFRStates.STRAIGHT_IN
      ];
    case routeTypes.VFR_ENROUTE:
      return [VFRStates.OWN_DISCRETION];
  }
};

export const defaultAirplanes = defAirplanes;
export const defaultOperators = defOperators;

let airplanesArr = [];
let operatorsArr = [];

export let airplanesById;
export let operatorsById;
export let airplanes;
export let operators;

export const rndModel = ga => {
  const aps = airplanes.filter(ap => (ga ? ap.ga > 0 : ap.commercial > 0));
  let counter = 0;
  const airplaneRatios = aps.map(plane => ({
    airplane: plane,
    count: (counter += plane.rarity)
  }));
  const max = airplaneRatios[airplaneRatios.length - 1].count;
  const rnd = Math.random() * max;
  for (let i = 0; i < airplaneRatios.length; i++) {
    if (rnd < airplaneRatios[i].count) return airplaneRatios[i].airplane;
  }
};

export const rndModelWithEnoughRwyLen = (mapAirport, ga) => {
  const longestRwyLen = longestRunwayLen(mapAirport);
  const aps = airplanes.filter(ap =>
    (ga ? ap.ga > 0 : ap.commercial > 0)
    && ap.takeoffMinRunwayLength <= longestRwyLen
    && mapAirport.blacklist.includes(ap.class) === false);
  let counter = 0;
  const airplaneRatios = aps.map(plane => ({
    airplane: plane,
    count: (counter += plane.rarity)
  }));
  const max = airplaneRatios[airplaneRatios.length - 1].count;
  const rnd = Math.random() * max;
  for (let i = 0; i < airplaneRatios.length; i++) {
    if (rnd < airplaneRatios[i].count) return airplaneRatios[i].airplane;
  }
};

export const rndOperator = airplane => {
  const operators = airplane.operators.map(op => operatorsById[op]);
  let counter = 0;
  const operatorRatios = operators.map(op => ({
    opid: op.id,
    count: (counter += op.rarity)
  }));
  const max = operatorRatios[operatorRatios.length - 1].count;
  const rnd = Math.random() * max;
  for (let i = 0; i < operatorRatios.length; i++) {
    if (rnd < operatorRatios[i].count) return operatorRatios[i].opid;
  }
};

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
