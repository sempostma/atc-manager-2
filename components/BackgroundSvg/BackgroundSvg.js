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
    if (this.props.name) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          this.el.innerHTML = xhttp.responseText;
        }
      }.bind(this);
      xhttp.open('GET', `./assets/maps/${this.props.name}.txt`, true);
      xhttp.send();
    }
    return (
      <g transform="translate(-640, -360)" className="background" ref={el => this.el = el} />
    );

  }
}

export default BackgroundSvg;
