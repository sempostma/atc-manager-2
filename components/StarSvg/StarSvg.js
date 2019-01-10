import { Component } from 'react';
import './StarSvg.css';
import GameStore from '../../stores/GameStore';
import config from '../../lib/config';
import SettingsStore from '../../stores/SettingsStore';
import { idType } from '../../lib/map';

class StarSvg extends Component {
  constructor(props) {
    super();
    this.state = {
      stars: GameStore.parsedStars,
      zoom: GameStore.zoom
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
    this.setState({
      stars: GameStore.parsedStars
    });
  };

  handleGameStoreChange = () => {
    if (this.state.zoom === GameStore.zoom) return;

    this.setState({
      zoom: GameStore.zoom
    });
  };

  handleSettingStoreChange = () => {
    this.setState({});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  handleCmdTgtChange = cmd => {
    this.setState({ cmdtgt: cmd.tgt });
  };

  zoomX = x => (x - config.width / 2) * this.state.zoom + config.width / 2;

  zoomY = y => (y - config.height / 2) * this.state.zoom + config.height / 2;

  labelPos = (p1, p2) => (p1 * 2 + p2) / 3;

  isFocussed = routeName =>
    this.state.cmdtgt &&
    typeof this.state.cmdtgt.tgtDirection === 'string' &&
    this.state.cmdtgt.tgtDirection.toLowerCase() === routeName.toLowerCase();

  render() {
    if (!SettingsStore.sidsStars) return null;
    const stars = this.state.stars;
    if (!stars) return;
    const jsx = Object.keys(stars).map((key, i) => {
      const star = stars[key].route
        .slice(0)
        .filter(x => typeof x.dir !== 'number');
      const mx = this.labelPos(
        GameStore.callsignsPos[star[0].dir].x,
        GameStore.callsignsPos[star[1].dir].x
      );
      const my = this.labelPos(
        GameStore.callsignsPos[star[0].dir].y,
        GameStore.callsignsPos[star[1].dir].y
      );
      let previous = star.splice(0, 1)[0];
      const starJsx = star.map((item, i) => {
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
      const classList = ['star'];
      if (this.isFocussed(key)) {
        classList.push('focussed');
      }
      return (
        <g key={i} className={classList.join(' ')}>
          <text x={this.zoomX(mx)} y={this.zoomY(config.height - my)}>
            {key}
          </text>
          {starJsx}
        </g>
      );
    });
    return <g className="StarSvg">{jsx}</g>;
  }
}

export default StarSvg;
