import { isNullOrUndefined } from 'util';
import { distSq } from './util';
import config from './config';
import Airplane from './airplane';
import { parrelelLinesDistance, headingTo } from './map';

export const isDirectionAHeading = dir => {
  return !Array.isArray(dir) && typeof dir !== 'string';
};

export const isDirectionDCT = dir => {
  return typeof dir === 'string' && dir.length > 0;
};

export const parseRoute = (txt, allowedCallsignsSet) => {
  const reg = /(\w+)(\/(\w+))?(@(\d+))?/i;
  const value = txt.split(/\s*[,\->]+\s*/);
  const valid = value.every(x => x.match(reg) !== null);
  if (!valid) return null;

  const commands = value
    .map(x => x.match(reg))
    .map(([full, dir, b, alt, c, spd]) => ({ dir, alt, spd }));

  return commands;
};

export const RouteArrayToString = complexDir => {
  return complexDir.map(RouteArrayItemToString).join(' -> ');
};

export const RouteArrayItemToString = item => {
  const altPart = isNullOrUndefined(item.alt) ? '' : `/${item.alt}`;
  const spdPart = isNullOrUndefined(item.spd) ? '' : `/${item.spd}`;
  return item.dir + altPart + spdPart;
};

const legScore = (airplane, leg, callsignPositions) => {
  const from = callsignPositions[leg.from.dir];
  const to = callsignPositions[leg.to.dir];
  if (typeof to.dir === 'number') return Infinity;
  // const distIdealSquared = distSq(from, to);
  // const closestDist = Math.min(distSq(airplane, from), distSq(airplane, to));
  // return distIdealSquared / closestDist;
  const legHdg = headingTo(from.x, from.y, to.x, to.y);
  return (
    parrelelLinesDistance(airplane.x, airplane.y, to.x, to.y, legHdg) +
    Math.abs(airplane.heading, legHdg) / 10
  );
  // these numbers are only used as weights to sort the most suitable leg
};

export const mostSuitableLeg = (airplane, sidOrStar, callsignPositions) => {
  const arr = sidOrStar.route.slice(0);

  let previous = arr.splice(0, 1)[0];
  const legs = arr.map(item => {
    return { from: previous, to: (previous = item) };
  });

  const orderedBySuitability = legs.slice(0).sort((leg1, leg2) => {
    return (
      legScore(airplane, leg2, callsignPositions) -
      legScore(airplane, leg1, callsignPositions)
    );
  });

  let best = orderedBySuitability.pop();
  while (
    distSq(airplane, callsignPositions[best.to.dir]) <
    distBeforeTurningOntoNewLeg(airplane)
  ) {
    if (legs.indexOf(best) + 1 >= legs.length) return { complete: true, best };
    best = legs[legs.indexOf(best) + 1];
    if (typeof best.dir === 'number') return { complete: false, best };
  }
  return { complete: false, best };
};

export const distBeforeTurningOntoNewLeg = airplane => {
  const rate = Airplane.getTurningRate(airplane) * config.turnRate;
  return Math.pow(50 / rate, 2);
};
