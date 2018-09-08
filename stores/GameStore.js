import { EventEmitter } from 'events';
import Airplane from '../lib/airplane';
import config from '../lib/config';
import { loadMap, angleDistance, headingTo, rwyPos, idType, activeRwys } from '../lib/map';
import SettingsStore from './SettingsStore';
import { routeTypes, airplanesById, operatorsById } from '../lib/airplane-library';
import { loadState } from '../lib/persistance';

const natoAlphabet = {
  "A": "Alfa",
  "B": "Bravo",
  "C": "Charlie",
  "D": "Delta",
  "E": "Echo",
  "F": "Foxtrot",
  "G": "Golf",
  "H": "Hotel",
  "I": "India",
  "J": "Juliett",
  "K": "Kilo",
  "L": "Lima",
  "M": "Mike",
  "N": "November",
  "O": "Oscar",
  "P": "Papa",
  "Q": "Quebec",
  "R": "Romeo",
  "S": "Sierra",
  "T": "Tango",
  "U": "Uniform",
  "V": "Victor",
  "W": "Whiskey",
  "X": "X-ray",
  "Y": "Yankee",
  "Z": "Zulu"
}

class GameStore extends EventEmitter {
  constructor() {
    super();
    this.traffic = [];
    this.paused = false;
    this.started = false;
    this.interval = null;
    this.width = 1280;
    this.height = 720;
    this.log = [];
    this.selfLog = [];
    this.pathCounter = 0;
    this.waypoints = {};
    this.airport = {};
    this.callsigns = {};
    this.callsignsPos = {};
    this._remove = [];
    this.mapName = null;

    this.update = this.update.bind(this); // called within a setInterval so bind to this object and not the window object.
    this._newPlane = this._newPlane.bind(this); // called within a setInterval so bind to this object and not the window object.
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
    this.winddir = Math.floor(Math.random() * 360);
    this.altimeter = (29 + Math.random() * 2).toFixed(2);
    this.atis = Math.floor(Math.random() * 26);

    this.windspd = Math.floor(Math.random() * 12);
    this._setup(map);
    // create planes
    for (let i = 0; i < SettingsStore.startingInboundPlanes; i++) {
      this._newPlaneInboundOnRoute();
    }
    for (let i = 0; i < SettingsStore.startingOutboundPlanes; i++) {
      this._newPlaneOutbound();
    }
  }

  startSaved(saveName) {
    const state = loadState();
    const game = state.games[saveName];
    this.loadJson(game);
    const map = this.map = loadMap(this.mapName);
    this._setup(map);
  }

  _setup(map) {
    this.waypoints = map.waypoints;
    this.airport = map.airport;
    this._edgeDetection = {};
    this.sepDistanceVialotions = {};
    this.started = true;
    this.callsigns = {};
    this.callsignsPos = {};
    this.mapName = map.name;

    this._setupWaypoints(map);

    // set callsigns
    Object.assign(this.callsigns, this.waypoints, { [map.airport.callsign]: map.airport },
      ...map.airport.runways.map(rwy => ({ [rwy.name1]: rwy, [rwy.name2]: rwy })));

    // set callsign positions
    const airportX = this.width / 2 + map.airport.x;
    const airportY = this.height / 2 + map.airport.y;
    Object.assign(this.callsignsPos, ...Object.keys(this.waypoints).map(k => {
      const ref = this.waypoints[k];
      return { [k]: { ref, x: ref.x, y: ref.y } };
    }), { [map.airport.callsign]: { ref: map.airport, x: airportX, y: airportY } },
      ...map.airport.runways.map(ref => {
        const pos = rwyPos(map.airport, ref, this.width, this.height);
        return { [ref.name1]: { ref, x: pos.x1, y: pos.y1 }, [ref.name2]: { ref, x: pos.x2, y: pos.y2 } }
      }));

    if (this.interval) throw 'Already set interval';
    this.interval = setInterval(this.update, config.updateInterval)
    if (this.newTrafficInterval) throw 'Already set new traffic interval';
    this.newTrafficInterval = setInterval(this._newPlane, SettingsStore.newPlaneInterval * 1000);
    this.emit('change');
    this.emit('start');
  }

