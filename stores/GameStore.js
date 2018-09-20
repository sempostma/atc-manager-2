import { EventEmitter } from 'events';
import Airplane from '../lib/airplane';
import config from '../lib/config';
import { loadMap, angleDelta, headingTo, rwyPos, idType, activeRwys, callsignPositions, setCallsigns } from '../lib/map';
import SettingsStore from './SettingsStore';
import { routeTypes, airplanesById, operatorsById } from '../lib/airplane-library/airplane-library';
import { loadState } from '../lib/persistance';
import communications, { natoAlphabet } from '../lib/communications';
import { sendMessageWarning, sendMessageError } from '../components/GameMessages/GameMessages';

class GameStore extends EventEmitter {
  constructor() {
    super();
    this.traffic = [];
    this.paused = false;
    this.started = false;
    this.interval = null;
    this.log = [];
    this.selfLog = [];
    this.pathCounter = 0;
    this.waypoints = {};
    this.airport = {};
    this.callsigns = {};
    this.callsignsPos = {};
    this._remove = [];
    this._spawnPlaneCounter = 0;
    this.mapName = null;
    this.disableTakoffsOnRwysSet = {};

    this.update = this.update.bind(this); // called within a setInterval so bind to this object and not the window object.
    this._newPlane = this._newPlane.bind(this); // called within a setInterval so bind to this object and not the window object.

    this.setMaxListeners(20);
  }

  getAtis() {
    return natoAlphabet[String.fromCharCode(this.atis % 26 + 97).toUpperCase()];
  }

  startMap(mapName) {
    this.arrivals = 0;
    this.departures = 0;
    this.enroutes = 0;
    this.unpermittedDepartures = 0;
    this.distanceVialations = 0;
    const map = this.map = loadMap(mapName);
    this.id = mapName;
    this.winddir = Math.floor(Math.random() * 360);
    this.altimeter = (29 + Math.random() * 2).toFixed(2);
    this.atis = Math.floor(Math.random() * 26);
    this.windspd = Math.floor(Math.random() * 12);
    this._setup(map);
    // create planes
    for (let i = 0; i < SettingsStore.startingInboundPlanes; i++) this._newPlaneInbound();
    for (let i = 0; i < SettingsStore.startingOutboundPlanes; i++) this.newPlaneOutbound();
    if (SettingsStore.enroute) {
      for (let i = 0; i < SettingsStore.startingEnroutePlanes; i++) this._newPlaneEnroute();
    }
  }

  startSaved(saveName) {
    const state = loadState();
    const game = state.games[saveName];
    this.loadJson(game);
    const map = this.map = loadMap(game.id);
    this._setup(map);
  }

  _setup(map) {
    this.waypoints = map.waypoints;
    this.airport = map.airport;
    this._edgeDetection = {};
    this.sepDistanceVialotions = {};
    this.started = true;
    this.callsigns = setCallsigns(map, this.waypoints);
    this.callsignsPos = callsignPositions(map, this.waypoints, config.width, config.height);
    this.mapName = map.id;
    this.setupWaypoints(map);

    if (!this.interval) this.interval = setInterval(this.update, config.updateInterval);
    this.emit('change');
    this.emit('start');
  }

  setupWaypoints() {
    this.inboundWpOrdered = this.map.inboundWaypoints.slice(0).sort(() => Math.random() - .5);
    this.outboundWpOrdered = this.map.outboundWaypoints.slice(0).sort(() => Math.random() - .5);
  }

  _newPlane() {
    if (this.paused) return;
    const rnd = Math.random();

    if (SettingsStore.enroute) {
      if (rnd < .33) this._newPlaneInbound();
      else if (rnd < .66) this.newPlaneOutbound();
      else this._newPlaneEnroute();
    } else {
      if (rnd < .5) this._newPlaneInbound();
      else this.newPlaneOutbound();
    }
  }

