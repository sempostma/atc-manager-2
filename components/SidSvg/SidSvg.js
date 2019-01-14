import { Component } from 'react';
import './SidSvg.css';
import GameStore from '../../stores/GameStore';
import config from '../../lib/config';
import SettingsStore from '../../stores/SettingsStore';

class SidSvg extends Component {
  constructor(props) {
    super();
    this.state = {
      sids: GameStore.parsedSids,
      zoom: GameStore.zoom,
      cmdtgt: undefined
    };
  }

  componentWillMount() {
    GameStore.on('start', this.handleGameStoreStart);
    GameStore.on('change', this.handleGameStoreChange);
    SettingsStore.on('change', this.handleSettingStoreChange);
    if (this.props.emitter)
      this.props.emitter.on('cmdtgt', this.handleCmdTgtChange);
    if (this.props.emitter)
      this.props.emitter.on('cmdexecution', this.handleCmdTgtChange);
  }

  componentWillUnmount() {
    GameStore.removeListener('start', this.handleGameStoreStart);
    GameStore.removeListener('change', this.handleGameStoreChange);
    SettingsStore.removeListener('change', this.handleSettingStoreChange);
    if (this.props.emitter)
      this.props.emitter.removeListener('cmdtgt', this.handleCmdTgtChange);
    if (this.props.emitter)
      this.props.emitter.removeListener(
        'cmdexecution',
        this.handleCmdTgtChange
      );
  }

  handleGameStoreStart = () => {
    this.setState({ sids: GameStore.parsedSids });
  };

  handleCmdTgtChange = cmd => {
    this.setState({ cmdtgt: cmd.tgt });
  };

  handleSettingStoreChange = () => {
    this.setState({});
  }

  handleGameStoreChange = () => {
    if (this.state.zoom === GameStore.zoom) return;
    this.setState({ zoom: GameStore.zoom });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  zoomX = x => (x - config.width / 2) * this.state.zoom + config.width / 2;

  zoomY = y => (y - config.height / 2) * this.state.zoom + config.height / 2;

  labelPos = (p1, p2) => (p1 * 2 + p2) / 3;

  isFocussed = routeName =>
    this.state.cmdtgt &&
    typeof this.state.cmdtgt.tgtDirection === 'string' &&
    this.state.cmdtgt.tgtDirection.toLowerCase() === routeName.toLowerCase();

  render() {
    if (!SettingsStore.sidsStars) return null;
    const sids = this.state.sids;
    if (!sids) return;
    const jsx = Object.keys(sids).map((key, i) => {
      const sid = sids[key].route
        .slice(0)
        .filter(x => typeof x.dir !== 'number');
      const mx = this.labelPos(
        GameStore.callsignsPos[sid[sid.length - 1].dir].x,
        GameStore.callsignsPos[sid[sid.length - 2].dir].x
      );
      const my = this.labelPos(
        GameStore.callsignsPos[sid[sid.length - 1].dir].y,
        GameStore.callsignsPos[sid[sid.length - 2].dir].y
      );
      let previous = sid.splice(0, 1)[0];
      const sidJsx = sid.map((item, i) => {
        const attrs = {
          x1: this.zoomX(GameStore.callsignsPos[previous.dir].x),
          y1: this.zoomY(
            config.height - GameStore.callsignsPos[previous.dir].y
          ),
          x2: this.zoomX(GameStore.callsignsPos[item.dir].x),
          y2: this.zoomY(config.height - GameStore.callsignsPos[item.dir].y),
          key: i
        };
        previous = item;
        return <line {...attrs} />;
      });
      const classList = ['sid'];
      if (this.isFocussed(key)) {
        classList.push('focussed');
      }
      return (
        <g key={i} className={classList.join(' ')}>
          <text x={this.zoomX(mx)} y={this.zoomY(config.height - my)}>
            {key}
          </text>
          {sidJsx}
        </g>
      );
    });
    return <g className="SidSvg">{jsx}</g>;
  }
}

export default SidSvg;
