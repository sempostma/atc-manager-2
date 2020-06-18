import { EventEmitter } from 'events';
import Airplane from '../lib/airplane';
import config from '../lib/config';
import createVoiceCommandsInstance from '../lib/voice-commands'
import { clearToLand } from './gamestore-helpers/communications';
import {
  loadMap,
  angleDelta,
  headingTo,
  idType,
  activeRwys,
  callsignPositions,
  setCallsigns,
  parrelelLinesDistance,
  findHdgAround,
  hdgToVector,
  rwyHeading,
  testMSAViolation
} from '../lib/map';
import SettingsStore from './SettingsStore';
import {
  routeTypes,
  airplanesById,
  VFRStates
} from '../lib/airplane-library/airplane-library';
import { loadState } from '../lib/persistance';
import communications, { natoAlphabet } from '../lib/communications';
import {
  sendMessageWarning,
  sendMessageError,
  sendMessageInfo
} from '../components/GameMessages/GameMessages';
import { rndArr } from '../lib/util';
import { parseRoute, mostSuitableLeg } from '../lib/sidstar';
import { TakeoffRunwayAssignment } from '../lib/maps/runway-assignment';
import { minimumSeperationDistance } from './gamestore-helpers/seperation';

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
    this.weatherCounter = 0;
    this.waypoints = {};
    this.airport = {};
    this.callsigns = {};
    this.callsignsPos = {};
    this._remove = [];
    this._spawnPlaneCounter = 0;
    this.mapName = null;
    this.disableTakoffsOnRwysSet = {};
    this.zoom = 1;
    this.voiceCommands = null;
    const dt = new Date();
    this.time =
      dt.getSeconds() + 60 * dt.getMinutes() + 60 * 60 * dt.getHours();

    this.setMaxListeners(100);
  }

  adjustZoom = delta => {
    this.zoom = Math.min(
      config.maxZoom,
      Math.max(
        config.minZoom,
        this.zoom + this.zoom * (delta * config.zoomSpeed)
      )
    );
    this.emit('change');
  };

  getAtis() {
    return natoAlphabet[
      String.fromCharCode((this.atis % 26) + 97).toUpperCase()
    ];
  }

  rwyWaitingOn(airplane) {
    if (!SettingsStore.takeoffInOrder) return [];
    const index = this.traffic.indexOf(airplane);
    return this.traffic.filter(
      (x, i) => x.rwy === airplane.rwy && x.waiting && i < index
    );
  }

  startMap(mapName) {
    this.arrivals = 0;
    this.departures = 0;
    this.enroutes = 0;
    this.unpermittedDepartures = 0;
    this.distanceVialations = 0;
    this.msaViolations = 0;
    const map = this.map = loadMap(mapName);
    this.id = mapName;
    this.winddir = Math.random() * 360;
    this.altimeter = (29 + Math.random() * 2).toFixed(2);
    this.atis = Math.floor(Math.random() * 26);
    this.windspd = Math.random() * 12;
    this.setup(map);

    this.createInitialPlanes();
    this.resume();
  }

  createInitialPlanes = () => {
    const isAptCommercial = this.map.commercial >= this.map.ga || !SettingsStore.ga;
    // create planes (if airport isvfr(map.ga > map.commercial) 
    // then { spawn all vfr and one ifr } else { spawn all ifr and one vfr }
    for (let i = 0; i < SettingsStore.startingInboundPlanes; i++) {
      isAptCommercial
        ? this.newPlaneInbound()
        : this.newPlaneVFRInbound(Math.random() > 0.5);
    }
    for (let i = 0; i < SettingsStore.startingOutboundPlanes; i++) {
      isAptCommercial
        ? this.newPlaneOutbound()
        : this.newPlaneVFROutbound(Math.random() > 0.5);
    }
    if (SettingsStore.enroute) {
      for (let i = 0; i < SettingsStore.startingEnroutePlanes; i++) {
        isAptCommercial
          ? this.newPlaneEnroute()
          : this.newPlaneVFREnroute(Math.random() > 0.5);
      }
    }
    if (SettingsStore.ga && this.map.ga > 0) {
      isAptCommercial ? this.newPlaneVFROutbound() : this.newPlaneOutbound();
    }
  }

  startLocalstorage = saveName => {
    const state = loadState();
    const game = state.games[saveName];
    this.startSaved(game);
  };

  startSaved = game => {
    this.loadJson(game);
    const map = (this.map = loadMap(game.id));
    this.setup(map);
    this.resume();
  };

  setup(map) {
    this.waypoints = map.waypoints;
    this.waypoints.NORTH = {
      x: config.width / 2,
      y: config.height,
      type: idType.DIRECTION
    };
    this.waypoints.EAST = {
      x: config.width,
      y: config.height / 2,
      type: idType.DIRECTION
    };
    this.waypoints.SOUTH = {
      x: config.width / 2,
      y: 0,
      type: idType.DIRECTION
    };
    this.waypoints.WEST = {
      x: 0,
      y: config.height / 2,
      type: idType.DIRECTION
    };

    this.airport = map.airport;
    this._edgeDetection = {};
    this.sepDistanceVialotions = {};
    this.oldSepDistanceVialotions = {};
    this._oldMsaViolations = {};
    this.started = true;
    this.pathCounter = 0;
    this.weatherCounter = 0;
    this.parsedSids = Object.assign(
      {},
      ...Object.keys(map.sids).map(key => ({
        [key]: {
          class: 'route',
          type: idType.SID,
          route: parseRoute(map.sids[key], this.callsignsPos)
        }
      }))
    );
    this.parsedStars = Object.assign(
      {},
      ...Object.keys(map.stars).map(key => ({
        [key]: {
          class: 'route',
          type: idType.STAR,
          route: parseRoute(map.stars[key], this.callsignsPos)
        }
      }))
    );
    this.callsigns = setCallsigns(
      map,
      this.waypoints,
      this.parsedSids,
      this.parsedStars
    );
    this.callsignsPos = callsignPositions(
      map,
      this.waypoints,
      config.width,
      config.height
    );
    Object.assign(
      this.disableTakoffsOnRwysSet,
      ...map.airport.runways.map(rwy => ({
        [rwy.name1]: 'all',
        [rwy.name2]: 'all'
      }))
    );
    this.mapName = map.id;
    this.setupWaypoints(map);

    if (!this.interval) {
      this.interval = setInterval(this.update, config.updateInterval);
    }

    this.voiceCommands = createVoiceCommandsInstance({ waypoints: Object.keys(this.waypoints) });

    this.emit('change');
    this.emit('start');
  }

  setupWaypoints = () => {
    this.inboundWpOrdered = this.map.inboundWaypoints
      .slice(0)
      .sort(() => Math.random() - 0.5);
    this.outboundWpOrdered = this.map.outboundWaypoints
      .slice(0)
      .sort(() => Math.random() - 0.5);
  };

  spawnVFRPlane = () => {
    const opts = [
      this.newPlaneVFRClosedPattern.bind(this, Math.random() > 0.5),
      this.newPlaneVFRInbound.bind(this, Math.random() > 0.5),
      this.newPlaneVFROutbound
    ];
    if (SettingsStore.enroute) opts.push(this.newPlaneVFREnroute);
    rndArr(opts)();
  };

  newPlane = () => {
    if (this.paused || SettingsStore.stopSpawn) return;
    let rnd = Math.random();
    let trafficSum = this.map.ga + this.map.commercial;
    const opts = [this.newPlaneInbound, this.newPlaneOutbound];
    if (SettingsStore.ga && rnd < this.map.ga / trafficSum)
      opts.push(this.spawnVFRPlane);
    if (SettingsStore.enroute) opts.push(this.newPlaneEnroute);
    rndArr(opts)();
  };

  getRunway = (airplane, landing) => {
    let takeoffRunwayType = Airplane.isVFR(airplane) ? 'ga' : 'commercial';
    let activeRunways = activeRwys(this.airport, this.winddir);
    let activeRunwaysAssigned = activeRunways.filter(
      rwy =>
        this.disableTakoffsOnRwysSet[rwy] === 'all' ||
        this.disableTakoffsOnRwysSet[rwy] === takeoffRunwayType
    );
    // if the user has a preffered runway. Use that runway. 
    // If the user has al of the runways disabled choose one at random.
    let couldNotFindAssignedRwy = activeRunwaysAssigned.length === 0;
    if (activeRunwaysAssigned.length > 0) {
      activeRunways = activeRunwaysAssigned;
    }

    const model = airplanesById[airplane.typeId];

    const activeRunwayWithCorrectLength = activeRunways.filter(rwy => {
      const cs = this.callsigns[rwy];
      const len = (cs.name1 === rwy ? cs.length1 : cs.length2) || cs.length;
      const reqLen = landing
        ? model.landingMinRunwayLength
        : model.takeoffMinRunwayLength;
      return reqLen >= len;
    });
    if (activeRunwayWithCorrectLength.length > 0) {
      activeRunways = activeRunwayWithCorrectLength;
    }

    const item = activeRunways[Math.floor(Math.random() * activeRunways.length)];

    if (couldNotFindAssignedRwy) {
      const callsign = communications.getCallsign(airplane, true);
      const warning = 'No assigned takeoff runway for general aviation, '
        + `${callsign} was ordered to taxi to RWY ${item}.`;
      sendMessageWarning(warning);
    }

    return item;
  }

  newPlaneVFRClosedPattern = touchandgo => {
    let activeRunways = activeRwys(this.airport, this.winddir);
    let activeRunwaysAssigned = activeRunways.filter(
      rwy =>
        this.disableTakoffsOnRwysSet[rwy] !== 'none' &&
        this.disableTakoffsOnRwysSet[rwy] !== 'commercial'
    );
    // if the user has a preffered runway. Use that runway. 
    // If the user has al of the runways disabled choose one at random.
    let couldNotFindAssignedRwy = activeRunwaysAssigned.length === 0;
    if (activeRunwaysAssigned.length > 0) activeRunways = activeRunwaysAssigned;

    const item =
      activeRunways[Math.floor(Math.random() * activeRunways.length)];
    const rwy = this.callsignsPos[item];
    const hdg = rwy.ref.name1 === item ? rwy.ref.hdg1 : rwy.ref.hdg2;
    const airplane = Airplane.createVFRClosedPattern(
      rwy.x,
      rwy.y,
      hdg,
      item,
      touchandgo,
      this.map
    );
    this.traffic.push(airplane);


    if (couldNotFindAssignedRwy) {
      const callsign = communications.getCallsign(airplane, true);
      const warning = 'No assigned takeoff runway for general aviation, '
        + `${callsign} was ordered to taxi to RWY ${item}.`;
      sendMessageWarning(warning);
    }
  };

  newPlaneVFREnroute = () => {
    const map = this.map;

    const side = Math.floor(Math.random() * 4);
    const x =
      side === 1 ? config.width : side === 3 ? 0 : Math.random() * config.width;
    const y =
      side === 0
        ? config.height
        : side === 2
          ? 0
          : Math.random() * config.height;

    const tgtSides = [0, 1, 2, 3];
    tgtSides.splice(tgtSides.indexOf(side), 1);
    const tgtside = tgtSides.sort(a => Math.random() - 0.5).pop();
    const xt =
      tgtside === 1 ? config.width : tgtside === 3 ? 0 : 0.5 * config.width;
    const yt =
      tgtside === 0 ? config.height : tgtside === 2 ? 0 : 0.5 * config.height;
    const outboundWaypoint = ['NORTH', 'EAST', 'SOUTH', 'WEST'][tgtside];

    let heading = Math.floor(headingTo(x, y, xt, yt) + 360) % 360;
    const airplane = Airplane.createVFREnroute(
      x,
      y,
      heading,
      outboundWaypoint,
      map
    );
    this.traffic.push(airplane);
  };

  newPlaneVFRInbound = touchandgo => {
    const map = this.map;
    if (this.inboundWpOrdered.length === 0) {
      this.inboundWpOrdered = map.inboundWaypoints
        .slice(0)
        .sort(() => Math.random() - 0.5);
    }
    const inboundWaypoint = this.inboundWpOrdered.pop();
    const pos = this.callsignsPos[inboundWaypoint];
    let mx = config.width / 2;
    let my = config.height / 2;
    let heading = Math.floor(headingTo(pos.x, pos.y, mx, my)) % 360;
    const airplane = Airplane.createVFRInbound(
      pos.x,
      pos.y,
      heading,
      touchandgo,
      map
    );
    this.traffic.push(airplane);
  };

  newPlaneVFROutbound = () => {
    const outboundWaypoint = ['NORTH', 'EAST', 'SOUTH', 'WEST'][
      Math.floor(Math.random() * 4)
    ];
    const assignment = new TakeoffRunwayAssignment(
      this.map,
      this.callsignsPos,
      this.disableTakoffsOnRwysSet,
      this.windspd,
      this.winddir
    );

    const airplane = Airplane.createVFROutbound(
      assignment,
      outboundWaypoint,
      this.map
    );

    const model = Airplane.getModel(airplane);
    const { couldNotFindAssignedRwy, rwy } = assignment.getMeta(model);

    const callsign = communications.getCallsign(airplane, true);

    if (couldNotFindAssignedRwy) {
      const callsign = communications.getCallsign(airplane, true);
      sendMessageWarning(
        'No assigned takeoff runway for general aviation, '
        + `${callsign} was ordered to taxi to RWY ${rwy}.`
      );
    }

    this.traffic.push(airplane);

    // has atis
    const msg = this.airport.callsign + ' approach, with you for ' + rwy + '.';
    this.addLog(msg, callsign);

    const atcMsg =
      callsign +
      ', ' +
      this.airport.callsign +
      ' approach, hold short ' +
      rwy +
      '.';
    this.addLog(atcMsg, 'ATC');

    const readBackMsg = 'Roger hold short of ' + rwy + ', ' + callsign + '.';
    this.addLog(readBackMsg, callsign);
  };

  newPlaneEnroute = () => {
    const map = this.map;
    if (this.inboundWpOrdered.length === 0) {
      this.inboundWpOrdered = map.inboundWaypoints
        .slice(0)
        .sort(() => Math.random() - 0.5);
    }
    if (this.outboundWpOrdered.length === 0) {
      this.outboundWpOrdered = map.outboundWaypoints
        .slice(0)
        .sort(() => Math.random() - 0.5);
    }
    const inboundWaypoint = this.inboundWpOrdered.pop();
    const pos = this.callsignsPos[inboundWaypoint];

    const outboundWaypoint = this.outboundWpOrdered.pop();
    const tgt = this.callsignsPos[outboundWaypoint];

    let heading = Math.floor(headingTo(pos.x, pos.y, tgt.x, tgt.y)) % 360;
    const airplane = Airplane.createEnroute(
      pos.x,
      pos.y,
      heading,
      outboundWaypoint,
      map
    );
    this.traffic.push(airplane);

    // TODO: Speech for outbound
    // const callsign = communications.getCallsign(airplane, true);
    // if (Math.random() > .5) {
    //   // has atis
    //   const msg = this.airport.callsign + ' approach, ' + callsign + ' at ' 
    // + Math.floor(airplane.altitude / 100) + ' with ' + this.getAtis() + '.';
    //   this.addLog(msg, callsign);

    //   const atcMsg = callsign + ', ' + this.airport.callsign + 
    // ' approach, maintain current heading.';
    //   this.addLog(atcMsg, 'ATC');
    // } else {
    //   // does not have atis
    //   const msg = this.airport.callsign + ' approach, ' + callsign + ' at ' 
    // + Math.floor(airplane.altitude / 100) + '.';
    //   this.addLog(msg, callsign);

    //   const atcMsg = callsign + ', information ' + this.getAtis() 
    // + ' is current, altimeter ' + this.altimeter + 
    // ', maintain current heading.';
    //   this.addLog(atcMsg, 'ATC');
    // }
  };

  newPlaneInbound = () => {
    const map = this.map;
    if (this.inboundWpOrdered.length === 0) {
      this.inboundWpOrdered = map.inboundWaypoints
        .slice(0)
        .sort(() => Math.random() - 0.5);
    }
    const inboundWaypoint = this.inboundWpOrdered.pop();
    const pos = this.callsignsPos[inboundWaypoint];
    let mx = config.width / 2;
    let my = config.height / 2;
    let heading = Math.floor(headingTo(pos.x, pos.y, mx, my)) % 360;
    const airplane = Airplane.createInbound(pos.x, pos.y, heading, map);
    this.traffic.push(airplane);

    this.voiceCommands.addAirplane(airplane);

    const callsign = communications.getCallsign(airplane, true);
    if (Math.random() > 0.5) {
      // has atis
      const msg =
        this.airport.callsign +
        ' approach, ' +
        callsign +
        ' at ' +
        Math.floor(airplane.altitude / 100) +
        ' with ' +
        this.getAtis() +
        '.';
      this.addLog(msg, callsign);
      const atcMsg =
        callsign +
        ', ' +
        this.airport.callsign +
        ' approach, maintain current heading.';
      this.addLog(atcMsg, 'ATC');
    } else {
      // does not have atis
      const msg =
        this.airport.callsign +
        ' approach, ' +
        callsign +
        ' at ' +
        Math.floor(airplane.altitude / 100) +
        '.';
      this.addLog(msg, callsign);
      const atcMsg =
        callsign +
        ', information ' +
        this.getAtis() +
        ' is current, altimeter ' +
        this.altimeter +
        ', maintain current heading.';
      this.addLog(atcMsg, 'ATC');
    }
  };

  // deprecated
  _newPlaneInboundOnEdge = () => {
    const hdgVar = config.headingInitVariation;
    let side = Math.floor(Math.random() * 4);
    let x =
      side === 1 ? config.width : side === 3 ? 0 : Math.random() * config.width;
    let y =
      side === 0
        ? config.height
        : side === 2
          ? 0
          : Math.random() * config.height;
    let mx = config.width / 2;
    let my = config.height / 2;
    let heading =
      Math.floor(
        headingTo(x, y, mx, my) - hdgVar * 0.5 + Math.random() * hdgVar
      ) % 360;
    this.traffic.push(
      Airplane.create(x, y, heading, routeTypes.INBOUND, false, this.map)
    );
  };

  newPlaneOutbound = () => {
    const outboundWaypoint = this.map.outboundWaypoints[
      Math.floor(Math.random() * this.map.outboundWaypoints.length)
    ];
    const runwayAssignment = new TakeoffRunwayAssignment(this.map, this.callsignsPos, this.disableTakoffsOnRwysSet, this.windspd, this.winddir);
    const airplane = Airplane.createOutbound(
      runwayAssignment,
      outboundWaypoint,
      this.map
    );
    const { rwy } = airplane;
    this.traffic.push(airplane);

    this.voiceCommands.addAirplane(airplane);

    const callsign = communications.getCallsign(airplane, true);

    // has atis
    const msg = this.airport.callsign + ' approach, with you for ' + rwy + '.';
    this.addLog(msg, callsign);

    const atcMsg =
      callsign +
      ', ' +
      this.airport.callsign +
      ' approach, hold short ' +
      rwy +
      '.';
    this.addLog(atcMsg, 'ATC');

    const readBackMsg = 'Roger hold short of ' + rwy + ', ' + callsign + '.';
    this.addLog(readBackMsg, callsign);
  };

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

  addLog = (msg, self) => {
    this.log.push(self + ': ' + msg);
    if (self === 'ATC') this.selfLog.push(self + ': ' + msg);
    this.emit('change');
  }

  toJson = () => {
    const ret = {};
    for (let i = 0; i < persistanceProps.length; i++) {
      ret[persistanceProps[i]] = this[persistanceProps[i]];
    }
    return ret;
  }

  loadJson = state => {
    for (let i = 0; i < persistanceProps.length; i++) {
      this[persistanceProps[i]] = state[persistanceProps[i]];
    }
  }

  setSvgEl = el => {
    this.svgEl = el;
  }

  trySpawn() {
    this._spawnPlaneCounter += config.updateInterval * SettingsStore.speed;
    if (this._spawnPlaneCounter > SettingsStore.newPlaneInterval * 1000) {
      this._spawnPlaneCounter %= SettingsStore.newPlaneInterval;
      this.newPlane();
    }
  }

  update = () => {
    if (this.paused) return;
    const s = config.globalSpeed * SettingsStore.speed;
    this.trySpawn();
    this.pathCounter =
      ++this.pathCounter % Math.floor(config.pathCounterUpdateEvery / s);
    this.weatherCounter =
      ++this.weatherCounter % Math.floor(config.updateWeatherEvery / s);
    for (const key in this.oldSepDistanceVialotions)
      delete this.oldSepDistanceVialotions[key];
    Object.assign(this.oldSepDistanceVialotions, this.sepDistanceVialotions);
    for (const key in this.sepDistanceVialotions)
      delete this.sepDistanceVialotions[key];
    this.traffic.forEach(this.planeUpdate);
    for (const key in this._edgeDetection) delete this._edgeDetection[key];
    for (let i = 0; i < this._remove.length; i++) {
      delete this._oldMsaViolations[
        communications.getCallsign(this._remove[i], true)
      ];
      Airplane.remove(this._remove[i]);
      this.traffic.splice(this.traffic.indexOf(this._remove[i]), 1);
    }
    this._remove.length = 0;
    this.time += s;
    this.time %= 86400; // seconds in a year
    if (this.weatherCounter === 0) {
      this.winddir = wrapHeadig(
        this.winddir + (Math.random() - 0.5) * s * config.windDirChange
      );
      this.windspd = Math.max(
        config.windSpdMin,
        Math.min(
          config.windSpdMax,
          this.windspd + (Math.random() - 0.5) * s * config.windSpdChange
        )
      );
      if (
        this.windspd > config.roughWindSpd &&
        Math.random() < config.windRandomChangeOfLoweringWhenRoughWindSpd
      )
        this.windspd -= Math.random();
    }
    this.emit('change');
    this.emit('update');
  };

  planeUpdate = (airplane, i) => {
    if (airplane.waiting) return;

    const model = airplanesById[airplane.typeId];
    const s = config.globalSpeed * SettingsStore.speed;
    const dx = Math.sin((airplane.heading * Math.PI) / 180);
    const dy = Math.cos((airplane.heading * Math.PI) / 180);
    let tgtHeading = airplane.heading;
    let spdChange = 0;
    let altChange = Math.min(
      config.climbSpeed * model.climbSpeed * s,
      Math.max(
        -config.descendSpeed * model.descendSpeed * s,
        airplane.tgtAltitude - airplane.altitude
      )
    );
    let tgtSpeed =
      airplane.altitude < 10000 && airplane.tgtSpeed > 250
        ? Math.min(250, airplane.tgtSpeed)
        : airplane.tgtSpeed;
    let landing = false;

    airplane.x += dx * s * airplane.speed * config.baseAirplaneSpeed;
    airplane.y += dy * s * airplane.speed * config.baseAirplaneSpeed;

    const isAtManeuveringSpeed =
      airplane.speed >= airplanesById[airplane.typeId].landingSpeed - 0.01;
    const exceeds250Multiplier = (airplane.speed - 250) * 0.01 + 5;
    const canChangeHeading =
      airplane.routeType !== routeTypes.OUTBOUND ||
      airplane.altitude >=
      config.flyStraightAfterTakeoffUntilHeight - 10; /* manouvering height */
    if (
      airplane.altitude >= 10000 &&
      airplane.tgtSpeed > 250.001 &&
      airplane.tgtAltitude < 10000
    ) {
      // 250kts speed rule check
      if (altChange * exceeds250Multiplier + airplane.altitude < 10000)
        airplane.tgtSpeed = 250; // slow down to 250kts
    }
    if (
      airplane.altitude >= 10000 &&
      airplane.speed > 250.001 &&
      airplane.tgtAltitude < 10000
    ) {
      if (airplane.altitude + altChange < 10000)
        altChange = 10000 - airplane.altitude; // don't descend < fl100 < 250kts
    }

    const trafficDirection = 'left';
    const trafficDirectionMult = trafficDirection ? -1 : 1;

    const shouldFindHeadingAround =
      airplane.routeType === routeTypes.VFR_ENROUTE ||
      (airplane.routeType === routeTypes.VFR_OUTBOUND &&
        airplane.tgtVfrState === VFRStates.OWN_DISCRETION &&
        airplane.altitude > 800 + this.airport.elevation);

    const outsideControlAreaRadius =
      Math.pow(airplane.x - (this.airport.x + config.width / 2), 2) +
      Math.pow(airplane.y - (this.airport.y + config.height / 2), 2) >
      Math.pow(config.controlAreaRadius + 5, 2);

    if (
      outsideControlAreaRadius &&
      airplane.routeType === routeTypes.VFR_OUTBOUND &&
      airplane.tgtVfrState === VFRStates.STRAIGHT_OUT
    ) {
      // TODO: Speech
      airplane.tgtVfrState = VFRStates.OWN_DISCRETION;
    }

    if (
      outsideControlAreaRadius &&
      airplane.routeType === routeTypes.VFR_OUTBOUND &&
      airplane.tgtVfrState === VFRStates.EXIT_45_DEG_OUT
    ) {
      // TODO: Speech
      airplane.tgtVfrState = VFRStates.OWN_DISCRETION;
    }

    if (typeof airplane.tgtDirection === 'number')
      tgtHeading = airplane.tgtDirection;
    // heading
    else if (typeof airplane.tgtDirection === 'string') {
      // waypoint
      const waypointPosition = this.callsignsPos[airplane.tgtDirection];
      if (waypointPosition) {
        if (airplane.tgtVfrState === VFRStates.STRAIGHT_OUT) {
          const outboundRwy = this.callsignsPos[airplane.rwy];
          tgtHeading = rwyHeading(outboundRwy, airplane.rwy);
        } else if (airplane.tgtVfrState === VFRStates.EXIT_45_DEG_OUT) {
          const outboundRwy = this.callsignsPos[airplane.rwy];
          tgtHeading = rwyHeading(outboundRwy, airplane.rwy);
          if (airplane.altitude > 800) {
            tgtHeading = wrapHeadig(tgtHeading + 45 * trafficDirectionMult);
          }
        } else if (waypointPosition.ref.type === idType.RWY) {
          if (Airplane.isVFR(airplane)) vfrPattern.call(this, waypointPosition);
          else if (airplane.routeType === routeTypes.INBOUND)
            tryLand.call(this, waypointPosition);
        } else
          tgtHeading = headingTo(
            airplane.x,
            airplane.y,
            waypointPosition.x,
            waypointPosition.y
          );
      } else if (this.callsigns[airplane.tgtDirection].class === 'route') {
        route.call(this);
      }
    }

    if (shouldFindHeadingAround) {
      tgtHeading = findHdgAround(
        this.airport.x + config.width / 2,
        this.airport.y + config.height / 2,
        config.controlAreaRadius + 50,
        airplane.x,
        airplane.y,
        headingTo(
          airplane.x,
          airplane.y,
          this.callsignsPos[airplane.tgtDirection].x,
          this.callsignsPos[airplane.tgtDirection].y
        ),
        this.callsignsPos[airplane.tgtDirection].x,
        this.callsignsPos[airplane.tgtDirection].y
      );
    }

    spdChange = Math.min(
      s * config.accelerationSpeed * model.accelerationSpeed,
      Math.max(
        -s * config.deAccelerationSpeed * model.deAccelerationSpeed,
        tgtSpeed - airplane.speed
      )
    );
    if (spdChange < 0 && altChange < 0 && !landing)
      /* descelerating and descending */ altChange *=
        model.descendRatioWhileDecelerating;

    if (isAtManeuveringSpeed) airplane.altitude += altChange;
    airplane.speed += spdChange;

    if (
      airplane.routeType === routeTypes.OUTBOUND ||
      airplane.routeType === routeTypes.ENROUTE ||
      airplane.routeType === routeTypes.VFR_OUTBOUND ||
      airplane.routeType === routeTypes.VFR_ENROUTE
    ) {
      const wp = this.callsignsPos[airplane.outboundWaypoint];
      if (Math.abs(airplane.x - wp.x) + Math.abs(airplane.y - wp.y) < 15) {
        this.departures++;
        this._remove.push(airplane);
        return;
      }
    }

    if (Airplane.isVFR(airplane)) {
      collisionAvoidance.call(this);
    }

    if (isAtManeuveringSpeed && canChangeHeading) {
      const maxTurnDeg =
        Airplane.getTurningRate(airplane) * s * config.turnRate;
      airplane.heading += Math.min(
        maxTurnDeg,
        Math.max(-maxTurnDeg, angleDelta(airplane.heading, tgtHeading))
      );
      airplane.heading = (airplane.heading + 360) % 360;
    }

    if (testMSAViolation(this.map, airplane)) {
      if (!this._oldMsaViolations[communications.getCallsign(airplane, true)]) {
        this.msaViolations++;
        this._oldMsaViolations[
          communications.getCallsign(airplane, true)
        ] = true;
        sendMessageError(
          communications.getCallsign(airplane, false) + ' is too low.'
        );
      }
    } else {
      delete this._oldMsaViolations[communications.getCallsign(airplane, true)];
    }

    if (this.pathCounter === 0) {
      if (!airplane.path) airplane.path = [];
      airplane.path.unshift([airplane.x, airplane.y]);
      if (airplane.path.length >= config.maxPathLen) airplane.path.pop();
    }

    if (
      airplane.x < -3 ||
      airplane.y < -3 ||
      airplane.x > config.width + 3 ||
      airplane.y > config.height + 3
    ) {
      this.unpermittedDepartures++;
      const callsign = communications.getCallsign(airplane, true);
      const goal = airplane.outboundWaypoint || 'the airport';
      const error = `${callsign} wrongfully exited the map. ` +
        `It should have exited the map at ${goal}.`;
      sendMessageError(error);
      this._remove.push(airplane);
      return;
    }

    if (edgeDetectionViolation.call(this)) this.distanceVialations++;

    // END

    function vfrPattern(rwyPos) {
      const rwyElev =
        rwyPos.ref.name1 === airplane.tgtDirection
          ? rwyPos.ref.elevation1
          : rwyPos.ref.elevation2;
      const rwyHdg =
        rwyPos.ref.name1 === airplane.tgtDirection
          ? rwyPos.ref.hdg1
          : rwyPos.ref.hdg2;
      const hdgToRwy =
        ((Math.atan2(rwyPos.x - airplane.x, rwyPos.y - airplane.y) * 180) /
          Math.PI +
          360) %
        360;
      const distanceToRwyPos = Math.sqrt(
        Math.pow(rwyPos.x - airplane.x, 2) + Math.pow(rwyPos.y - airplane.y, 2)
      );
      const deg = angleDelta(rwyHdg, hdgToRwy);
      const within45DegILS = Math.abs(deg) < 45;
      const within45DegILSOpposite =
        Math.abs(angleDelta(rwyHdg, hdgToRwy + 180)) < 45;
      const rwyHdgDelta =
        angleDelta(rwyHdg, airplane.heading) * trafficDirectionMult;
      const perpendicularDistance = parrelelLinesDistance(
        airplane.x,
        airplane.y,
        rwyPos.x,
        rwyPos.y,
        rwyHdg
      );
      const parrelelDistance = parrelelLinesDistance(
        airplane.x,
        airplane.y,
        rwyPos.x,
        rwyPos.y,
        rwyHdg + 90
      );
      const rwyMiddleX = config.width / 2 + this.airport.x + rwyPos.ref.x;
      const rwyMiddleY = config.height / 2 + this.airport.y + rwyPos.ref.y;
      const goodSideOfRwy =
        angleDelta(hdgToRwy, rwyHdg) * trafficDirectionMult >= 0;

      const perpendicularDistMin = 12;
      const perpendicularDistMax = 30;
      const perpendicularDistMaxPreffered = 17;

      if (
        Airplane.isVFR(airplane) &&
        airplane.altitude > 1010 + rwyElev &&
        (airplane.routeType === routeTypes.VFR_INBOUND ||
          airplane.routeType === routeTypes.VFR_INBOUND_TG)
      ) {
        if (airplane.tgtVfrState === VFRStates.STRAIGHT_IN) {
          const vector = hdgToVector(rwyHdg);
          const lineupVector = [
            vector[0] * config.inboundPatternEntryDistance,
            vector[1] * config.inboundPatternEntryDistance
          ];

          const entry1 = [
            rwyMiddleX - lineupVector[1] * 0.5 - lineupVector[0],
            rwyMiddleY + lineupVector[0] * 0.5 - lineupVector[1]
          ];
          const entry2 = [
            rwyMiddleX + lineupVector[1] * 0.5 - lineupVector[0],
            rwyMiddleY - lineupVector[0] * 0.5 - lineupVector[1]
          ];
          const entry3 = [
            rwyMiddleX - lineupVector[0] * 1.5,
            rwyMiddleY - lineupVector[1] * 1.5
          ];

          const entry1Dist = Math.sqrt(
            Math.pow(entry1[0] - airplane.x, 2) +
            Math.pow(entry1[1] - airplane.y, 2)
          );
          const entry2Dist = Math.sqrt(
            Math.pow(entry2[0] - airplane.x, 2) +
            Math.pow(entry2[1] - airplane.y, 2)
          );
          const entry3Dist = Math.sqrt(
            Math.pow(entry3[0] - airplane.x, 2) +
            Math.pow(entry3[1] - airplane.y, 2)
          );

          if (entry1Dist < 5 || entry2Dist < 5 || entry3Dist < 5) {
            airplane.tgtAltitude = Math.min(
              airplane.tgtAltitude,
              1000 + rwyElev
            );
          } else {
            airplane.tgtAltitude = Math.max(airplane.altitude, 2000 + rwyElev);
            if (entry1Dist < entry2Dist && entry1Dist < entry3Dist) {
              tgtHeading = headingTo(
                airplane.x,
                airplane.y,
                entry1[0],
                entry1[1]
              );
            } else if (entry2Dist < entry3Dist) {
              tgtHeading = headingTo(
                airplane.x,
                airplane.y,
                entry2[0],
                entry2[1]
              );
            } else {
              tgtHeading = headingTo(
                airplane.x,
                airplane.y,
                entry3[0],
                entry3[1]
              );
            }
          }

          if (within45DegILS && airplane.dirty) {
            tryLand.call(this, rwyPos);
          }
        } else {
          const vector = hdgToVector(rwyHdg);
          const entry1 = [
            rwyMiddleX - vector[1] * config.inboundPatternEntryDistance,
            rwyMiddleY + vector[0] * config.inboundPatternEntryDistance
          ];
          const entry2 = [
            rwyMiddleX + vector[1] * config.inboundPatternEntryDistance,
            rwyMiddleY - vector[0] * config.inboundPatternEntryDistance
          ];

          const entry1Dist = Math.sqrt(
            Math.pow(entry1[0] - airplane.x, 2) +
            Math.pow(entry1[1] - airplane.y, 2)
          );
          const entry2Dist = Math.sqrt(
            Math.pow(entry2[0] - airplane.x, 2) +
            Math.pow(entry2[1] - airplane.y, 2)
          );

          if (
            perpendicularDistance <= perpendicularDistMax &&
            goodSideOfRwy &&
            perpendicularDistance >= perpendicularDistMin
          ) {
            airplane.tgtAltitude = 1000 + rwyElev;
            if (
              perpendicularDistance < perpendicularDistMin ||
              goodSideOfRwy === false
            )
              tgtHeading = wrapHeadig(rwyHdg + 135 * trafficDirectionMult);
            else if (
              perpendicularDistance > perpendicularDistMaxPreffered &&
              goodSideOfRwy
            )
              tgtHeading = wrapHeadig(rwyHdg + 225 * trafficDirectionMult);
            else tgtHeading = wrapHeadig(rwyHdg + 180 * trafficDirectionMult);
            tgtSpeed = Math.min(model.topSpeed, config.maxTrafficPatternSpeed);
          } else if (
            distanceToRwyPos < config.inboundPatternEntryDistance ||
            entry1Dist < 5 ||
            entry2Dist < 5
          ) {
            if (perpendicularDistance > perpendicularDistMin) {
              tgtHeading = headingTo(
                airplane.x,
                airplane.y,
                rwyMiddleX,
                rwyMiddleY
              );
              airplane.tgtAltitude = 2000 + rwyElev;
            }
          } else {
            airplane.tgtAltitude = Math.max(airplane.altitude, 2000 + rwyElev);
            if (entry1Dist < entry2Dist) {
              tgtHeading = headingTo(
                airplane.x,
                airplane.y,
                entry1[0],
                entry1[1]
              );
            } else {
              tgtHeading = headingTo(
                airplane.x,
                airplane.y,
                entry2[0],
                entry2[1]
              );
            }
          }
        }
        return;
      }

      let final =
        (within45DegILS && Math.abs(deg) < 91) ||
        airplane.altitude < 790 + rwyElev;
      if (airplane.routeType === routeTypes.VFR_CLOSED_PATTERN_TG) {
        final =
          (within45DegILS && Math.abs(deg) < 91) ||
          airplane.altitude < 790 + rwyElev;
      }

      const validLeg = (leg, naturalValid) => {
        if (legsOrder[leg] > legsOrder[airplane.tgtVfrState]) return false;
        else return naturalValid;
      };

      const legs = {
        [VFRStates.RWY]: () => {
          airplane.tgtAltitude = 800 + rwyElev;
          tgtHeading = rwyHdg;
          tgtSpeed = Math.min(model.topSpeed, config.maxTrafficPatternSpeed);
          tryLand.call(this, rwyPos);
        },
        [VFRStates.FINAL]: () => {
          airplane.tgtAltitude = 800 + rwyElev;
          tgtHeading = rwyHdg;
          tgtSpeed = Math.min(model.topSpeed, config.maxTrafficPatternSpeed);
          tryLand.call(this, rwyPos);
        },
        [VFRStates.BASE]: () => {
          airplane.dirty = true;
          airplane.tgtAltitude = 800 + rwyElev;
          tgtHeading = wrapHeadig(rwyHdg + 270 * trafficDirectionMult);
          tgtSpeed = Math.min(model.topSpeed, config.maxTrafficPatternSpeed);
        },
        [VFRStates.DOWNWIND]: () => {
          airplane.dirty = true;
          airplane.tgtAltitude = 1000 + rwyElev;
          if (
            perpendicularDistance < perpendicularDistMin ||
            goodSideOfRwy === false
          )
            tgtHeading = wrapHeadig(rwyHdg + 135 * trafficDirectionMult);
          else if (
            perpendicularDistance > perpendicularDistMaxPreffered &&
            goodSideOfRwy
          )
            tgtHeading = wrapHeadig(rwyHdg + 225 * trafficDirectionMult);
          else tgtHeading = wrapHeadig(rwyHdg + 180 * trafficDirectionMult);
          tgtSpeed = Math.min(model.topSpeed, config.maxTrafficPatternSpeed);
        },
        [VFRStates.CROSSWIND]: () => {
          airplane.dirty = true;
          airplane.tgtAltitude = 1000 + rwyElev;
          tgtHeading = wrapHeadig(rwyHdg + 90 * trafficDirectionMult);
          tgtSpeed = Math.min(model.topSpeed, config.maxTrafficPatternSpeed);
        },
        [VFRStates.UPWIND]: () => {
          airplane.tgtAltitude = 1000 + rwyElev;
          airplane.tgtHeading = rwyHdg;
          tgtHeading = wrapHeadig(rwyHdg);
          tgtSpeed = Math.min(model.topSpeed, config.maxTrafficPatternSpeed);
        }
      };

      // upwind
      if (
        validLeg(
          VFRStates.FINAL,
          final && Math.abs(rwyHdgDelta) < 91 && airplane.dirty
        )
      ) {
        // final
        legs[VFRStates.FINAL]();
      } else if (
        validLeg(VFRStates.BASE, within45DegILS && parrelelDistance > 25)
      ) {
        // base
        legs[VFRStates.BASE]();
      } else if (
        validLeg(
          VFRStates.DOWNWIND,
          perpendicularDistance > perpendicularDistMin
        )
      ) {
        // downwind
        legs[VFRStates.DOWNWIND]();
      } else if (
        validLeg(
          VFRStates.CROSSWIND,
          rwyHdgDelta < 91 &&
          rwyHdgDelta > -1 &&
          within45DegILSOpposite &&
          airplane.altitude + rwyElev > 800 &&
          distanceToRwyPos > 20
        )
      ) {
        // crosswind
        legs[VFRStates.CROSSWIND]();
      } else if (
        validLeg(VFRStates.UPWIND, rwyHdgDelta < 1 && rwyHdgDelta > -1)
      ) {
        // upwind
        legs[VFRStates.UPWIND]();
      } else {
        if (legs[airplane.tgtVfrState]) {
          legs[airplane.tgtVfrState]();
        }
      }
    }

    function edgeDetectionViolation() {
      let airplaneSepDistViolation = false;
      const t = config.threeMileRuleDistance,
        x = Math.round(airplane.x / t),
        y = Math.round(airplane.y / t);
      for (let a = 0; a < 2; a++) {
        for (let i = 0; i < 9; i++) {
          const identity = `${Math.round(x + (i % 3) - 1)}x${Math.round(
              y + i / 3 - 1
            )}/${Math.floor(airplane.altitude * 0.0005) + a}`,
            sameIdentity = this._edgeDetection[identity];
          if (
            sameIdentity &&
            !sameIdentity[communications.getCallsign(airplane, true)]
          ) {
            // do actual calculation
            for (const key in sameIdentity) {
              const oa = sameIdentity[key];
              if (Math.abs(oa.altitude - airplane.altitude) > 995) continue;
              const xd = Math.abs(airplane.x - oa.x) / t;
              const yd = Math.abs(airplane.y - oa.y) / t;
              const dist = xd * xd + yd * yd;
              const minDistance = minimumSeperationDistance(airplane);
              if (dist < 1) {
                if (
                  dist >= minDistance &&
                  (Airplane.isVFR(airplane) || Airplane.isVFR(oa))
                ) return;
                this.sepDistanceVialotions[
                  communications.getCallsign(oa, true)
                ] = airplane;
                this.sepDistanceVialotions[
                  communications.getCallsign(airplane, true)
                ] = oa;
                airplaneSepDistViolation = true;
              }
            }
          }
          this._edgeDetection[identity] = sameIdentity || {};
          this._edgeDetection[identity][
            communications.getCallsign(airplane, true)
          ] = airplane;
        }
      }
      return airplaneSepDistViolation;
    }

    function collisionAvoidance() {
      const oa = this.oldSepDistanceVialotions[
        communications.getCallsign(airplane, true)
      ];
      if (oa) {
        const hdgTo = headingTo(airplane.x, airplane.y, oa.x, oa.y);
        const headingToDelta = angleDelta(airplane.heading, hdgTo);

        const maxAngle = 100;

        if (headingToDelta >= -10 && headingToDelta <= maxAngle) {
          tgtHeading = wrapHeadig(hdgTo - maxAngle - 0.1);
        } else if (headingToDelta < -10 && headingToDelta >= maxAngle) {
          tgtHeading = wrapHeadig(hdgTo + maxAngle + 0.1);
        }
      }
    }

    function route() {
      const routeObj = this.callsigns[airplane.tgtDirection];

      const { best, complete } = mostSuitableLeg(
        airplane,
        routeObj,
        this.callsignsPos
      );
      const from = this.callsignsPos[best.from.dir];
      const to = this.callsignsPos[best.to.dir];

      let hdgToTgt = headingTo(airplane.x, airplane.y, to.x, to.y);
      let legHdg = headingTo(from.x, from.y, to.x, to.y);
      let deg = angleDelta(legHdg, hdgToTgt);

      if (complete) {
        if (typeof best.dir === 'number') {
          tgtHeading = airplane.tgtDirection = best.to.dir;
        } else {
          airplane.tgtDirection = best.to.dir;
        }
      } else {
        if (typeof best.dir === 'number') {
          tgtHeading = best.to.dir;
        } else {
          if (Math.abs(deg) < 45) {
            // tracking
            const multiplier = 1 - airplane.speed * 0.001;
            const hdg =
              Math.max(Math.abs(deg), 10 /* weight */) * multiplier * deg;
            tgtHeading = legHdg + Math.min(45, Math.max(-45, hdg));
          } else {
            // direct to next waypoint
            tgtHeading = hdgToTgt;
          }
        }
      }

      const toTest = [hdgToTgt, legHdg, deg, tgtHeading, airplane.heading];
      toTest.push(airplane.tgtDirection);

      // nan testing
      // if (toTest.some(x => (typeof airplane.tgtDirection === 'number'
      //   && isNaN(x)) || x === 'NaN' || x === undefined)) throw 'dis is nan';
    }

    function tryLand(rwyPos) {
      const rwyHdg =
        rwyPos.ref.name1 === airplane.tgtDirection
          ? rwyPos.ref.hdg1
          : rwyPos.ref.hdg2;
      const rwyElev =
        rwyPos.ref.name1 === airplane.tgtDirection
          ? rwyPos.ref.elevation1
          : rwyPos.ref.elevation2;
      const hdgToRwy =
        (Math.atan2(rwyPos.x - airplane.x, rwyPos.y - airplane.y) * 180) /
        Math.PI;
      const deg = angleDelta(rwyHdg, hdgToRwy);
      let distance =
        (rwyPos.x - airplane.x) / Math.sin((hdgToRwy * Math.PI) / 180);
      let rwyAirplaneHdgDiff = angleDelta(airplane.heading, rwyHdg);
      const tooHigh =
        airplane.altitude >
        distance * config.ilsSlopeSteepness * 2 + (500 + rwyElev) /* safety */;
      distance = isFinite(distance) ? distance : 0.1;
      landing = true;

      const isTouchAndGo =
        airplane.routeType === routeTypes.VFR_CLOSED_PATTERN_TG ||
        airplane.routeType === routeTypes.VFR_INBOUND_TG;

      if (Math.abs(deg) < 20 && Math.abs(rwyAirplaneHdgDiff) < 20 && !tooHigh) {
        if (!tooHigh) {
          altChange = Math.min(
            100 * s,
            Math.max(
              -100 * s,
              Math.min(
                airplane.tgtAltitude,
                distance * config.ilsSlopeSteepness + rwyElev
              ) - airplane.altitude
            )
          );
        }
        tgtSpeed = Math.min(200, tgtSpeed);
        if (airplane.altitude < 1990) {
          tgtSpeed = Math.min(model.minSpeed + 20, tgtSpeed);
        }
        if (airplane.altitude < 1300 - rwyElev) {
          if (!airplane.landing && airplane.altitude > 600 - rwyElev) {
            clearToLand(airplane, airplane.tgtDirection);
            airplane.landing = true;
          }
          tgtSpeed = model.minSpeed;
        }
        if (airplane.altitude < 600 - rwyElev) {
          tgtSpeed = model.landingSpeed;
        }
      }
      if (Math.abs(deg) < 20) {
        tgtHeading =
          rwyHdg +
          Math.min(
            45,
            Math.max(-45, Math.max(Math.abs(deg), 10 /* weight */) * deg)
          );
      } else if (
        airplane.altitude < 500 + rwyElev &&
        Math.abs(rwyAirplaneHdgDiff) < 20
      ) {
        if (isTouchAndGo === false && airplane.landing) {
          const s =
            (this.windspd / config.windSpdMax) *
            config.likelyNessOfGoAroundDueWindSpd;
          const crosswind = Math.abs(angleDelta(rwyHdg, this.winddir));
          const crossWindMultiplier = 1 - Math.abs(crosswind - 90) / 90;
          const d =
            crossWindMultiplier * config.likelyNessOfGoAroundDueWindHhdg;
          const rnd = Math.random();
          if (rnd - d - s < config.likelyNessOfGoAround && SettingsStore.goArounds) {
            if (rnd < config.likelyNessOfGoAround) {
              sendMessageInfo(`${communications.getCallsign(airplane, true)} is going around.`);
            } else if (
              rnd - d - s < config.likelyNessOfGoAround &&
              this.windspd > 10 &&
              crossWindMultiplier > 0.5
            ) {
              sendMessageInfo(`${communications.getCallsign(airplane, true)} is making a go around because of a ${this.windspd}KTS crosswind.`);
            }
            else if (rnd - d - s < config.likelyNessOfGoAround) {
              sendMessageInfo(
                `${communications.getCallsign(
                  airplane,
                  true
                )} is making a go around because of bad weather.`
              );
            }
            // go-around
            airplane.landing = false;
          } else {
            //landed
            this.arrivals++;
            this._remove.push(airplane);
          }
        } else if (airplane.landing) {
          airplane.landing = false;
          if (--airplane.tgs <= 0) {
            switch (airplane.routeType) {
            case routeTypes.VFR_CLOSED_PATTERN_TG:
              airplane.routeType = routeTypes.VFR_CLOSED_PATTERN;
              break;
            case routeTypes.VFR_INBOUND_TG:
              airplane.routeType = routeTypes.VFR_INBOUND;
              break;
            }
          }
        }
        return;
      } else {
        // unable to land, not in range, or any other reason not to land
        tgtHeading = airplane.heading;
      }
    }
  };
}

const persistanceProps = [
  'traffic',
  'started',
  'log',
  'selfLog',
  'mapName',
  'id',
  'arrivals',
  'departures',
  'enroutes',
  'distanceVialations',
  'msaViolations',
  'winddir',
  'windspd',
  'unpermittedDepartures',
  'time'
];

const wrapHeadig = hdg => (hdg + 360) % 360;

const legsOrder = Object.assign(
  {},
  ...['UPWIND', 'CROSSWIND', 'DOWNWIND', 'BASE', 'FINAL', 'RWY'].map(
    (l, i) => ({ [VFRStates[l]]: i })
  )
);

export default new GameStore();