  _setupWaypoints() {
    const map = this.map;
    this.inboundWpOrdered = map.inboundWaypoints.slice(0).sort(() => Math.random() - .5);
    this.outboundWpOrdered = map.outboundWaypoints.slice(0).sort(() => Math.random() - .5);
    this.enrouteRoutesOrdered = [];
    for (let i = 0; i < map.inboundWaypoints.length; i++) {
      for (let j = 0; j < map.outboundWaypoints.length; j++) {
        const inboundWp = map.inboundWaypoints[i];
        const outboundWp = map.outboundWaypoints[i];
        const route = map.routes[`${inboundWp}->${outboundWp}`];
        if (route) {
          this.enrouteRoutesOrdered.push(route);
        }
      }
    }
    this.enrouteRoutesOrdered.sort(() => Math.random() - .5);
  }

  _newPlane() {
    if (this.paused) return;
    if (Math.random() > .5) this._newPlaneInboundOnRoute();
    else this._newPlaneOutbound();
  }

  _newPlaneInboundOnRoute() {
    const map = this.map;
    if (this.inboundWpOrdered.length === 0) {
      this.inboundWpOrdered = map.inboundWaypoints.slice(0).sort(() => Math.random() - .5);
    }
    const inboundWaypoint = this.inboundWpOrdered.pop();
    const pos = this.callsignsPos[inboundWaypoint];
    let mx = this.width / 2;
    let my = this.height / 2;
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
    let x = side === 1 ? this.width : side === 3 ? 0 : Math.random() * this.width;
    let y = side === 0 ? this.height : side === 2 ? 0 : Math.random() * this.height;
    let mx = this.width / 2;
    let my = this.height / 2;
    let heading = Math.floor(headingTo(x, y, mx, my) - hdgVar * .5 + Math.random() * hdgVar) % 360
    this.traffic.push(Airplane.create(x, y, heading, routeTypes.INBOUND));
  }

  _newPlaneOutbound() {
    const activeRunways = activeRwys(this.airport, this.winddir);
    const item = activeRunways[Math.floor(Math.random() * activeRunways.length)];
    const rwy = this.callsignsPos[item];
    const hdg = rwy.ref.name1 === item ? rwy.ref.hdg1 : rwy.ref.hdg2;
    const outboundWaypoint = this.map.outboundWaypoints[Math.floor(Math.random() * this.map.outboundWaypoints.length)];
    const airplane = Airplane.createOutbound(rwy.x, rwy.y, hdg, item, outboundWaypoint)
    this.traffic.push(airplane);

    const callsign = operatorsById[airplane.operatorId].shortName + ' ' + airplane.flight;
    // has atis
    const msg = this.airport.callsign + ' approach, with you for ' + item + '.';
    this.addLog(msg, callsign);

    const atcMsg = callsign + ', ' + this.airport.callsign + ' approach, hold short ' + item + '.';
    this.addLog(atcMsg, 'ATC');

    const readBackMsg = 'Roger hold short of ' + item + ', ' + callsign + '.';
    this.addLog(readBackMsg, callsign);
  }

