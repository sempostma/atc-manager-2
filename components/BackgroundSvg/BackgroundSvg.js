import { Component } from 'react';
import './BackgroundSvg.css';

class BackgroundSvg extends Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name;
  }

  render() {
    let url = `assets/maps/${this.props.name}.xml`;
    if (typeof window === 'undefined') url = 'https://esstudio.site/atc-manager-2/' + url;
    if (this.props.name) {
      fetch(url)
        .then(response => response.text())
        .then(xml => this.el.innerHTML = xml);
    }
    return (
      <g transform="translate(-640, -360)" className="background" ref={el => this.el = el} />
    );
  }
}

export default BackgroundSvg;
