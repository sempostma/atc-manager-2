import GameStore from "../GameStore";

const oneMileByThreeMileRuleDistance = Math.pow(
  config.oneMileRuleDistance / config.threeMileRuleDistance,
  2
);

const runwayParrelelSepRuleDistanceByThreeMileRuleDistance = Math.pow(
  config.runwayParrelelSepRuleDistance / config.threeMileRuleDistance,
  2
);

import config from '../../lib/config';

export const minimumSeperationDistance = airplane => {
  const cs = GameStore.callsignsPos[airplane.tgtDirection];
  const isLandingOrApproaching =
    cs &&
    cs.ref.type === idType.RWY &&
    airplane.routeType === routeTypes.INBOUND;
  const isLowAltitude = airplane.altitude < 2000 + GameStore.airport.elevation;
  const minDistance = isLandingOrApproaching || isLowAltitude 
    ? runwayParrelelSepRuleDistanceByThreeMileRuleDistance
    : oneMileByThreeMileRuleDistance;
  return minDistance;
}