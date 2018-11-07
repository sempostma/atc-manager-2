import { EventEmitter } from 'events';
import { sendMessageWarning, sendMessageError } from '../components/GameMessages/GameMessages';

class AptDatStore extends EventEmitter {

  constructor() {
    super();

    const url = 'https://esstudio.site/apt-dat-parser-js/data/';

    this.loading = true;
    const aptNavPromise = fetch(url + 'apt_nav.dat').then(x => x.text());
    const earthFixPromise = fetch(url + 'earth_fix.dat').then(x => x.text());
    const earthNavPromise = fetch(url + 'earth_nav.dat').then(x => x.text());

    this.datPromise = Promise.all([aptNavPromise, earthFixPromise, earthNavPromise]).then(this.handleDataloaded)
      .catch(err => {
        sendMessageError('Something wen\'t wrong while loading world data.');
        console.error(err);
      });

  }

  handleDataloaded = resolved => {
    const [aptNav, earthFix, earthNav] = resolved;
    console.log('data loaded');
    this.loading = false;
    this.emit('change');

    return resolved;
  }

  searchAptIcao = icao => {
    return this.datPromise.then(resolved => {
      const [aptNav, earthFix, earthNav] = resolved;

      return aptNav.split('\n').filter(apt => apt.split(' ')[0].includes(icao));
    });
  }

  searchAptName = name => {
    return this.datPromise.then(resolved => {
      const [aptNav, earthFix, earthNav] = resolved;
      
      return aptNav.split('\n').filter(apt => apt.split(' ').slice(3).join(' ').includes(name));
    });
  }

}

export default new AptDatStore();

