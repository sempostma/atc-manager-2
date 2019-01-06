export const parseNav = navigationDataFormat => {
  navigationDataFormat = navigationDataFormat.split(/\r?\n/).slice(3, -2);
  for (let i = 0; i < navigationDataFormat.length; i++) {
    let row = navigationDataFormat[i]
      .trim()
      .split('#')[0]
      .split(/\s+/);
    if (row.length === 1 && row[0] === '') return;

    const o = {};
    navigationDataFormat[i] = o;
    o.code = row[0];
    o.type = {
      2: 'NDB',
      3: 'VOR',
      4: 'ILS',
      5: 'LOC',
      6: 'GS',
      7: 'OM',
      8: 'MM',
      9: 'IM',
      12: 'DME',
      13: 'DME'
    }[row[0]];
    o.lat = +row[1];
    o.lng = +row[2];
    o.elevation = +row[3];
    switch (row[0]) {
    case '2':
      o.frequency = row[4];
      o.range = +row[5];
      o.identifier = row[7];
      o.name = row.slice(8).join(' ');
      break;
    case '3':
      o.frequency = row[4].slice(0, -2) + '.' + row[4].slice(-2);
      o.range = +row[5];
      o.slavedVariation = +row[6];
      o.identifier = row[7];
      o.name = row.slice(8).join(' ');
      break;
    case '4':
    case '5':
      o.frequency = row[4].slice(0, -2) + '.' + row[4].slice(-2);
      o.range = +row[5];
      o.bearing = +row[6];
      o.identifier = row[7];
      o.apt = row[8];
      o.rwy = row[9];
      o.name = row.slice(10).join(' ');
      break;

    case '6':
      o.frequency = row[4].slice(0, -2) + '.' + row[4].slice(-2);
      o.range = +row[5];
      o.glideslope = row[6].slice(0, 3);
      o.bearing = +row[6].slice(3);
      o.identifier = row[7];
      o.apt = row[8];
      o.rwy = row[9];
      o.name = row.slice(10).join(' ');
      break;
    case '7':
    case '8':
    case '9':
      o.bearing = +row[6];
      o.airport = row[8];
      o.rwy = row[9];
      o.name = row.slice(10).join(' ');
      break;
    case '12':
      o.suppressFrequency = true;
      o.frequency = row[4].slice(0, -2) + '.' + row[4].slice(-2);
      o.range = +row[5];
      o.bias = +row[6];
      o.identifier = row[7];
      if (row[10] === 'DME-ILS') {
        o.apt = row[8];
        o.rwy = row[9];
        o.name = row.slice(10).join(' ');
      } else {
        o.name = row.slice(8).join(' ');
      }
      break;
    case '13':
      o.suppressFrequency = false;
      o.frequency = row[4].slice(0, -2) + '.' + row[4].slice(-2);
      o.range = +row[5];
      o.bias = +row[6];
      o.identifier = row[7];
      if (row[10] === 'DME-ILS') {
        o.apt = row[8];
        o.rwy = row[9];
        o.name = row.slice(10).join(' ');
      } else {
        o.name = row.slice(8).join(' ');
      }
      break;
    }
  }
  return navigationDataFormat;
};

export const parseFix = fixDataFormat => {
  fixDataFormat = fixDataFormat.split(/\r?\n/).slice(3, -2);
  for (let i = 0; i < fixDataFormat.length; i++) {
    let row = fixDataFormat[i]
      .trim()
      .split('#')[0]
      .split(/\s+/);
    if (row.length === 1 && row[0] === '') return;

    const o = {};
    fixDataFormat[i] = o;
    o.lat = +row[0];
    o.lng = +row[1];
    o.identifier = row[2];
  }
  return fixDataFormat;
};

export const parseAwy = awyDataFormat => {
  awyDataFormat = awyDataFormat.split(/\r?\n/).slice(3, -2);
  for (let i = 0; i < awyDataFormat.length; i++) {
    if (awyDataFormat[i].trim() === '') continue;
    let row = awyDataFormat[i]
      .trim()
      .split('#')[0]
      .split(/\s+/);
    if (row.length === 1 && row[0] === '') return;

    let names = row[9].split('-');
    for (let j = 0; j < names.length; j++) {
      const o = {};
      awyDataFormat[i] = o;
      o.nav1 = row[0];
      o.lat1 = +row[1];
      o.lng1 = +row[2];
      o.nav2 = row[3];
      o.lat2 = +row[4];
      o.lng2 = +row[5];
      o.type = row[6] === '1' ? 'low' : 'high';
      o.base = +row[7];
      o.top = +row[8];
      o.name = names[j];
    }
  }
  return awyDataFormat;
};

