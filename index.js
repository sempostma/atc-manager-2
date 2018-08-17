import 'milligram';
import './style';
import { Component } from 'preact';
import Router from 'preact-router';
import createHashHistory from 'history/createHashHistory';
import Game from './containers/Game/Game';
import Home from './containers/Home/Home';
import GameStore from './stores/GameStore';
import { EventEmitter } from 'events';

if (typeof window !== 'undefined') {
  window.onbeforeunload = function () {
    return 'You have unsaved progress. Are you sure you want to exit without saving?';
  }
}

export const router = new EventEmitter();

export default class App extends Component {
  constructor(props) {
    super();
    this.setState({

    });
  }

  render() {
    let history = typeof window !== "undefined" ? createHashHistory() : undefined; // enable pre rendering
    return (
      <main>
        <Router history={history} onChange={router.emit('change')}>
          <Home path="/" />
          <Game path="/game" />
        </Router>
      </main>
    );
  }
}
