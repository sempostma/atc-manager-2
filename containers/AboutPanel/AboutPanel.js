import { Component } from 'preact';
import './AboutPanel.css';
import { FaCompress } from 'react-icons/fa/index.esm';
import GitHubButton from 'react-github-button';
import Donate from '../Donate/Donate';

class AboutPanel extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() { }

  componentWillUnmount() { }

  render() {
    return (
      <div
        className={[this.props.expanded ? null : 'hidden', 'about-panel'].join(
          ' '
        )}
      >
        <GitHubButton
          type="stargazers"
          namespace="LesterGallagher"
          repo="atc-manager-2"
        />
        &nbsp;
        <GitHubButton
          type="watchers"
          namespace="LesterGallagher"
          repo="atc-manager-2"
        />
        &nbsp;
        <a
          class="header-btn"
          href="https://www.paypal.me/esstudio"
          target="_blank"
        >
          <span class="legend">support</span>
          <span class="paypal">paypal</span>
        </a>
        <br />
        <br />
        ATC Manager 2 is a web based air traffic control game. Manage airspace
        of busy airports like Schiphol or Heathrow in a realistic simulator.
        Check out the{' '}
        <a
          href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager&hl=en_US"
          target="_blank"
        >
          ATC Manager 1 App
        </a>
        .
        <Donate />
        <br />
        <h5>A Special thanks to...</h5>
        <b>Donator(s) to the project: </b>
        <ul>
          <li>
            <a href="https://www.reddit.com/user/KableKiB" target="_blank">
              KableKiB
            </a>
          </li>
          <li>
            Richard Johnson
          </li>
          <li>
            Tracy Mercier
          </li>
          <li>
            Eric Hvinden
          </li>
          <li>
            Richard Johnson
          </li>
          <li>
            Michael Welch
          </li>
        </ul>
        <b>Top Contributors:</b>
        <ul>
          <li>
            <a href="https://www.reddit.com/user/KableKiB" target="_blank">
              KableKiB
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/AWT-Colin" target="_blank">
              AWT-Colin
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/chrstphd" target="_blank">
              chrstphd
            </a>
          </li>
        </ul>
        <b>
          Others that have contributed to the project, gave feedback or helped
          in any other way:
        </b>
        <ul>
          <li>
             gummybear84417
          </li>
          <li>
             alejandrok338
          </li>
          <li>
            <a href="https://www.reddit.com/user/KableKiB" target="_blank">
              KableKiB
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/chrstphd" target="_blank">
              chrstphd
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/wonderfulllama"
              target="_blank"
            >
              wonderfulllama
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/jet86" target="_blank">
              jet86
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/Afirus" target="_blank">
              Afirus
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/xtesseract" target="_blank">
              xtesseract
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/FlightGearLego"
              target="_blank"
            >
              FlightGearLego
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/PURRING_SILENCER"
              target="_blank"
            >
              PURRING_SILENCER
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/wonderfulllama"
              target="_blank"
            >
              wonderfulllama
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/ShadingVaz" target="_blank">
              ShadingVaz"
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/FlightGearLego"
              target="_blank"
            >
              FlightGearLego
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/wonderfulllama"
              target="_blank"
            >
              wonderfulllama
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/wichtel-goes-kerbal"
              target="_blank"
            >
              wichtel-goes-kerbal
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/megaphoneCA" target="_blank">
              megaphoneCA
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/catullus48108" target="_blank">
              catullus48108
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/phil_57" target="_blank">
              phil_57
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/Syleril" target="_blank">
              Syleril
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/tbonge" target="_blank">
              tbonge
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/toasted-donut" target="_blank">
              toasted-donut
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/RoboRager" target="_blank">
              RoboRager
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/cplane97" target="_blank">
              cplane97
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/seungseung22" target="_blank">
              seungseung22
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/HL3177" target="_blank">
              Harryhylai
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/ImportedSwede" target="_blank">
              ImportedSwede
            </a>
          </li>

          <li>
            <a href="https://www.reddit.com/user/LordFirebeard" target="_blank">
              LordFirebeard
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/a_calder" target="_blank">
              a_calder
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/JoshuaACasey" target="_blank">
              JoshuaACasey
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/user/monsantobreath"
              target="_blank"
            >
              monsantobreath
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/Blythyvxr" target="_blank">
              Blythyvxr
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/LiuPilot" target="_blank">
              LiuPilot
            </a>
          </li>
          <li>
            Charlie Bravo
          </li>
          <li>
            <a href="https://www.reddit.com/user/woloszanski" target="_blank">
              woloszanski
            </a>
          </li>
        </ul>
        <h5>Links: (external)</h5>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://click.linksynergy.com/fs-bin/click?id=gX56itLGvIE&amp;offerid=145238.10000683&amp;type=3&amp;subid=0"
            >
              Tech eBooks
            </a>
            <img
              border="0"
              width="1"
              alt=""
              height="1"
              src="https://ad.linksynergy.com/fs-bin/show?id=gX56itLGvIE&amp;bids=145238.10000683&amp;type=3&amp;subid=0"
            />
          </li>
          <li>
            <a
              target="_blank"
              href="https://click.linksynergy.com/fs-bin/click?id=gX56itLGvIE&amp;offerid=579862.416&amp;type=3&amp;subid=0"
            >
              Tech courses
            </a>
            <img
              border="0"
              width="1"
              alt=""
              height="1"
              src="https://ad.linksynergy.com/fs-bin/show?id=gX56itLGvIE&amp;bids=579862.416&amp;type=3&amp;subid=0"
            />
          </li>
          <li>
            <a
              target="_blank"
              href="https://click.linksynergy.com/deeplink?id=gX56itLGvIE&amp;mid=42440&amp;u1=sp&amp;murl=https%3A%2F%2Fwww.quickstart.com%2Fjavascript-basics-web-development-building-blocks.html"
            >
              Learn to program your own web game.
            </a>
            <img
              alt="icon"
              width="1"
              height="1"
              src="https://ad.linksynergy.com/fs-bin/show?id=gX56itLGvIE&amp;bids=579862.1&amp;type=10"
            />
          </li>
        </ul>
        <a title="Contact" href="https://esstudio.site/contact/">
          Contact Me
        </a>
        <div>
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/pause08" title="Pause08">
            Pause08
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{' '}
          is licensed by{' '}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
          >
            CC 3.0 BY
          </a>
        </div>
        <button onClick={this.props.onToggle}>
          <FaCompress /> Hide Panel
        </button>
      </div>
    );
  }
}

export default AboutPanel;
