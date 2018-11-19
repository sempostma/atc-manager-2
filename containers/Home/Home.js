import { Component } from 'preact';
import './Home.css';
import { FaLink, FaShareAlt, FaEnvelope, FaTwitter, FaRss, FaInfo, FaMobile, FaSitemap, FaRedditAlien, FaClock, FaBuilding, FaSave, FaPlane, FaGithub } from 'react-icons/fa/index.mjs';
import SavedGamesOpen from '../../components/SavedGamesOpen/SavedGamesOpen';
import { mapsArr, maps } from '../../lib/map';
import { Link, route } from 'preact-router';
import GameStore from '../../stores/GameStore';
import Settings from '../../components/Settings/Settings';
import { router } from '../../index';
import { upcase } from '../../lib/util';
import SocialButtons from '../../components/SocialButtons/SocialButtons';
import config from '../../lib/config';
import SharingPanel from '../../components/SharingPanel/SharingPanel';
import AtomFeed from '../../components/AtomFeed/AtomFeed';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      mapkey: mapsArr[0].id,
      sharing: false,
    };

    this.handleMapSelectionChange = this.handleMapSelectionChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
  }

  componentWillMount() {
    router.on('change', this.reRender);
  }

  componentWillUnmount() {
    router.removeListener('change', this.reRender);
  }

  reRender = () => this.setState({});

  handleMapSelectionChange(e) {
    this.setState({ mapkey: e.target.value });
  }

  handleReturnToGame() {
    route('/game');
  }

  sharingDone = () => this.setState({ sharing: false });

  share = () => this.setState({ sharing: true });

  handleStartClick() {
    if (GameStore.started) {
      const force = confirm('Another game is already in progress. Make sure you have saved your progress. Do you want to continue?');
      if (force) {
        GameStore.stop();
      } else {
        return;
      }
    }
    GameStore.startMap(this.state.mapkey);
    route('/game');
  }

  handleTutorialClick = () => {
    route('/tutorials/intro');
  }

  render() {
    return (
      <div className="home" style="background-color: #194850">
        <div className="abs-container">
          {GameStore.started ? <button onClick={this.handleReturnToGame}>Return to Game</button> : null}
        </div>
        <div className="panel" >
          <h1>ATC Manager 2</h1>
          <div style="padding: 30px 20px;">
            {config.description}
            <br /><br />Check out the <a title="Android App" href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager&hl=en_US">App</a> for mobile.
          </div>
        </div>
        <div className="panel">
          <SavedGamesOpen />
        </div>
        <div className="panel">
          <h2 className="mb">Start</h2>
          <span className="mb">Airport:</span>
          <select className="mb" onInput={this.handleMapSelectionChange}>
            {mapsArr.map(map =>
              <option selected={map.id === this.state.mapkey} value={map.id}>{map.name}</option>
            )}
          </select>
          {maps[this.state.mapkey].ga === 0 ? <small class="color-red">Airport does not support general aviation.</small> : null}
          {maps[this.state.mapkey].commercial === 0 ? <small class="color-red">Airport does not support commercial traffic.</small> : null}
          <Settings />
          <br />
          <button onClick={this.handleStartClick}>Start</button>
          <button onClick={this.handleTutorialClick}>Tutorial</button>
        </div>
        <div className="panel panel-links" style={{ padding: 3 }}>
          <Link href="/editor/save-editor">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaSave />
                </span><br />
                Saves Editor
              </div>
            </div>
          </Link>
          <Link href="/editor/airplane-editor">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaPlane />
                </span><br />
                Airplanes Editor
              </div>
            </div>
          </Link>
          <Link href="/editor/operator-editor">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaBuilding />
                </span><br />
                Operator Editor
              </div>
            </div>
          </Link>
          <Link href="/timelapse/overview">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaClock />
                </span><br />
                Timelapses
              </div>
            </div>
          </Link>
          <Link href="/tutorials">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaInfo />
                </span><br />
                Tutorials
              </div>
            </div>
          </Link>
          <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager" target="_blank">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaMobile />
                </span><br />
                Mobile App (external)
              </div>
            </div>
          </a>
          <a href="https://esstudio.site" target="_blank">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaSitemap />
                </span><br />
                Other Projects (external)
              </div>
            </div>
          </a>
          <a href="https://esstudio.site/contact" target="_blank">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaEnvelope />
                </span><br />
                Contact (external)
              </div>
            </div>
          </a>
          <span className="inline-block">
            <div class="block-outer" onClick={this.share}>
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaShareAlt />
                </span><br />
                Share
              </div>
            </div>
          </span>
          <a target="_blank" href="https://www.reddit.com/r/ATCManager2">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaRedditAlien />
                </span><br />
                Subreddit<br />
                (external)
              </div>
            </div>
          </a>
          <a href="https://twitter.com/esstudio_site" target="_blank">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaTwitter />
                </span><br />
                Twitter (external)
              </div>
            </div>
          </a>
          <a href="https://github.com/LesterGallagher/atc-manager-2" target="_blank">
            <div class="block-outer">
              <div class="block-inner">
                <span className="link-icon-wrapper">
                  <FaGithub />
                </span><br />
                Github (external)
              </div>
            </div>
          </a>
        </div>
        <div className="panel panel-feed" style={{ padding: 3 }}>
          <AtomFeed url={config.feedUrl} />
        </div>
        {this.state.sharing ? <div className="panel-open-bg"></div> : null}
        {this.state.sharing ? <SharingPanel onClose={this.sharingDone} promise={Promise.resolve({
          title: 'ATC Manager 2',
          text: config.description,
          url: config.url
        })} /> : null}
      </div>
    );
  }
}

export default Home;
