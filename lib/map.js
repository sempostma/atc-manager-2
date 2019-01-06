import config from './config';
import { polygonInside } from './util';
import maps from './maps/maps.js';

export const idType = {
  WAYPOINT: 0,
  AIRPORT: 1,
  RWY: 2,
  DIRECTION: 3,
  STAR: 4,
  SID: 5
};

export const directions = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270
};

export const loadMap = key => {
  Object.keys(maps[key].waypoints)
    .map(k => maps[key].waypoints[k])
    .forEach(w => (w.type = idType.WAYPOINT));
  maps[key].airport.type = idType.AIRPORT;
  maps[key].airport.runways.forEach(rwy => (rwy.type = idType.RWY));
  return maps[key];
};

export const findHdgAround = (
  centerx,
  centery,
  radius,
  px,
  py,
  hdg,
  tx,
  ty
) => {
  const hdgToTgt = headingTo(px, py, tx, ty);
  const hdgToTgtVector = hdgToVector(hdgToTgt);
  const perpendicularVectorRight = [hdgToTgtVector[1], -hdgToTgtVector[0]];
  const perpendicularVectorLeft = [-hdgToTgtVector[1], hdgToTgtVector[0]];

  const rx = centerx + perpendicularVectorRight[0] * radius;
  const ry = centery + perpendicularVectorRight[1] * radius;
  const lx = centerx + perpendicularVectorLeft[0] * radius;
  const ly = centery + perpendicularVectorLeft[1] * radius;

  const hdgToRight = headingTo(px, py, rx, ry);
  const hdgToLeft = headingTo(px, py, lx, ly);

  const hdgToRightDelta = angleDelta(hdg, hdgToRight);
  const hdgToLeftDelta = angleDelta(hdg, hdgToLeft);

  if (
    hdgToRightDelta > 0 &&
    hdgToRightDelta < 90 &&
    hdgToLeftDelta < 0 &&
    hdgToLeftDelta > -90
  ) {
    return Math.abs(hdgToRightDelta) < Math.abs(hdgToLeftDelta)
      ? hdgToRight
      : hdgToLeft;
  } else return hdg;
};

export const hdgToVector = hdg => [
  Math.sin((hdg * Math.PI) / 180),
  Math.cos((hdg * Math.PI) / 180)
];

export const headingTo = (x1, y1, x2, y2) => {
  return ((Math.atan2(x2 - x1, y2 - y1) * 180) / Math.PI + 360) % 360;
};

export const angleDelta = (a0, a1) => {
  var max = 360;
  var da = (a1 - a0) % max;
  return ((2 * da) % max) - da;
};

const rwyLen = rwy => rwy.length || rwy.length1 || rwy.length2;

export const longestRunway = mapAirport =>
  mapAirport.runways.reduce((a, b) => 
    rwyLen(a) > rwyLen(b) ? a : b);

export const longestRunwayLen = mapAirport => 
  rwyLen(longestRunway(mapAirport));

export const parrelelLinesDistance = (px1, py1, px2, py2, hdg) => {
  const distanceBetweenPoints = Math.sqrt(
    Math.pow(px1 - px2, 2) + Math.pow(py1 - py2, 2)
  );
  const p1ToP2AngleRad = Math.atan2(px2 - px1, py2 - py1);
  const hdgRad = (hdg * Math.PI) / 180;
  const perpendicularAngle = hdgRad + Math.PI / 2; // hdg1 + 90deg
  const phiAngle = perpendicularAngle - p1ToP2AngleRad;
  const distance = Math.abs(Math.cos(phiAngle) * distanceBetweenPoints);
  return distance;
};

export const getAltimeter = (altimeter, isMillibars) => {
  if (!isMillibars) return altimeter;
  else return (altimeter * 33.8637526).toFixed(0);
};

export const activeRwys = (airport, winddir) => {
  const ru = airport.rwyusage;
  if (ru) {
    // IF runway usage spec is available
    for (let i = 0; i < ru.length; i++) {
      if (winddir < ru[i].dir) {
        let winddir = ru[(i + ru.length - 1) % ru.length];
        return winddir.rwys;
      }
    }
    return ru[ru.length - 1].rwys;
  } else {
    // use runways that point into the wind
    const aRwys = [];
    for (let i = 0; i < airport.runways.length; i++) {
      const rwy = airport.runways[i];
      aRwys.push(
        Math.abs(winddir - rwy.hdg1) < Math.abs(winddir - rwy.hdg2)
          ? rwy.name1
          : rwy.name2
      );
    }
    return aRwys;
  }
};

