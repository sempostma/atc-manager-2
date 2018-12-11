import './AltFmt.css';

const AltFmt = ({ altitude, tagName }) => {
  const TagName = tagName;
  return (
    <TagName>
      {altitude > 18000
        ? `FL${Math.floor(altitude * 0.01)}`
        : `${Math.floor(altitude)}FT`}
    </TagName>
  );
};

export default AltFmt;