  _newPlaneEnroute() {
    const map = this.map;
    if (this.inboundWpOrdered.length === 0) {
      this.inboundWpOrdered = map.inboundWaypoints.slice(0).sort(() => Math.random() - .5);
    }
    if (this.outboundWpOrdered.length === 0) {
      this.outboundWpOrdered = map.outboundWaypoints.slice(0).sort(() => Math.random() - .5);
    }
    const inboundWaypoint = this.inboundWpOrdered.pop();
    const pos = this.callsignsPos[inboundWaypoint];

    const outBoundWaypoint = this.outboundWpOrdered.pop();
    const tgt = this.callsignsPos[outBoundWaypoint];

    let heading = Math.floor(headingTo(pos.x, pos.y, tgt.x, tgt.y)) % 360;
    const airplane = Airplane.createEnroute(pos.x, pos.y, heading, outBoundWaypoint);
    this.traffic.push(airplane);

    // TODO: Speech for outbound
    // const callsign = operatorsById[airplane.operatorId].shortName + ' ' + airplane.flight;
    // if (Math.random() > .5) {
    //   // has atis
    //   const msg = this.airport.callsign + ' approach, ' + callsign + ' at ' + Math.floor(airplane.altitude / 100) + ' with ' + this.getAtis() + '.';
    //   this.addLog(msg, callsign);

    //   const atcMsg = callsign + ', ' + this.airport.callsign + ' approach, maintain current heading.';
    //   this.addLog(atcMsg, 'ATC');
    // } else {
    //   // does not have atis
    //   const msg = this.airport.callsign + ' approach, ' + callsign + ' at ' + Math.floor(airplane.altitude / 100) + '.';
    //   this.addLog(msg, callsign);

    //   const atcMsg = callsign + ', information ' + this.getAtis() + ' is current, altimeter ' + this.altimeter + ', maintain current heading.';
    //   this.addLog(atcMsg, 'ATC');
    // }
  }

  _newPlaneInbound() {
    const map = this.map;
    if (this.inboundWpOrdered.length === 0) {
      this.inboundWpOrdered = map.inboundWaypoints.slice(0).sort(() => Math.random() - .5);
    }
    const inboundWaypoint = this.inboundWpOrdered.pop();
    const pos = this.callsignsPos[inboundWaypoint];
    let mx = config.width / 2;
    let my = config.height / 2;
    let heading = Math.floor(headingTo(pos.x, pos.y, mx, my)) % 360;
    const airplane = Airplane.create(pos.x, pos.y, heading, routeTypes.INBOUND);
    this.traffic.push(airplane);

    const callsign = operatorsById[airplane.operatorId].shortName + ' ' + airplane.flight;
    if (Math.random() > .5) {
      // has atis
      const msg = this.airport.callsign + ' approach, ' + callsign + ' at ' + Math.floor(airplane.altitude / 100) + ' with ' + this.getAtis() + '.';
      this.addLog(msg, callsign);

      const atcMsg = callsign + ', ' + this.airport.callsign + ' approach, maintain current heading.';
      this.addLog(atcMsg, 'ATC');
    } else {
      // does not have atis
      const msg = this.airport.callsign + ' approach, ' + callsign + ' at ' + Math.floor(airplane.altitude / 100) + '.';
      this.addLog(msg, callsign);

      const atcMsg = callsign + ', information ' + this.getAtis() + ' is current, altimeter ' + this.altimeter + ', maintain current heading.';
      this.addLog(atcMsg, 'ATC');
    }

  }

  // deprecated
  _newPlaneInboundOnEdge() {
    const hdgVar = config.headingInitVariation;
    let side = Math.floor(Math.random() * 4);
    let x = side === 1 ? config.width : side === 3 ? 0 : Math.random() * config.width;
    let y = side === 0 ? config.height : side === 2 ? 0 : Math.random() * config.height;
    let mx = config.width / 2;
    let my = config.height / 2;
    let heading = Math.floor(headingTo(x, y, mx, my) - hdgVar * .5 + Math.random() * hdgVar) % 360;
    this.traffic.push(Airplane.create(x, y, heading, routeTypes.INBOUND));
  }

  newPlaneOutbound() {
    let activeRunways = activeRwys(this.airport, this.winddir);
    let activeRunwaysAssigned = activeRunways.filter(rwy => !this.disableTakoffsOnRwysSet[rwy]);
    // if the user has a prefered runway. Use that runway. If the user has al of the runways disabled choose one at random.
    let couldNotFindAssignedRwy = activeRunwaysAssigned.length === 0;
    if (activeRunwaysAssigned.length > 0) activeRunways = activeRunwaysAssigned;

    const item = activeRunways[Math.floor(Math.random() * activeRunways.length)];
    const rwy = this.callsignsPos[item];
    const hdg = rwy.ref.name1 === item ? rwy.ref.hdg1 : rwy.ref.hdg2;
    const outboundWaypoint = this.map.outboundWaypoints[Math.floor(Math.random() * this.map.outboundWaypoints.length)];
    const airplane = Airplane.createOutbound(rwy.x, rwy.y, hdg, item, outboundWaypoint);
    this.traffic.push(airplane);

    const callsign = operatorsById[airplane.operatorId].shortName + ' ' + airplane.flight;

    if (couldNotFindAssignedRwy) sendMessageWarning(`No assigned takeoff runway, ${communications.getCallsign(airplane, true)} was ordered to taxi to RWY ${item}.`);

    // has atis
    const msg = this.airport.callsign + ' approach, with you for ' + item + '.';
    this.addLog(msg, callsign);

    const atcMsg = callsign + ', ' + this.airport.callsign + ' approach, hold short ' + item + '.';
    this.addLog(atcMsg, 'ATC');

    const readBackMsg = 'Roger hold short of ' + item + ', ' + callsign + '.';
    this.addLog(readBackMsg, callsign);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.traffic = [];
    this.started = false;
    this.emit('change');
  }

