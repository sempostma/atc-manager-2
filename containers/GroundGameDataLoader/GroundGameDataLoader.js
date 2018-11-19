import { Component } from 'preact';
import './GroundGameDataLoader.css';

class GroundGameDataLoader extends Component {
  constructor(props) {
    super();
    this.state = {
    };

    

  }

  componentWillMount() {
    this.interval = setInterval(this.setDots);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setDots = () => {
    this.setState({ dots: (this.state.dots + 1) % 6 });
  }

  render() {
    const dots = '.....'.slice(this.state.dots);
    
    return (
      <div className="GroundGameDataLoader">
        <div className="InnerLoader">
          <h3 className="left">Nav Fixes</h3>
          <h3 className="right">Loading{dots}</h3>
          <h3 className="left">Airports List</h3>
          <h3 className="right">Loading{dots}</h3>
          <h3 className="left">Nav Beacons</h3>
          <h3 className="right">Loading{dots}</h3>
        </div>
      </div>
    );
  }
}

export default GroundGameDataLoader;