export const parseAptNav = dat => {
  dat = dat.split(/\r?\n/);
  for (let i = 0; i < dat.length; i++) {
    if (dat[i].trim() === '') continue;
    let row = dat[i]
      .trim()
      .split('#')[0]
      .split(/\s+/);
    if (row.length === 1 && row[0] === '') return;

    const o = {};
    dat[i] = o;
    o.identifier = row[0];
    o.lat = +row[1];
    o.lng = +row[2];
    o.taxiRoutingNetwork = row[3] === '1';
    o.name = row.slice(4).join(' ');
  }
  return dat;
};

export const parseApt = (aptDataFormat, sliced) => {
  aptDataFormat = aptDataFormat.split(/\r?\n/);
  if (!sliced) aptDataFormat = aptDataFormat.slice(3, -2);
  let apts = [];
  let apt;
  let rwy;
  let helipad;
  let taxiwayOrLinearFeatureOrAirportBoundary;
  let startupLocation;
  let startupLocationLegacy;
  let lightBeacon;
  let windsock;
  let sign;
  let lightingObject;
  let trafficFlow;
  let taxiRoutingNetworkEdge;
  let node;
  let i = 0;
  for (let i = 0; i < aptDataFormat.length; i++) {
    if (aptDataFormat[i].trim() === '') continue;
    const row = aptDataFormat[i].split('#')[0].split(/\s+/);
    if (row.length === 1 && row[0] === '');
    let type = +row[0];

    switch (type) {
    case 1:
    case 16:
    case 17:
      apt = {};
      apt.type = type;
      apt.elevation = +row[1];
      apt.hasTower = row[2] === '1';
      apt.identifier = row[4];
      apt.name = row.slice(5).join(' ');
      apt.rwys = [];
      apt.helipads = [];
      apt.taxiways = [];
      apt.linearFeatures = [];
      apt.aptBoundaries = [];
      apt.viewpoints = [];
      apt.startupLocations = [];
      apt.startupLocationsLegacy = [];
      apt.lightBeacons = [];
      apt.windsocks = [];
      apt.signs = [];
      apt.lightingObjects = [];
      apt.trafficFlowRules = [];
      apt.metadata = [];
      (apt.truckParkings = []), (apt.truckDestinations = []);
      apt.atc = {
        recorded: [],
        unicom: [],
        cld: [],
        gnd: [],
        twr: [],
        app: [],
        dep: []
      };
      apts.push(apt);
      break;
    case 100:
      rwy = {};
      rwy.type = type;
      rwy.width = +row[1];
      rwy.surface = +row[2];
      rwy.shoulder = +row[3];
      rwy.smoothness = +row[4]; // 0.00 - 1.00 (0.25)
      rwy.centrelinelights = row[5] === '1';
      rwy.edgeLighting = row[6] === '2';
      rwy.autoGenerateDistanceRemainingSigns = row[7] === '1';
      rwy.ends = [];

      for (let e = 8; row[e]; e += 9) {
        const end = {};
        rwy.ends.push(end);
        end.name = row[e];
        end.lat = +row[e + 1];
        end.lng = +row[e + 2];
        end.displacedThresholdInMeters = row[e + 3];
        end.lengthOverrunOrBlastPadInMeters = row[e + 4];
        end.runwayMarkings = +row[e + 5];
        end.approachLighting = +row[e + 6];
        end.tdz = row[e + 7] === '1';
        end.reil = +row[e + 8];
      }
      apt.rwys.push(rwy);
      break;
    case 101:
      rwy = {};
      rwy.type = type;
      rwy.type = 'searwy';
      rwy.width = row[1];
      rwy.buoys = row[2] === '1';
      rwy.ends = [];

      for (let e = 3; row[e]; e += 3) {
        const end = {};
        rwy.ends.push(end);
        end.name = row[e];
        end.lat = +row[e + 1];
        end.lng = +row[e + 2];
      }

      apt.rwys.push(rwy);
      break;

    case 102:
      helipad = {};
      helipad.type = type;
      helipad.designator = row[1];
      helipad.lat = +row[2];
      helipad.lng = +row[3];
      helipad.orientation = +row[4]; // true heading
      helipad.length = +row[5];
      helipad.width = +row[6];
      helipad.surface = +row[7];
      helipad.markings = +row[8];
      helipad.shoulder = +row[9];
      helipad.smoothness = +row[10];
      helipad.edgeLighting = row[11] === '2';

      apt.helipads.push(helipad);
      break;

    case 110:
      taxiwayOrLinearFeatureOrAirportBoundary = {};
      taxiwayOrLinearFeatureOrAirportBoundary.type = type;
      taxiwayOrLinearFeatureOrAirportBoundary.surface = +row[1];
      taxiwayOrLinearFeatureOrAirportBoundary.smoothness = +row[2];
      taxiwayOrLinearFeatureOrAirportBoundary.orientation = +row[3];
      taxiwayOrLinearFeatureOrAirportBoundary.description = row
        .slice(4)
        .join(' ');

      taxiwayOrLinearFeatureOrAirportBoundary.nodes = [];
      apt.taxiways.push(taxiwayOrLinearFeatureOrAirportBoundary);
      break;

    case 120: // Linear feature
      taxiwayOrLinearFeatureOrAirportBoundary = {};
      taxiwayOrLinearFeatureOrAirportBoundary.type = type;
      taxiwayOrLinearFeatureOrAirportBoundary.description = row
        .slice(1)
        .join(' ');

      taxiwayOrLinearFeatureOrAirportBoundary.nodes = [];
      apt.linearFeatures.push(taxiwayOrLinearFeatureOrAirportBoundary);
      break;
    case 130: // Airport boundary
      taxiwayOrLinearFeatureOrAirportBoundary = {};
      taxiwayOrLinearFeatureOrAirportBoundary.type = type;
      taxiwayOrLinearFeatureOrAirportBoundary.description = row
        .slice(1)
        .join(' ');

      taxiwayOrLinearFeatureOrAirportBoundary.nodes = [];
      apt.aptBoundaries.push(taxiwayOrLinearFeatureOrAirportBoundary);
      break;
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
      node = {};
      node.type = type;
      node.lat = +row[1];
      node.lng = +row[2];
      if (type === 112 || type === 114 || type === 116) {
        node.bezierLat = +row[3];
        node.bezierLng = +row[4];
      }
      if (type === 115) {
        node.line = +row[3];
        node.lighting = +row[4];
      } else if (type === 116) {
        node.line = +row[3];
        node.lighting = +row[4];
      }

      taxiwayOrLinearFeatureOrAirportBoundary.nodes.push(node);
      break;

    case 14: //viewpoint
      const viewpoint = {};
      viewpoint.type = type;
      viewpoint.lat = +row[1];
      viewpoint.lng = +row[2];
      viewpoint.height = +row[3];
      viewpoint.name = row.slice(5).join(' ');
      apt.viewpoints.push(viewpoint);
      break;

    case 15: // startup location
      const startupLocationLegacy = {};
      startupLocationLegacy.type = type;
      startupLocationLegacy.lat = +row[1];
      startupLocationLegacy.lng = +row[2];
      startupLocationLegacy.heading = +row[3];
      startupLocationLegacy.name = row.slice(4).join(' ');
      apt.startupLocationsLegacy.push(startupLocationLegacy);

      break;

    case 18:
      lightBeacon = {};
      lightBeacon.type = type;
      lightBeacon.lat = +row[1];
      lightBeacon.lng = +row[2];
      lightBeacon.color = +row[3];
      apt.lightBeacons.push(lightBeacon);
      break;

    case 19:
      windsock = {};
      windsock.type = type;
      windsock.lat = +row[1];
      windsock.lng = +row[2];
      windsock.lighting = row[3] === '1';
      windsock.name = row.slice(4).join(' ');
      apt.windsocks.push(windsock);
      break;

    case 20:
      sign = {};
      sign.type = type;
      sign.lat = +row[1];
      sign.lng = +row[2];
      sign.orientation = +row[3];
      sign.size = +row[5];
      sign.text = row.slice(6).join(' ');

      apt.signs.push(sign);
      break;

    case 21:
      lightingObject = {};
      lightingObject.type = type;
      lightingObject.lat = +row[1];
      lightingObject.lng = +row[2];
      lightingObject.lighting = +row[3];
      lightingObject.orientation = +row[4];
      lightingObject.glideslope = +row[5];
      lightingObject.runway = row[6];
      lightingObject.description = row.slice(7).join(' ');

      apt.lightingObjects.push(lightingObject);
      break;

    case 1000:
      trafficFlow = {};
      trafficFlow.type = type;
      trafficFlow.name = row.slice(1).join(' ');
      trafficFlow.wind = [];
      trafficFlow.ceiling = [];
      trafficFlow.time = [];
      trafficFlow.runways = [];
      trafficFlow.vfrPatterns = [];
      apt.trafficFlowRules.push(trafficFlow);
      break;

    case 1001:
      const wind = {
        type,
        metar: row[1],
        min: +row[2],
        max: +row[3],
        windMax: +row[4]
      };
      trafficFlow.wind.push(wind);
      break;

    case 1002:
      const ceiling = {
        type,
        metar: row[1],
        minCeiling: +row[2]
      };
      trafficFlow.ceiling = ceiling;
      break;

    case 1003:
      const visibility = {
        type,
        metar: row[1],
        visibility: +row[2]
      };
      trafficFlow.visibility = visibility;
      break;

    case 1004:
      const trafficTime = {
        type,
        start: +row[1],
        end: +row[2]
      };
      trafficFlow.time = trafficTime;
      break;

    case 1100:
      const runwayInUse = {
        type,
        name: row[1],
        frequency: row[2].slice(0, -2) + '.' + row[2].slice(-2),
        trafficType: row[3],
        airplaneTypes: row[4].split('|'),
        headingRange: row[5],
        departureHeadingRange: row[6],
        name: row.slice(7)
      };
      trafficFlow.runways.push(runwayInUse);
      break;

    case 1101:
      const vfrPatternRule = {
        type,
        name: row[1],
        direction: row[2]
      };
      trafficFlow.vfrPatterns.push(vfrPatternRule);
      break;

    case 1200:
      apt.taxiRoutingNetwork = {
        type,
        nodes: [],
        edges: [],
        groundVehicleEdges: []
      };
      break;

    case 1201:
      apt.taxiRoutingNetwork.nodes.push({
        type,
        lat: +row[1],
        lng: +row[2],
        usage: row[3],
        identifier: +row[4],
        name: row.slice(5).join(' ')
      });
      break;

    case 1202:
      taxiRoutingNetworkEdge = {
        type,
        start: +row[1],
        end: +row[2],
        twoway: row[3] === 'twoway',
        runway: row[4] === 'runway',
        identifier: row.slice(5).join(' ')
      };
      apt.taxiRoutingNetwork.edges.push(taxiRoutingNetworkEdge);

      break;

    case 1204:
      taxiRoutingNetworkEdge.activeZone = {
        type,
        classification: row[1],
        runways: row
          .slice(2)
          .join('')
          .split(',')
      };
      break;

    case 1206:
      taxiRoutingNetworkEdge = {
        type,
        start: +row[1],
        end: +row[2],
        twoway: row[3] === 'twoway'
      };
      apt.taxiRoutingNetwork.groundVehicleEdges.push(taxiRoutingNetworkEdge);
      break;

    case 1300:
      startupLocation = {
        type,
        lat: +row[1],
        lng: +row[2],
        heading: +row[3],
        locationType: row[4],
        airplaneTypes: row[5].split('|'),
        name: row.slice(6).join(' '),
        metadata: []
      };

      apt.startupLocations.push(startupLocation);
      break;

    case 1301:
      startupLocation.metadata.push({
        type,
        code: row[1],
        operation: row[2],
        airline: row.slice(3)
      });

      break;
    case 1302:
      apt.metadata.push({
        type,
        code: row[1],
        icao: row[2]
      });

      break;

    case 1400:
      apt.truckParkings.push({
        type,
        lat: +row[1],
        lng: +row[2],
        heading: +row[3],
        parkingType: row[4],
        code: row[5],
        name: row.slice(6).join(' ')
      });
      break;

    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
      const atc = {
        type,
        frequency: row[1].slice(0, -2) + '.' + row[1].slice(-2),
        name: row.slice(2).join(' ')
      };
      apt.atc[
        ['recorded', 'unicom', 'cld', 'gnd', 'twr', 'app', 'dep'][type - 50]
      ].push(atc);
      break;
    }
  }
  return apts;
};