  pause() {
    this.paused = true;
    this.emit('change');
  }

  resume() {
    this.paused = false;
    this.emit('change');
  }

  addLog(msg, self) {
    this.log.push(self + ': ' + msg);
    if (self === 'ATC') this.selfLog.push(self + ': ' + msg);
    this.emit('change');
  }

  toJson() {
    const ret = {};
    for (let i = 0; i < persistanceProps.length; i++) {
      ret[persistanceProps[i]] = this[persistanceProps[i]];
    }
    return ret;
  }

  loadJson(state) {
    for (let i = 0; i < persistanceProps.length; i++) {
      this[persistanceProps[i]] = state[persistanceProps[i]];
    }
  }

  setSvgEl(el) {
    this.svgEl = el;
  }

  trySpawn() {
    this._spawnPlaneCounter += config.updateInterval * SettingsStore.speed;
    if (this._spawnPlaneCounter > SettingsStore.newPlaneInterval * 1000) {
      this._spawnPlaneCounter %= SettingsStore.newPlaneInterval;
      this._newPlane();
    }
  }

  update = () => {
    if (this.paused) return;
    const s = config.globalSpeed * SettingsStore.speed;
    this.trySpawn();
    this.pathCounter = ++this.pathCounter % Math.floor(config.pathCounterUpdateEvery / s);
    for (const key in this.sepDistanceVialotions) delete this.sepDistanceVialotions[key];
    this.traffic.forEach(this.planeUpdate);
    for (const key in this._edgeDetection) delete this._edgeDetection[key];
    for (let i = 0; i < this._remove.length; i++) this.traffic.splice(this.traffic.indexOf(this._remove[i]), 1);
    this._remove.length = 0;
    this.emit('change');
  }

