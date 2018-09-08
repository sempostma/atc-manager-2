import { Component } from 'preact';
import { history } from '../../index';
import { route } from 'preact-router';
import './SavesEditor.css';

class SavesEditor extends Component {
  constructor(props) {
    super();
    this.state = {
    };

  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div style="background-color: rgb(25, 72, 80);" className="SavesEditor">
        <h1>SavesEditor</h1>
      </div>
    );
  }
}

export default SavesEditor;
