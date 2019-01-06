import { Component } from 'preact';
import './WindowLoader.css';

const setProps = props => ({
  color: props.color || '#19242e',
  progress: props.progress || 100
});

class WindowLoader extends Component {
  constructor(props) {
    super();
    this.state = setProps(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        className="WindowLoader"
        style={{
          backgroundColor: this.state.color,
          width: this.state.progress + '%'
        }}
      />
    );
  }
}

export default WindowLoader;