  planeUpdate = (airplane, i) => {
    if (airplane.outboundRwy) return;

    const model = airplanesById[airplane.typeId];
    const s = config.globalSpeed * SettingsStore.speed;
    const dx = Math.sin(airplane.heading * Math.PI / 180);
    const dy = Math.cos(airplane.heading * Math.PI / 180);
    let tgtHeading = airplane.heading;
    let spdChange = 0;
    let altChange = Math.min(config.climbSpeed * model.climbSpeed * s, Math.max(-config.descendSpeed * model.descendSpeed * s, airplane.tgtAltitude - airplane.altitude));
    let tgtSpeed = (airplane.altitude < 10000 && airplane.tgtSpeed > 250) ? Math.min(250, airplane.tgtSpeed) : airplane.tgtSpeed;

    airplane.x += dx * s * airplane.speed * config.baseAirplaneSpeed;
    airplane.y += dy * s * airplane.speed * config.baseAirplaneSpeed;

    const isAtManeuveringSpeed = airplane.speed >= (airplanesById[airplane.typeId].landingSpeed - 0.01);
    const exceeds250Multiplier = (airplane.speed - 250) * 0.01 + 5;
    const canChangeHeading = airplane.routeType !== routeTypes.OUTBOUND || airplane.altitude >= config.flyStraightAfterTakeoffUntilHeight - 10; /* manouvering height */
    if (airplane.altitude >= 10000 && airplane.tgtSpeed > 250.001 && airplane.tgtAltitude < 10000) { // 250kts speed rule check
      if ((altChange * exceeds250Multiplier + airplane.altitude) < 10000) airplane.tgtSpeed = 250; // slow down to 250kts
      if (airplane.altitude + altChange < 10000) altChange = 10000 - airplane.altitude; // don't descend < fl100 < 250kts
    }
    spdChange = Math.min(s * config.accelerationSpeed * model.accelerationSpeed, Math.max(-s * config.deAccelerationSpeed * model.deAccelerationSpeed, tgtSpeed - airplane.speed));
    if (spdChange < 0 && altChange < 0) /* descelerating and descending */ altChange *= model.descendRatioWhileDecelerating;

    if (typeof airplane.tgtDirection === 'number') tgtHeading = airplane.tgtDirection; // heading
    else if (typeof airplane.tgtDirection === 'string') { // waypoint
      const waypointPosition = this.callsignsPos[airplane.tgtDirection];
      if (waypointPosition) {
        if (airplane.routeType === routeTypes.INBOUND && waypointPosition.ref.type === idType.RWY) tryLand.call(this, waypointPosition);
        else tgtHeading = headingTo(airplane.x, airplane.y, waypointPosition.x, waypointPosition.y);
      }
      else tgtHeading = airplane.heading;
    }

    if (isAtManeuveringSpeed) airplane.altitude += altChange;
    airplane.speed += spdChange;

    if (airplane.routeType === routeTypes.OUTBOUND || airplane.routeType === routeTypes.ENROUTE) {
      const wp = this.callsignsPos[airplane.outboundWaypoint];
      if ((Math.abs(airplane.x - wp.x) + Math.abs(airplane.y - wp.y)) < 15) {
        this.departures++;
        this._remove.push(airplane);
        return;
      }
    }

    if (isAtManeuveringSpeed && canChangeHeading) {
      const maxTurnDeg = Airplane.getTurningRate(airplane) * s * config.turnRate;
      airplane.heading += Math.min(maxTurnDeg, Math.max(-maxTurnDeg, angleDelta(airplane.heading, tgtHeading)));
      airplane.heading = (airplane.heading + 360) % 360;
    }

    if (this.pathCounter === 0) {
      airplane.path.unshift([airplane.x, airplane.y]);
      if (airplane.path.length >= config.maxPathLen) airplane.path.pop();
    }

    if (airplane.x < -3 || airplane.y < -3 || airplane.x > config.width + 3 || airplane.y > config.height + 3) {
      this.unpermittedDepartures++;
      sendMessageError(`${communications.getCallsign(airplane, true)} wrongfully exited the map. It should have exited the map at ${airplane.outboundWaypoint || 'the airport'}.`);
      this._remove.push(airplane);
      return;
    }

    if (edgeDetectionViolation.call(this)) this.distanceVialations++;

    // END

    function edgeDetectionViolation() {
      let airplaneSepDistViolation = false;
      const t = config.threeMileRuleDistance,
        x = Math.round(airplane.x / t),
        y = Math.round(airplane.y / t);
      for (let a = 0; a < 2; a++) {
        for (let i = 0; i < 9; i++) {
          const identity = `${Math.round(x + i % 3 - 1)}x${Math.round(y + i / 3 - 1)}/${Math.floor(airplane.altitude * .0005) + a}`,
            sameIdentity = this._edgeDetection[identity];
          if (sameIdentity && !sameIdentity[airplane.flight]) {
            // do actual calculation
            for (const key in sameIdentity) {
              const oa = sameIdentity[key];
              if (Math.abs(oa.altitude - airplane.altitude) > 995) continue;
              const xd = Math.abs(airplane.x - oa.x) / t;
              const yd = Math.abs(airplane.y - oa.y) / t;
              if (xd * xd + yd * yd < 1) {
                this.sepDistanceVialotions[oa.flight] = airplane;
                this.sepDistanceVialotions[airplane.flight] = oa;
                airplaneSepDistViolation = true;
              }
            }
          }
          this._edgeDetection[identity] = (sameIdentity || {});
          this._edgeDetection[identity][airplane.flight] = airplane;
        }
      }
      return airplaneSepDistViolation;
    }

    function tryLand(rwyPos) {
      const rwyHdg = rwyPos.ref.name1 === airplane.tgtDirection ? rwyPos.ref.hdg1 : rwyPos.ref.hdg2;
      const hdgToRwy = Math.atan2(rwyPos.x - airplane.x, rwyPos.y - airplane.y) * 180 / Math.PI;
      const deg = angleDelta(rwyHdg, hdgToRwy);
      let distance = (rwyPos.x - airplane.x) / Math.sin(hdgToRwy * Math.PI / 180);
      let rwyAirplaneHdgDiff = angleDelta(airplane.heading, rwyHdg);
      const tooHigh = airplane.altitude > (distance * config.ilsSlopeSteepness * 2 + 500/* safety */);
      distance = isFinite(distance) ? distance : .1;
      if (airplane.altitude < 3200 && Math.abs(deg) < 20 && Math.abs(rwyAirplaneHdgDiff) < 20 && !tooHigh) {
        altChange = Math.min(100 * s, Math.max(-100 * s, Math.min(airplane.altitude, distance * config.ilsSlopeSteepness) - airplane.altitude));
      }
      if (airplane.altitude < 3200 && Math.abs(deg) < 20) {
        tgtHeading = rwyHdg + Math.min(45, Math.max(-45, Math.max(Math.abs(deg), 10/* weight */) * deg));
      } else if (airplane.altitude < 500 && Math.abs(rwyAirplaneHdgDiff) < 20) {
        //landed
        this.arrivals++;
        this._remove.push(airplane);
        return;
      } else {
        // unable to land, not in range, or any other reason not to land
        tgtHeading = airplane.heading;
      }
    }
  }
}

const persistanceProps = ['traffic', 'started', 'width', 'height', 'log', 'selfLog', 'pathCounter', 'mapName', 'id', 'arrivals', 'departures',
  'enroutes', 'distanceVialations', 'mapName', 'winddir', 'windspd', 'unpermittedDepartures'];

export default new GameStore();