  update() {
    if (this.paused) return;
    let sepDistViolation = false;
    const s = config.globalSpeed * SettingsStore.speed;
    this.pathCounter = ++this.pathCounter % Math.floor(config.pathCounterUpdateEvery / s);
    let addPathEntry = this.pathCounter === 0;
    for (const key in this.sepDistanceVialotions) {
      delete this.sepDistanceVialotions[key];
    }
    // move planes
    for (let i = 0; i < this.traffic.length; i++) {
      const airplane = this.traffic[i];
      if (airplane.outboundRwy) continue;
      let dx = Math.sin(airplane.heading * Math.PI / 180);
      let dy = Math.cos(airplane.heading * Math.PI / 180);
      airplane.x += dx * s * airplane.speed * config.baseAirplaneSpeed;
      airplane.y += dy * s * airplane.speed * config.baseAirplaneSpeed;
      const model = airplanesById[airplane.typeId];
      let altChange = Math.min(config.climbSpeed * model.climbSpeed * s, Math.max(-config.descendSpeed * model.descendSpeed * s, airplane.tgtAltitude - airplane.altitude));
      let tgtSpeed = (airplane.altitude < 10000 && airplane.tgtSpeed > 250) ? Math.min(250, airplane.tgtSpeed) : airplane.tgtSpeed;
      tgtSpeed = tgtSpeed || airplane.speed; // bug: tgtSpeed rarely becomes nan for undefined reasons
      airplane.speed += Math.min(s * config.accelerationSpeed * model.accelerationSpeed, Math.max(-s * config.deAccelerationSpeed * model.deAccelerationSpeed, tgtSpeed - airplane.speed));
      

      let tgtHeading;
      if (typeof airplane.tgtDirection === 'number') {
        tgtHeading = airplane.tgtDirection;
      } else if (typeof airplane.tgtDirection === 'string') {
        const cs = this.callsignsPos[airplane.tgtDirection];
        if (cs) {
          if (airplane.routeType === routeTypes.INBOUND && cs.ref.type === idType.RWY) {
            const rwyHdg = cs.ref.name1 === airplane.tgtDirection ? cs.ref.hdg1 : cs.ref.hdg2;
            const hdgToRwy = Math.atan2(cs.x - airplane.x, cs.y - airplane.y) * 180 / Math.PI;
            const deg = angleDistance(rwyHdg, hdgToRwy);
            let distance = (cs.x - airplane.x) / Math.sin(hdgToRwy * Math.PI / 180);
            let rwyAirplaneHdgDiff = angleDistance(airplane.heading, rwyHdg);
            const tooHigh = airplane.altitude > (distance * config.ilsSlopeSteepness * 2 + 500/* safety */);
            distance = isFinite(distance) ? distance : .1;
            if (airplane.altitude < 3200 && Math.abs(deg) < 20 && Math.abs(rwyAirplaneHdgDiff) < 20 && !tooHigh) {
              altChange = Math.min(100 * s, Math.max(-100 * s, Math.min(airplane.altitude, distance * config.ilsSlopeSteepness) - airplane.altitude));
            }
            if (airplane.altitude < 3200 && Math.abs(deg) < 20) {
              tgtHeading = rwyHdg + Math.min(45, Math.max(-45, Math.max(Math.abs(deg), 10/* weight */) * deg));
            } else if (airplane.altitude < 500 && Math.abs(rwyAirplaneHdgDiff) < 20) {
              //landed
              console.log(airplane, 'succesfully landed');
              this.arrivals++;
              this._remove.push(airplane);
              continue;
            } else {
              tgtHeading = airplane.heading;
            }
          } else
            tgtHeading = headingTo(airplane.x, airplane.y, this.callsignsPos[airplane.tgtDirection].x, this.callsignsPos[airplane.tgtDirection].y);
        } else {
          tgtHeading = airplane.heading;
        }
      }
      if (airplane.routeType !== routeTypes.INBOUND) {
        const wp = this.callsignsPos[airplane.outboundWaypoint];
        if ((Math.abs(airplane.x - wp.x) + Math.abs(airplane.y - wp.y)) < 15) {
          // enroute
          this.departures++;
          this._remove.push(airplane);
          continue;
        }
      }
      if (airplane.x < -3 || airplane.y < -3 || airplane.x > this.width + 3 || airplane.y > this.height + 3) {
        this.unpermittedDepartures++;
        this._remove.push(airplane);
        continue;
      }
      const isAtManeuveringSpeed = airplane.speed >= (airplanesById[airplane.typeId].landingSpeed - 0.01);
      const canChangeHeading = airplane.routeType !== routeTypes.OUTBOUND || airplane.altitude >= config.flyStraightAfterTakeoffUntilHeight - 10; /* manouvering height */

      if (isAtManeuveringSpeed) {
        airplane.altitude += altChange;
      }

      if (isAtManeuveringSpeed && canChangeHeading) {
        airplane.heading += Math.min(1 * s, Math.max(-1 * s, angleDistance(airplane.heading, tgtHeading)));
        airplane.heading = (airplane.heading + 360) % 360;
      }

      if (addPathEntry) {
        airplane.path.unshift([airplane.x, airplane.y]);
        if (airplane.path.length >= config.maxPathLen) airplane.path.pop();
      }
      // edge detection
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
                sepDistViolation = true;
              }
            }
          }
          this._edgeDetection[identity] = (sameIdentity || {});
          this._edgeDetection[identity][airplane.flight] = airplane;
        }
      }
    }
    for (const key in this._edgeDetection) {
      delete this._edgeDetection[key];
    }
    if (this._remove.length > 0) {
      for (let i = 0; i < this._remove.length; i++)
        this.traffic.splice(this.traffic.indexOf(this._remove[i]), 1);
      this._remove.length = 0;
    }
    if (sepDistViolation) this.distanceVialations++;
    this.emit('change');
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    clearInterval(this.newTrafficInterval)
    this.newTrafficInterval = null;
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
}

const persistanceProps = ['traffic', 'started', 'width', 'height', 'log', 'selfLog', 'pathCounter', 'mapName', 'arrivals', 'departures',
  'enroutes', 'distanceVialations', 'mapName', 'winddir', 'windspd', 'unpermittedDepartures'];

export default new GameStore();

