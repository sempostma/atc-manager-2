import './PlaneAlt.css';
import GameStore from '../../stores/GameStore';
import { routeTypes } from '../../lib/airplane-library/airplane-library';
import { idType } from '../../lib/map';
import AltFmt from '../AltFmt/AltFmt';
import Airplane from '../../lib/airplane';

const PlaneAlt = ({ airplane, tagName }) => {
  const cs = GameStore.callsignsPos[airplane.tgtDirection];
  const isLandingOrApproaching =
    cs &&
    cs.ref.type === idType.RWY &&
    airplane.routeType === routeTypes.INBOUND;
  const landingDescend =
    isLandingOrApproaching && airplane.altitude < airplane.tgtAltitude;
  const TagName = tagName;
  const showTgt =
    Math.abs(airplane.tgtAltitude - airplane.altitude) > 100 &&
    airplane.altitude &&
    !landingDescend &&
    !Airplane.isVFR(airplane);
  const tgt =
    (showTgt && (
      <TagName
        className={airplane.tgtAltitude > airplane.altitude ? 'up' : 'down'}
      >
        {airplane.tgtAltitude > airplane.altitude ? '⇧' : '⇩'}
        <AltFmt altitude={airplane.tgtAltitude} tagName={tagName} />
      </TagName>
    )) ||
    null;

  return (
    <TagName>
      <AltFmt altitude={airplane.altitude} tagName={tagName} />
      {tgt}
    </TagName>
  );
};

export default PlaneAlt;
