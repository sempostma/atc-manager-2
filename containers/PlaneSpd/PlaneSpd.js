import './PlaneSpd.css';

const getSpdJsx = ({ airplane, tagName }) => {
  const tgtSpeed = airplane.altitude < 10000 ? Math.min(airplane.tgtSpeed, 250) : airplane.tgtSpeed;
  const TagName = tagName;
  if (Math.abs(airplane.speed - tgtSpeed) > 5) {
    return <TagName>
      {Math.round(airplane.speed)}KTS
      {tgtSpeed > airplane.speed ? <TagName className="up">
        ⇧{Math.round(tgtSpeed)}KTS</TagName> : <TagName className="down">
          ⇩{Math.round(tgtSpeed)}KTS</TagName>}
    </TagName>
  } else {
    return <TagName>{Math.round(airplane.speed)}KTS</TagName>
  }
};

export default getSpdJsx;
