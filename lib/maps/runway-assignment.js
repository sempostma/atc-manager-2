import { activeRwys } from '../map';

export class TakeoffRunwayAssignment {
  constructor(map, callsignsPos, disableTakoffsOnRwysSet, windspd, winddir) {
    this.getMeta = (model, ga) => { // only runs once, the return value is cached
      let activeRunways = activeRwys(map.airport, winddir);
      const runwayTrafficType = ga ? 'ga' : 'commercial';
      const activeRunwaysAssigned = activeRunways.filter(rwy => {
        return disableTakoffsOnRwysSet[rwy] === 'all' ||
          disableTakoffsOnRwysSet[rwy] === runwayTrafficType;
      });
      // if the user has a prefered runway. Use that runway. 
      // If the user has al of the runways disabled choose one at random.
      const couldNotFindAssignedRwy = activeRunwaysAssigned.length === 0;
      if (couldNotFindAssignedRwy === false) {
        activeRunways = activeRunwaysAssigned;
      }

      const activeRunwaysAssignedWithProperLength = activeRunways.filter(rwy => {
        const cs = callsignsPos[rwy].ref;
        const rwyLen = (cs.name1 === rwy ? cs.length1 : cs.length2) || cs.length;
        return rwyLen >= model.takeoffMinRunwayLength;
      });

      const couldNotFindActiveRunwaysAssignedWithProperLength
        = activeRunwaysAssignedWithProperLength.length === 0;
      if (couldNotFindActiveRunwaysAssignedWithProperLength === false) {
        activeRunways = activeRunwaysAssignedWithProperLength;
      }

      const rwy =
        activeRunways[Math.floor(Math.random() * activeRunways.length)];
      const cs = callsignsPos[rwy];
      const heading = cs.ref.name1 === rwy ? cs.ref.hdg1 : cs.ref.hdg2;

      const { x, y } = cs;

      const ret = {
        rwy,
        heading,
        x,
        y,
        couldNotFindAssignedRwy,
        couldNotFindActiveRunwaysAssignedWithProperLength
      };

      this.getMeta = () => ret; // cache the result of this function
      return ret;
    };
  }
}