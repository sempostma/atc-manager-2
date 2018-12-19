import { emitter } from '../../lib/airplane';
import { routeTypes } from '../../lib/airplane-library/airplane-library';
import GameStore from '../GameStore';

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


