import { Component } from 'preact';
import { Tropria } from 'tropria-component';

class TropriaContainer extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
      <Tropria />
    )
  }
}

export default TropriaContainer;
