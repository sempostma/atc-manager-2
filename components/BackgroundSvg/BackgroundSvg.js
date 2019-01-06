import { Component } from 'react';
import './BackgroundSvg.css';
import config from '../../lib/config';

class BackgroundSvg extends Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name;
  }

  render() {
    let url = `assets/maps/${this.props.name}.xml`;
    if (typeof window === 'undefined') url = config.urlRaw + url;
    if (this.props.name) {
      fetch(url)
        .then(response => response.text())
        .then(xml => {
          if (this.el) this.el.innerHTML = xml;
        });
    }
    return (
      <g
        transform="translate(-640, -360)"
        className="background"
        ref={el => (this.el = el)}
      />
    );
  }
}

export default BackgroundSvg;
