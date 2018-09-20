import './PlaneAlt.css';
import GameStore from '../../stores/GameStore';
import { routeTypes } from '../../lib/airplane-library/airplane-library';
import { idType } from '../../lib/map';
import AltFmt from '../AltFmt/AltFmt';

const PlaneAlt = ({ airplane, tagName }) => {
  const cs = GameStore.callsignsPos[airplane.tgtDirection];
  const isLanding = cs && cs.ref.type === idType.RWY && airplane.routeType === routeTypes.INBOUND;
  const TagName = tagName;
  const showTgt = Math.abs(airplane.tgtAltitude - airplane.altitude) > 100 && airplane.altitude && !isLanding;
  const tgt = showTgt
    && <TagName className={airplane.tgtAltitude > airplane.altitude ? 'up' : 'down'}>
      ⇧<AltFmt tgtAltitude={airplane.tgtAltitude} tagName={TagName} />
    </TagName>
    || null;

  return <TagName><AltFmt altitude={airplane.altitude} tagName={TagName} />{ tgt }</TagName>;
};

export default PlaneAlt;