export const rwyPos = (
  airport,
  rwy,
  width,
  height,
  multiplier = 1,
  ignoreLen
) => {
  const len = rwy.length * config.rwyLenScale;
  const dx1 =
    Math.sin((rwy.hdg1 * Math.PI) / 180) *
    (!ignoreLen ? -len : -1) *
    multiplier;
  const dy1 =
    Math.cos((rwy.hdg1 * Math.PI) / 180) *
    (!ignoreLen ? -len : -1) *
    multiplier;
  const dx2 =
    Math.sin((rwy.hdg2 * Math.PI) / 180) *
    (!ignoreLen ? -len : -1) *
    multiplier;
  const dy2 =
    Math.cos((rwy.hdg2 * Math.PI) / 180) *
    (!ignoreLen ? -len : -1) *
    multiplier;

  const x1 = width / 2 + airport.x + rwy.x + dx1;
  const y1 = height / 2 + airport.y + rwy.y + dy1;
  const x2 = width / 2 + airport.x + rwy.x + dx2;
  const y2 = height / 2 + airport.y + rwy.y + dy2;
  return { x1, y1, x2, y2 };
};

export const landableRwys = (airport, airplane, width, height) => {
  const rwys = [];
  for (let i = 0; i < airport.runways.length; i++) {
    const rwy = airport.runways[i];
    const len = rwy.length * config.rwyLenScale;
    const dx1 = Math.sin((rwy.hdg1 * Math.PI) / 180) * -len;
    const dy1 = Math.cos((rwy.hdg1 * Math.PI) / 180) * -len;
    const dx2 = Math.sin((rwy.hdg2 * Math.PI) / 180) * -len;
    const dy2 = Math.cos((rwy.hdg2 * Math.PI) / 180) * -len;

    const x1 = width / 2 + airport.x + rwy.x + dx1;
    const y1 = height / 2 + airport.y + rwy.y + dy1;
    const x2 = width / 2 + airport.x + rwy.x + dx2;
    const y2 = height / 2 + airport.y + rwy.y + dy2;

    const deg1 =
      ((Math.atan2(x1 - airplane.x, y1 - airplane.y) * 180) / Math.PI + 360) %
      360;
    const deg2 =
      ((Math.atan2(x2 - airplane.x, y2 - airplane.y) * 180) / Math.PI + 360) %
      360;

    if (Math.abs(angleDelta(rwy.hdg1, deg1)) < 20) {
      rwys.push({ rwy, rev: false });
    } else if (Math.abs(angleDelta(rwy.hdg2, deg2)) < 20) {
      rwys.push({ rwy, rev: true });
    }
  }
  return rwys;
};

export const rwyHeading = (rwy, name) => {
  return rwy.ref.name1 === name ? rwy.ref.hdg1 : rwy.ref.hdg2;
};

export const mapsArr = Object.values(maps);

export const callsignPositions = (
  map,
  waypoints,
  width,
  height,
  parsedSids,
  parsedStars
) => {
  return Object.assign(
    {},
    ...Object.keys(waypoints).map(k => {
      const ref = waypoints[k];
      return { [k]: { ref, x: ref.x, y: ref.y } };
    }),
    {
      [map.airport.callsign]: {
        ref: map.airport,
        x: width / 2 + map.airport.x,
        y: height / 2 + map.airport.y
      }
    },
    ...map.airport.runways.map(ref => {
      const pos = rwyPos(map.airport, ref, width, height);
      return {
        [ref.name1]: { ref, x: pos.x1, y: pos.y1 },
        [ref.name2]: { ref, x: pos.x2, y: pos.y2 }
      };
    })
  );
};

export { maps };

export const setCallsigns = (map, waypoints, parsedSids, parsedStars) =>
  Object.assign(
    {},
    waypoints,
    { [map.airport.callsign]: map.airport },
    ...map.airport.runways.map(rwy => ({ [rwy.name1]: rwy, [rwy.name2]: rwy })),
    parsedSids,
    parsedStars
  );

export const getMSABase = (msaBase, hdgFromAirportToPlane) => {
  for (let i = 0; i < msaBase.length; i++) {
    if (hdgFromAirportToPlane < msaBase[i].dir) {
      return msaBase[(i + msaBase.length - 1) % msaBase.length].alt;
    }
  }
  return msaBase[msaBase.length - 1].alt;
};

export const testMSAViolation = (map, airplane) => {
  return map.msa.polygons.some(({ vertices, alt }) => {
    return (
      polygonInside([airplane.x, airplane.y], vertices) &&
      airplane.altitude < alt
    );
  });
};
