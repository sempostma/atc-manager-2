import './AltFmt.css';

const AltFmt = ({ altitude, TagName }) =>
  <TagName>{altitude > 18000
    ? `FL${Math.floor(altitude * .01)}`
    : `${Math.floor(altitude)}FT`}</TagName>;

export default AltFmt;
