import { Component } from 'preact';
import './SavedTimelapseOpen.css';
import { loadState, saveState } from '../../lib/persistance';
import { Route, Link, route } from 'preact-router';
import GameStore from '../../stores/GameStore';

class SavedTimelapseOpen extends Component {
  constructor(props) {
    super();

    const timelapses = [];
    const s = loadState();
    for (const name in s.timelapses) {
      if (s.timelapses.hasOwnProperty(name)) {
        timelapses.push({ name, state: s.timelapses[name] });
      }
    }

    this.state = { timelapses };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleSavedTimelapseOpenListItemClick = e => {
    const name = e.currentTarget.getAttribute('data-name');
    route('/timelapse/localstorage?key=' + name);
  };

  handleSavedTimelapseOpenListItemTrash = e => {
    const name = e.currentTarget.getAttribute('data-name');
    const state = loadState();
    const sure = confirm('Are you sure?');
    if (!sure) return;
    delete state.timelapses[name];
    saveState(state);
    const timelapses = [];
    for (const name in state.timelapses) {
      if (state.timelapses.hasOwnProperty(name)) {
        timelapses.push({ name, state: state.timelapses[name] });
      }
    }
    this.setState({ timelapses });
  };

  render() {
    const list = this.state.timelapses.map((x, i) => (
      <div data-name={x.name} key={i} className="save">
        <h5 className="save-name">{x.name}</h5>
        <svg
          onClick={this.handleSavedTimelapseOpenListItemClick}
          data-name={x.name}
          className="save-img"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 1536h768v-384h-768v384zm896 0h128v-896q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28h-576q-40 0-68-28t-28-68v-416h-128v1280h128v-416q0-40 28-68t68-28h832q40 0 68 28t28 68v416zm-384-928v-320q0-13-9.5-22.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5zm640 32v928q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z" />
        </svg>
        <svg
          data-name={x.name}
          onClick={this.handleSavedTimelapseOpenListItemTrash}
          className="trash"
          viewBox="0 0 1792 1792"
        >
          <path d="M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z" />
        </svg>
      </div>
    ));
    return (
      <div className="savedgamesopen">
        Timelapses:
        <div className="savedgamesopen-list">
          {list.length > 0 ? list : <small>Nothing...</small>}
        </div>
      </div>
    );
  }
}

export default SavedTimelapseOpen;
