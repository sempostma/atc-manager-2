import config from './config';

export const idType = {
  WAYPOINT: 0,
  AIRPORT: 1,
  RWY: 2,
}

export const loadMap = key => {
  Object.keys(maps[key].waypoints).map(k => maps[key].waypoints[k]).forEach(w => w.type = idType.WAYPOINT);
  maps[key].airport.type = idType.AIRPORT;
  maps[key].airport.runways.forEach(rwy => rwy.type = idType.RWY)
  return maps[key];
};

export const headingTo = (x1, y1, x2, y2) => {
  return (Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI + 360) % 360;
};

export const angleDistance = (a0, a1) => {
  var max = 360;
  var da = (a1 - a0) % max;
  return 2 * da % max - da;
}

export const activeRwys = (airport, winddir) => {
  const ru = airport.rwyusage;
  for (let i = 0; i < ru.length; i++) {
    if (winddir < ru[i].dir) {
      let winddir = ru[(i + ru.length - 1) % ru.length];
      return winddir.rwys;
    }
  }
  return ru[ru.length - 1].rwys;
}

export const rwyPos = (airport, rwy, width, height, multiplier = 1, ignoreLen) => {
  const len = rwy.length * config.rwyLenScale;
  const dx1 = Math.sin(rwy.hdg1 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;
  const dy1 = Math.cos(rwy.hdg1 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;
  const dx2 = Math.sin(rwy.hdg2 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;
  const dy2 = Math.cos(rwy.hdg2 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;

  const x1 = width / 2 + airport.x + rwy.x + dx1;
  const y1 = height / 2 + airport.y + rwy.y + dy1;
  const x2 = width / 2 + airport.x + rwy.x + dx2;
  const y2 = height / 2 + airport.y + rwy.y + dy2;
  return { x1, y1, x2, y2 };
}

export const landableRwys = (airport, airplane, width, height) => {
  const rwys = [];
  for (let i = 0; i < airport.runways.length; i++) {
    const rwy = airport.runways[i];
    const len = rwy.length * config.rwyLenScale;
    const dx1 = Math.sin(rwy.hdg1 * Math.PI / 180) * -len;
    const dy1 = Math.cos(rwy.hdg1 * Math.PI / 180) * -len;
    const dx2 = Math.sin(rwy.hdg2 * Math.PI / 180) * -len;
    const dy2 = Math.cos(rwy.hdg2 * Math.PI / 180) * -len;

    const x1 = width / 2 + airport.x + rwy.x + dx1;
    const y1 = height / 2 + airport.y + rwy.y + dy1;
    const x2 = width / 2 + airport.x + rwy.x + dx2;
    const y2 = height / 2 + airport.y + rwy.y + dy2;

    const deg1 = (Math.atan2(x1 - airplane.x, y1 - airplane.y) * 180 / Math.PI + 360) % 360;
    const deg2 = (Math.atan2(x2 - airplane.x, y2 - airplane.y) * 180 / Math.PI + 360) % 360;

    if (Math.abs(angleDistance(rwy.hdg1, deg1)) < 20) {
      rwys.push({ rwy, rev: false });
    } else if (Math.abs(angleDistance(rwy.hdg2, deg2)) < 20) {
      rwys.push({ rwy, rev: true });
    }
  }
  return rwys;
};

const maps = {
  default: {
    id: 'default',
    name: 'Default',
    outboundWaypoints: ['LAIKA', 'PLM', 'DAVOT', 'EZOS', 'EDOS'],
    inboundWaypoints: ['EVKOS', 'ELROS', 'KTDOS', 'QEDOS'],
    waypoints: {
      EVKOS: { x: 0, y: 360 },
      QEDOS: { x: 1280, y: 400 },
      KTDOS: { x: 250, y: 0 },
      EKOS: { x: 20, y: 20 },
      EDOS: { x: 0, y: 720 },
      ELROS: { x: 1280, y: 720 },
      EBOS: { x: 100, y: 600 },
      ESOS: { x: 1200, y: 90 },
      ELOS: { x: 220, y: 200 },
      EZOS: { x: 1280, y: 0 },
      EDROS: { x: 290, y: 820 },
      KOS: { x: 80, y: 90 },
      PLM: { x: 1280, y: 70 },
      DAVOT: { x: 0, y: 90 },
      LAIKA: { x: 900, y: 0 },
      RUNAW: { x: 30, y: 20 },
      EH11: { x: 623.268587103299, y: 111.60881397780415 },
      EH13: { x: 666.731412896701, y: 608.3911860221958 },
      EH26: { x: 635.2208641964845, y: 248.22396629001187 },
      EH9: { x: 659.1254183828556, y: 521.4542709144273 },
    },
    routes: {
      // oubound
      '18->LAIKA': '18->EH26->LAIKA/${CRZ}',
      '36->LAIKA': '36->EH9->LAIKA/${CRZ}',
      '18->PLM': '36->EH9->PLM/${CRZ}',
      '36->PLM': '36->EH9->PLM/${CRZ}',
      '18->EZOS': '36->EH9->EZOS/${CRZ}',
      '36->EZOS': '36->EH9->EZOS/${CRZ}',
      '18->DAVOT': '36->EH9->DAVOT/${CRZ}',
      '36->DAVOT': '36->EH9->DAVOT/${CRZ}',
      '18->EDOS': '36->EH9->EDOS/${CRZ}',
      '36->EDOS': '36->EH9->EDOS/${CRZ}',
      // inbound
      'LAIKA->18': 'LAIKA->EH9/3000->18',
      'LAIKA->36': 'LAIKA->EH26/3000->36',
      'PLM->18': 'PLM->EH9/3000->18',
      'PLM->36': 'PLM->EH26/3000->36',
      'EZOS->18': 'EZOS->EH9/3000->18',
      'EZOS->36': 'EZOS->EH26/3000->36',
      'DAVOT->18': 'DAVOT->EH9/3000->18',
      'DAVOT->36': 'DAVOT->EH26/3000->36',
      // enroute
      'EVKOS->PLM': 'EVKOS->EHZM->PLM',
      'QEDOS->EDOS': 'QEDOS->EHZM->EDOS',
    },
    airport: {
      elevation: 22,
      rwyusage: [
        { dir: 95, rwys: ['18'] },
        { dir: 275, rwys: ['36'] },
      ],
      callsign: 'EHZM',
      x: 0,
      y: 0,
      runways: [
        {
          x: 5,
          y: 0,
          length: 12467,
          length1: 12467,
          length2: 12467,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 150, // EXPERMINTAL / WIP
          hdg1: 5,
          hdg2: 185,
          labelSpread1: 1,
          labelSpread2: 1,
          elevation1: 25,
          elevation2: 23,
          name1: '36',
          name2: '18',
        }
      ],
    }
  },
  heathrow: {
    id: 'heathrow',
    name: 'Heathrow',
    outboundWaypoints: ['FOS', 'BIG', 'LAM'],
    inboundWaypoints: ['BLC', 'BENSU', 'EPM', 'LCY'],
    waypoints: {
      BLC: { x: 40, y: 0 },
      WOD: { x: 0, y: 400 },
      BENSU: { x: 0, y: 600 },
      BUR: { x: 100, y: 500 },
      FRK: { x: 550, y: 20 },
      FOS: { x: 580, y: 0 },
      OCK: { x: 640, y: 0 },
      EPM: { x: 730, y: 0 },
      BIG: { x: 1280, y: 0 },
      LCY: { x: 1280, y: 360 },
      LAM: { x: 1280, y: 720 },
      GOXUL: { x: 900, y: 90 },
      FINCH: { x: 880, y: 800 },
      CHT: { x: 600, y: 1050 },
      D175F: { x: 680, y: 220 },
      EGWU: { x: 690, y: 960 },
      RICHY: { x: 939.9543085469174, y: 344.7642780688151 },
      BARNS: { x: 939.9543085469174, y: 364.7642780688151 },
      WINSR: { x: 340.0456914530826, y: 355.235721931185 },
      MARLO: { x: 340.0456914530826, y: 375.235721931185 },
      '40LO2': { x: 490.0228457265413, y: 352.6178609655925 },
      '40LOC': { x: 490.0228457265413, y: 372.6178609655925 },
      '40LO3': { x: 789.9771542734587, y: 347.38213903440754 }

    },
    routes: {

    },
    airport: {
      elevation: 77,
      rwyusage: [
        { dir: 1, rwys: ['09R', '09L'] },
        { dir: 181, rwys: ['27R', '27L'] },
      ],
      callsign: 'EGLL',
      x: 0,
      y: 0,
      runways: [
        {
          x: 0,
          y: -10,
          length: 12802,
          length1: 12802,
          length2: 12802,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 91,
          hdg2: 271,
          name1: '09R',
          name2: '27L',
          elevation1: 77,
          elevation2: 77,
          labelSpread1: 1,
          labelSpread2: 1,
        },
        {
          x: 0,
          y: 10,
          length: 12008,
          length1: 12008,
          length2: 12008,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 91,
          hdg2: 271,
          name1: '09L',
          name2: '27R',
          elevation1: 77,
          elevation2: 77,
          labelSpread1: 1,
          labelSpread2: 1,
        }
      ],
    },
  },
  schiphol: {
    id: 'schiphol',
    name: 'Schiphol',
    outboundWaypoints: ['EH610', 'SPY', 'OMORU', 'TULIP'],
    inboundWaypoints: ['EH040', 'LILSI', 'IVLET', 'SUSET'],
    waypoints: {
      NV: { x: 670, y: 0 },
      CH: { x: 400, y: 100 },
      EKROS: { x: 500, y: 150 },
      BASNO: { x: 410, y: 390 },
      EH040: { x: 300, y: 0 },
      EH610: { x: 0, y: 100 },
      SPY: { x: 400, y: 720 },
      OA: { x: 640, y: 550 },
      LILSI: { x: 1280, y: 600 },
      PAM: { x: 600, y: 360 },
      OMORU: { x: 1280, y: 360 },
      IVLET: { x: 1280, y: 200 },
      SUSET: { x: 1100, y: 0 },
      TULIP: { x: 0, y: 640 },
      EH639: { x: 794.794430213186, y: 387.85039343644166 },
      EH633: { x: 605.3459322519757, y: 80.38373026871932 },
      EH635: { x: 645.3459322519757, y: 73.38373026871932 },
      EH126: { x: 585.3459322519757, y: 100.38373026871932 },
      EH642: { x: 365.3837302687193, y: 365.3459322519757 },
      EH047: { x: 611.5139103734476, y: 599.6984976460062 },
      EH626: { x: 634.6540677480242, y: 639.6162697312807 },
      EH616: { x: 404.5465330762007, y: 201.62260601470263 },
      EH654: { x: 879.4534669237993, y: 498.37739398529743 },
      
    },
    routes: {

    },
    airport: {
      elevation: -11,
      rwyusage: [
        { dir: 45, rwys: ['09'] },
        { dir: 135, rwys: ['36L', '36C'] },
        { dir: 220, rwys: ['24', '27'] },
        { dir: 330, rwys: ['18L', '36R'] },
      ],
      callsign: 'EHAM',
      x: 0,
      y: 0,
      runways: [
        {
          x: -40,
          y: 20,
          length: 12468,
          length1: 12468,
          length2: 12468,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 3,
          hdg2: 183,
          name1: '36L',
          name2: '18R',
          elevation1: -11,
          elevation2: -11,
          labelSpread1: 1.2,
          labelSpread2: 1.2,
        },
        {
          x: 2,
          y: -10,
          length: 11483,
          length1: 11483,
          length2: 11483,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 58,
          hdg2: 238,
          name1: '06',
          name2: '24',
          elevation1: -11,
          elevation2: -11,
          labelSpread1: 1,
          labelSpread2: 0.5,
        },
        {
          x: 5,
          y: 20,
          length: 11329,
          length1: 11329,
          length2: 11329,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 87,
          hdg2: 267,
          name1: '09',
          name2: '27',
          elevation1: -11,
          elevation2: -11,
          labelSpread1: 2,
          labelSpread2: 2,
        },
        {
          x: 20,
          y: -7,
          length: 11155,
          length1: 11155,
          length2: 11155,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 3,
          hdg2: 183,
          name1: '36R',
          name2: '18L',
          elevation1: -11,
          elevation2: -11,
          labelSpread1: 2,
          labelSpread2: 3,
        },
        {
          x: -20,
          y: 0,
          length: 10827,
          length1: 10827,
          length2: 10827,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 3,
          hdg2: 183,
          name1: '36C',
          name2: '18C',
          elevation1: -11,
          elevation2: -11,
          labelSpread1: 2,
          labelSpread2: 2,
        },
        {
          x: 35,
          y: -5,
          length: 10827,
          length1: 10827,
          length2: 10827,
          surface: 'asphalt', // EXPERMINTAL / WIP
          size: 164, // EXPERMINTAL / WIP
          hdg1: 41,
          hdg2: 221,
          name1: '04',
          name2: '22',
          elevation1: -11,
          elevation2: -11,
          labelSpread1: 1,
          labelSpread2: 1.4,
        }
      ],
    }
  }
}

export const mapNames = [];
for (const key in maps) {
  if (maps.hasOwnProperty(key)) {
    mapNames.push(key);
  }
}