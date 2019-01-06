import { Component } from 'preact';
import './MSALayer.css';
import { polyBounds, average } from '../../lib/util';
import GameStore from '../../stores/GameStore';
import MSABlocks from '../MSABlocks/MSABlocks';

class MSALayer extends Component {
  constructor(props) {
    super();
    this.state = {
      msa: GameStore.map.msa,
      zoom: GameStore.zoom
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentWillMount() {
    GameStore.on('start', this.handleGameStoreStart);
    GameStore.on('change', this.handleGameStoreChange);
  }

  componentWillUnmount() {
    GameStore.removeListener('start', this.handleGameStoreStart);
    GameStore.removeListener('change', this.handleGameStoreChange);
  }

  handleGameStoreStart = () => {
    this.setState({
      msa: GameStore.map.msa
    });
  };

  handleGameStoreChange = () => {
    if (this.state.zoom === GameStore.zoom) return;

    this.setState({
      zoom: GameStore.zoom
    });
  };

  render() {
    return (
      <g className="msa-layer">
        {this.state.msa.polygons.map((polygon, i) => (
          <MSABlocks
            zoom={this.state.zoom}
            key={i}
            polygon={polygon.vertices}
            msa={polygon.alt}
          />
        ))}
      </g>
    );
  }
}

export default MSALayer;
