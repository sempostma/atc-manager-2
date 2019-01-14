import { EventEmitter } from 'events';
import {
  sendMessageWarning,
  sendMessageError
} from '../components/GameMessages/GameMessages';
import { parseAptNav, parseApt } from '../lib/ground/spec';
import { logErr } from '../lib/util';

class AptDatStore extends EventEmitter {
  constructor() {
    super();

    const url = (this.url = 'https://esstudio.site/apt-dat-parser-js/data/');

    this.loading = true;
    const aptNavPromise = fetch(url + 'apt_nav.dat.txt').then(x => x.text());
    const earthFixPromise = fetch(url + 'earth_fix.dat.txt').then(x =>
      x.text()
    );
    const earthNavPromise = fetch(url + 'earth_nav.dat.txt').then(x =>
      x.text()
    );

    this.datPromise = Promise.all([
      aptNavPromise,
      earthFixPromise,
      earthNavPromise
    ])
      .then(this.handleDataloaded)
      .catch(err => {
        sendMessageError('Something wen\'t wrong while loading world data.');
        logErr(err);
      });
  }

  handleDataloaded = resolved => {
    const [aptNav, earthFix, earthNav] = resolved;
    this.loading = false;
    this.emit('change');

    return resolved;
  };

  searchAptNavIcao = icao => {
    icao = icao.toUpperCase();
    return this.datPromise.then(resolved => {
      const [aptNav, earthFix, earthNav] = resolved;

      return aptNav.split('\n').filter(apt => apt.split(' ')[0].includes(icao));
    });
  };

  searchAptName = name => {
    return this.datPromise.then(resolved => {
      const [aptNav, earthFix, earthNav] = resolved;

      return aptNav.split('\n').filter(apt =>
        apt
          .split(' ')
          .slice(3)
          .join(' ')
          .includes(name)
      );
    });
  };

  fetchAptByIcao = async icao => {
    icao = icao.toUpperCase();
    const response = await fetch(this.url + `airports/${icao}.dat.txt`);
    const txt = await response.text();

    return parseApt(txt, true)[0];
  };
}

export default new AptDatStore();