const rowCodes = {
  LAND: 1,
  SEA: 16,
  HELIPORT: 17,

  1: 'Land',
  16: 'Seaplane',
  17: 'Heliport',

  PLAIN: 111,
  BEZIER_CONTROL_POINT: 112,
  NODE_CLOSE_LOOP: 113,
  NODE_CLOSE_LOOP_BEZIER_CONTROL_POINT: 114,
  NODE_END_TERMINATE_LINE: 115,
  NODE_END_BEZIER_CONTROL_POINT: 116,

  111: 'Plain',
  112: 'Bezier control point',
  113: 'Close loop',
  114: 'Close loop bezier control point',
  115: 'End, terminate line',
  116: 'End with bezier control point'
};

export const surfaceTypeCodes = {
  ASPHALT: 1,
  CONCRETE: 2,
  TURF_OR_GRASS: 3,
  DIRT_BROWN: 4,
  GRAVEL_GREY: 5,
  DRY_LAKEBED: 12,
  WATER: 13,
  SNOW_OR_ICE: 14,
  TRANSPARENT: 15,

  1: 'Asphalt',
  2: 'Concrete',
  3: 'Turf or grass',
  4: 'Dirt (brown)',
  5: 'Gravel (grey)',
  12: 'Dry lakebed',
  13: 'Water runways',
  14: 'Snow or ice',
  15: 'Transparent'
};

