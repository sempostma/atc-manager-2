import 'react-github-button/assets/style.css';
import './style';
import { Component } from 'preact';
import Router from 'preact-router';
import { createHashHistory } from 'history';
import Game from 'async!./containers/Game/Game';
// import GroundGame from 'async!./containers/GroundGame/GroundGame';
import Home from 'async!./containers/Home/Home';
import { EventEmitter } from 'events';
import NotFound from 'async!./containers/NotFound/NotFound';
import EditorsRoot from 'async!./containers/EditorsRoot/EditorsRoot';
import { GameMessages } from './components/GameMessages/GameMessages';
import LoginScreen from './components/LoginScreen/LoginScreen'
// import AptDat from 'async!./containers/AptDat/AptDat';
import TimelapseRoot from 'async!./containers/TimelapseRoot/TimelapseRoot';
// import TropriaContainer from 'async!./containers/TropriaContainer/TropriaContainer';
import TutorialsRoot from './containers/TutorialsRoot/TutorialsRoot';
import TutorialsIntro from './containers/TutorialsIntro/TutorialsIntro';
import TutorialsTextCommands from './containers/TutorialsTextCommands/TutorialsTextCommands';
import { loadCSS, loadJS } from './lib/lazy-load';

if (typeof window !== 'undefined') {
  window.onbeforeunload = function () {
    return 'You have unsaved progress. Are you sure you want to exit without saving?';
  };
  window.onerror = function(message, source, lineno, colno, error) {
    if (error) message = error.stack;
    if (window.ga) window.ga.getAll()[0].send('event', 'window.onerror', message, navigator.userAgent);
  }
  loadCSS('https://fonts.googleapis.com/css?family=Roboto+Mono');
  loadJS('https://buttons.github.io/buttons.js');
  loadJS('https://www.googletagmanager.com/gtag/js?id=UA-90014538-13');
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
          {/* <GroundGame path="/game-ground" /> */}
          <EditorsRoot path="/editor/:editorroute" />
          <TimelapseRoot path="/timelapse/:timelapseroute" />
          {/* <AptDat path="/apt-dat" /> */}
          <TutorialsRoot path="tutorials" />
          <TutorialsIntro path="tutorials/intro" />
          <TutorialsTextCommands path="tutorials/text-commands" />
          <NotFound default />
        </Router>
        <LoginScreen />
        <GameMessages />
      </main>
    );
  }
}
