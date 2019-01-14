import Airplane, { emitter } from '../../lib/airplane';
import { routeTypes } from '../../lib/airplane-library/airplane-library';
import GameStore from '../GameStore';
import communications from '../../lib/communications';
import { idType } from '../../lib/map';

emitter.on('create', airplane => {
  switch (airplane.routeType) {
    case routeTypes.INBOUND: 

    break;
    case routeTypes.OUTBOUND: 

    break;
    case routeTypes.ENROUTE:

    break;
    case routeTypes.VFR_CLOSED_PATTERN:

    break;
    case routeTypes.VFR_CLOSED_PATTERN_TG:

    break;
    case routeTypes.VFR_OUTBOUND:

    break;
    case routeTypes.VFR_INBOUND:

    break;
    case routeTypes.VFR_INBOUND_TG:

    break;
    case routeTypes.VFR_ENROUTE:

    break;
  }
});

export const clearToLand = (airplane, rwyName) => {
  const { windspd, winddir } = GameStore;
  const winddirtxt = winddir.toFixed(0);
  const windspdtxt = windspd.toFixed(0);
  const callsign = communications.getCallsign(airplane, false);
  const wind = windspd < 5 
    ? 'calm' 
    : `${winddirtxt} at ${windspdtxt} knots`;
  const text = communications.getCallsign(airplane, false) 
    + ' cleared to land runway ' + rwyName + ` the wind is ${wind}`;
  GameStore.addLog(text, true);
  communications.speak(text);
};
