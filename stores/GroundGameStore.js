import { EventEmitter } from 'events';
import AptDatStore from './AptDatStore';

class GroundGameStore extends EventEmitter {

  constructor() {
    super();
    
    this.aptNav = null;
    this.apt = null;
    this.loaded = false;
  }

  loadByIcao = async icao => {
    this.loaded = false;
    const [apt, aptNavLine] = await Promise.all([
      AptDatStore.fetchAptByIcao(icao),
      AptDatStore.searchAptNavIcao(icao)
    ]);

    const split = aptNavLine[0].split(' ');

    this.aptNav = {
      icao: split[0],
      lat: split[1],
      lng: split[2],
      name: split.slice(3).join(' ')
    };

    this.apt = apt;
    this.loaded = false;

    this.emit('change');
  }


}

export default new GroundGameStore();