export const runwayEndIdentifierLights = {
  // REIL
  NO_REIL: 0,
  OMNI_DIRECTIONAL_REIL: 1,
  UNIDIRECTIONAL: 2,

  0: 'No REIL',
  1: 'Omni-directional REIL',
  2: 'Unidirectional REIL'
};

export const runwayMarkingCodes = {
  NO_RUNWAY_MARKINGS: 0,
  VISUAL_MARKINGS: 1,
  NON_PRECISION_APPROACH_MARKINGS: 2,
  PRECISION_APPROACH_MARKINGS: 3,
  UK_STYLE_NON_PRECISION_APPROACH_MARKINGS: 4,
  UK_STYLE_PRECISION_APPROACH_MARKINGS: 5,

  0: 'No runway markings',
  1: 'Visual markings',
  2: 'Non-precision approach markings',
  3: 'Precision approach markings',
  4: 'UK-style non-precision approach markings',
  5: 'UK-style precision approach markings'
};

export const shoulderCodes = {
  NO_SHOULDER: 0,
  ASPHALT: 1,
  CONCRETE: 2,

  0: 'No shoulder',
  1: 'Asphalt',
  2: 'Concrete'
};

export const approachLightingCodes = {
  NO_APPROACH_LIGHTING: 0,
  ALSF_I: 1,
  ALSF_II: 2,
  CALVERT: 3,
  CALVERT_ILS_CAT_II_AND_CAT_II: 4,
  SSALR: 5,
  SSALF: 6,
  SALS: 7,
  MALSR: 8,
  MALSF: 9,
  MALS: 10,
  ODALS: 11,
  RAIL: 12,

  1: 'ALSF-I (High intensity Approach Light System with sequenced flashing lights)',
  2: 'ALSF-II (High intensity Approach Light System with sequenced Flashing lights. Red side bar lights (barettes) the last 1000’, that align with TDZ lighting.)',
  3: 'Calvert (British - High intensity)',
  4: 'Calvert ILS Cat II and Cat II (British - High intensity with red side bar lights (barettes) the last 1000. Barettes align with TDZ lighting)',
  5: 'SSALR (High intensity, Simplified Short Approach Light System. With Runway Alignment Indicator Lights (RAIL))',
  6: 'SSALF (High intensity, Simplified Short Approach Light System. With sequenced flashing lights)',
  7: 'SALS (High intensity, Short Approach Light System)',
  8: 'MALSR (Medium-intensity Approach Light System. With Runway Alignment Indicator Lights (RAIL))',
  9: 'MALSF (Medium-intensity Approach Light System with sequenced flashing lights)',
  10: 'MALS (Medium-intensity Approach Light System)',
  11: 'ODALS (Omni-directional approach light system, Flashing lights, not strobes, not sequenced)',
  12: 'RAIL (Runway Alignment Indicator Lights. Sequenced strobes and green threshold lights, with no other approach lights)'
};

