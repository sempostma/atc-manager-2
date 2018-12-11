import { Component } from 'preact';
import './ActionContextMenu.css';

class ActionContextMenu extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        style={{ left: this.props.left + 'px', top: this.props.top + 'px' }}
        className="ActionContextMenu"
      >
        {this.props.actions.map(action => (
          <div className="ContextMenuItem" onClick={action.action}>
            {action.getTitle()}
          </div>
        ))}
      </div>
    );
  }
}

export default ActionContextMenu;
