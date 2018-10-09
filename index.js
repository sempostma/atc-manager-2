import 'react-github-button/assets/style.css';
import './style';
import { Component } from 'preact';
import Router from 'preact-router';
import createHashHistory from 'history/createHashHistory';
import Game from 'async!./containers/Game/Game';
import Home from 'async!./containers/Home/Home';
import { EventEmitter } from 'events';
import NotFound from 'async!./containers/NotFound/NotFound';
import EditorsRoot from 'async!./containers/EditorsRoot/EditorsRoot';
import { GameMessages } from './components/GameMessages/GameMessages';
import AptDat from 'async!./containers/AptDat/AptDat';
import TimelapseRoot from 'async!./containers/TimelapseRoot/TimelapseRoot';

if (typeof window !== 'undefined') {
  window.onbeforeunload = function () {
    return 'You have unsaved progress. Are you sure you want to exit without saving?';
  };
}

export const router = new EventEmitter();
export const history = typeof window !== 'undefined' ? createHashHistory() : undefined; // enable pre rendering

export default class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <main>
        <Router history={history} onChange={router.emit('change')}>
          <Home path="/" />
          <Game path="/game" />
          <EditorsRoot path="/editor/:editorroute" />
          <TimelapseRoot path="/timelapse/:timelapseroute" />
          <AptDat path="/apt-dat" />
          <NotFound default />
        </Router>
        <GameMessages />
      </main>
    );
  }
}