export const lineTypeCodes = {
  NOTHING_: 0,
  SOLID_YELLOW_LINE_TAXIWAY_CENTRE_LINES: 1,
  BROKEN_YELLOW_LINE_MISCELLANEOUS_BOUNDARIES: 2,
  DOUBLE_SOLID_YELLOW_LINES_TAXIWAY_EDGE_LINES: 3,
  TWO_BROKEN_YELLOW_LINES_AND_TWO_SOLID_YELLOW_LINES_BROKEN_LINE_ON_LEFT_OF_STRING_RUNWAY_HOLD_POSITIONS: 4,
  BROKEN_YELLOW_LINE_WITH_PARALLEL_SOLID_YELLOW_LINE_BROKEN_LINE_ON_LEFT_OF_STRING_OTHER_NON_RUNWAY_HOLD_LOCATIONS: 5,
  YELLOW_CROSS_HATCHED_LINE_ILS_HOLD: 6,
  SOLID_YELLOW_LINE_WITH_BROKEN_YELLOW_LINE_ON_EACH_SIDE_TAXIWAY_CENTERLINES_IN_RUNWAY_SAFETY_ZONES: 7,
  WIDELY_SEPARATED_BROKEN_YELLOW_LINE_MARK_LANES_FOR_QUEUING_AEROPLANES: 8,
  WIDELY_SEPARATED_BROKEN_DOUBLE_YELLOW_LINE_MARK_LANES_FOR_QUEUING_AEROPLANES: 9,

  BLACK_BORDER_HIGH_CONTRAST_SOLID_YELLOW_LINE_TAXIWAY_CENTRE_LINES: 51,
  BLACK_BORDER_HIGH_CONTRAST_BROKEN_YELLOW_LINE_MISCELLANEOUS_BOUNDARIES: 52,
  BLACK_BORDER_HIGH_CONTRAST_DOUBLE_SOLID_YELLOW_LINES_TAXIWAY_EDGE_LINES: 53,
  BLACK_BORDER_HIGH_CONTRAST_TWO_BROKEN_YELLOW_LINES_AND_TWO_SOLID_YELLOW_LINES_BROKEN_LINE_ON_LEFT_OF_STRING_RUNWAY_HOLD_POSITIONS: 54,
  BLACK_BORDER_HIGH_CONTRAST_BROKEN_YELLOW_LINE_WITH_PARALLEL_SOLID_YELLOW_LINE_BROKEN_LINE_ON_LEFT_OF_STRING_OTHER_NON_RUNWAY_HOLD_LOCATIONS: 55,
  BLACK_BORDER_HIGH_CONTRAST_YELLOW_CROSS_HATCHED_LINE_ILS_HOLD: 56,
  BLACK_BORDER_HIGH_CONTRAST_SOLID_YELLOW_LINE_WITH_BROKEN_YELLOW_LINE_ON_EACH_SIDE_TAXIWAY_CENTERLINES_IN_RUNWAY_SAFETY_ZONES: 57,
  BLACK_BORDER_HIGH_CONTRAST_WIDELY_SEPARATED_BROKEN_YELLOW_LINE_MARK_LANES_FOR_QUEUING_AEROPLANES: 58,
  BLACK_BORDER_HIGH_CONTRAST_WIDELY_SEPARATED_BROKEN_DOUBLE_YELLOW_LINE_MARK_LANES_FOR_QUEUING_AEROPLANES: 59,

  SOLID_WHITE_LINE_ROADWAY_MARKINGS: 20,
  WHITE_CHEQUERBOARD_PATTERN_ROADWAY_MARKINGS: 21,
  BROKEN_WHITE_LINE_ROADWAY_CENTRELINE: 22,
  GREEN_EMBEDDED_LIGHTS_BIDIRECTIONAL_ALONG_STRING_AXIS_TAXIWAY_CENTRELINES: 101,
  BLUE_LIGHTS_OMNIDIRECTIONAL_TAXIWAY_EDGE: 102,
  CLOSELY_SPACED_EMBEDDED_AMBER_LIGHTS_UNIDIRECTIONAL_TO_RIGHT_OF_STRING_HOLD_LINES: 103,
  CLOSELY_SPACED_PULSATING_EMBEDDED_AMBER_LIGHTS_UNIDIRECTIONAL_TO_RIGHT_OF_STRING_RUNWAY_HOLD_LINES: 104,
  ALTERNATING_GREEN_AND_AMBER_EMBEDDED_LIGHTS_BIDIRECTIONAL_ALONG_STRING_AXIS_CENTRELINES_IN_RUNWAY_SAFETY_ZONES: 105,
  RED_LIGHTS_OMNIDIRECTIONAL: 106,

  0: 'Nothing.',
  1: 'Solid yellow line Taxiway centre lines',
  2: 'Broken yellow line Miscellaneous boundaries',
  3: 'Double solid yellow lines Taxiway edge lines',
  4: 'Two broken yellow lines and two solid yellow lines. Broken line on left of string. Runway hold positions',
  5: 'Broken yellow line with parallel solid yellow line. Broken line on left of string. Other (non-runway) hold locations',
  6: 'Yellow cross-hatched line ILS hold',
  7: 'Solid yellow line with broken yellow line on each side Taxiway centerlines in runway safety zones',
  8: 'Widely separated, broken yellow line Mark ‘lanes’ for queuing aeroplanes',
  9: 'Widely separated, broken double yellow line Mark ‘lanes’ for queuing aeroplanes',

  51: 'Black border higher contrast. Solid yellow line Taxiway centre lines',
  52: 'Black border higher contrast. Broken yellow line Miscellaneous boundaries',
  53: 'Black border higher contrast. Double solid yellow lines Taxiway edge lines',
  54: 'Black border higher contrast. Two broken yellow lines and two solid yellow lines. Broken line on left of string. Runway hold positions',
  55: 'Black border higher contrast. Broken yellow line with parallel solid yellow line. Broken line on left of string. Other (non-runway) hold locations',
  56: 'Black border higher contrast. Yellow cross-hatched line ILS hold',
  57: 'Black border higher contrast. Solid yellow line with broken yellow line on each side Taxiway centerlines in runway safety zones',
  58: 'Black border higher contrast. Widely separated, broken yellow line Mark ‘lanes’ for queuing aeroplanes',
  59: 'Black border higher contrast. Widely separated, broken double yellow line Mark ‘lanes’ for queuing aeroplanes',

  20: 'Solid white line Roadway markings',
  21: 'White chequerboard pattern Roadway markings',
  22: 'Broken white line Roadway centreline',
  101: 'Green embedded lights, bidirectional along string axis Taxiway centrelines',
  102: 'Blue lights, omnidirectional Taxiway edge',
  103: 'Closely spaced, embedded amber lights. Unidirectional to right of string Hold lines',
  104: 'Closely spaced, pulsating embedded amber lights. Unidirectional to right of string Runway hold lines',
  105: 'Alternating green and amber embedded lights, bidirectional along string axis Centrelines in runway safety zones',
  106: 'Red lights, omnidirectional'
};

