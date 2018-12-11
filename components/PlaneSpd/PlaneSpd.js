import './PlaneSpd.css';
import Airplane from '../../lib/airplane';
import { idType } from '../../lib/map';
import { routeTypes } from '../../lib/airplane-library/airplane-library';
import GameStore from '../../stores/GameStore';

const getSpdJsx = ({ airplane, tagName }) => {
  const cs = GameStore.callsignsPos[airplane.tgtDirection];
  const tgtSpeed =
    airplane.altitude < 10000
      ? Math.min(airplane.tgtSpeed, 250)
      : airplane.tgtSpeed;
  const TagName = tagName;
  const isLandingOrApproaching =
    cs &&
    cs.ref.type === idType.RWY &&
    airplane.routeType === routeTypes.INBOUND;
  if (
    Math.abs(airplane.speed - tgtSpeed) > 5 &&
    !Airplane.isVFR(airplane) &&
    !isLandingOrApproaching
  ) {
    return (
      <TagName>
        {Math.round(airplane.speed)}KTS
        {tgtSpeed > airplane.speed ? (
          <TagName className="up">⇧{Math.round(tgtSpeed)}KTS</TagName>
        ) : (
          <TagName className="down">⇩{Math.round(tgtSpeed)}KTS</TagName>
        )}
      </TagName>
    );
  } else {
    return <TagName>{Math.round(airplane.speed)}KTS</TagName>;
  }
};

export default getSpdJsx;
