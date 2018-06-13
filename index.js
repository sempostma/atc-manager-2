import 'milligram';
import './style';
import { Component } from 'preact';
import Router from 'preact-router';
import createHashHistory from 'history/createHashHistory';
import Game from './containers/Game/Game';
import Home from './containers/Home/Home';

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
        <Router history={history}>
          <Home path="/" />
          <Game path="/game" />
        </Router>
      </main>
    );
  }
}