export const airportLightBeacons = {
  NO_BEACON: 0,
  WHITE_GREEN_FLASHING: 1,
  WHITE_YELLOW_FLASHING: 2,
  GREEN_YELLOW_WHITE_FLASHING: 3,
  WHITE_WHITE_GREEN_FLASHING: 4,

  0: 'No beacon',
  1: 'White-green flashing',
  2: 'White-yellow flashing',
  3: 'Green-yellow-white flashing',
  4: 'White-white-green flashing'
};

export const taxiwaySignSizesAndTypes = {
  SMALL_TAXIWAY_SIGN: 1,
  MEDIUM_TAXIWAY_SIGN: 2,
  LARGE_TAXIWAY_SIGN: 3,
  LARGE_DISTANCE_REMAINING_SIGN_ON_RUNWAY_EDGE: 4,
  SMALL_DISTANCE_REMAINING_SIGN_ON_RUNWAY_EDGE: 5,

  1: 'Small taxiway sign',
  2: 'Medium taxiway sign',
  3: 'Large taxiway sign',
  4: 'Large distance-remaining sign on runway edge',
  5: 'Small distance-remaining sign on runway edge'
};

export const lightingObjects = {
  VASI: 1,
  PAPI_4L: 2,
  PAPI_4R: 3,
  SPACE_SHUTTLE_PAPI: 4,
  TRI_COLOUR_VASI: 5,
  RUNWAY_GUARD_LIGHTS: 6,

  1: 'VASI',
  2: 'PAPI-4L (four-light) on left of runway',
  3: 'PAPI-4R (four light) on right of runway',
  4: 'Space Shuttle PAPI, 20 degree glidepath',
  5: 'Tri-colour VASI',
  6: 'Runway guard ("wig-wag") lights'
};
