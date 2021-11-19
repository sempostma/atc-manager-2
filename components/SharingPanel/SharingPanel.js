import { Component } from 'preact';
import { FaLink, FaShareAlt, FaEnvelope } from 'react-icons/fa/index.esm';
import './SharingPanel.css';
import {
  sendMessageError,
  sendMessageInfo
} from '../GameMessages/GameMessages';
import CopyToClipboard from 'react-copy-to-clipboard';
import { debounce } from '../../lib/util';
import SocialButtons from '../../components/SocialButtons/SocialButtons';

class SharingPanel extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true
    };

    props.promise.then(({ title, text, url }) => {
      this.setState({
        loading: false,
        title,
        text,
        url
      });
    });
  }

  componentWillMount() {}

  componentWillUnmount() {}

  share = e => {
    navigator
      .share({
        title: this.state.title,
        text: this.state.text,
        url: this.state.url
      })
      .catch(err => {
        sendMessageError('Unable to share :(, sorry...');
      });
  };

  handleCopy = () => {
    sendMessageInfo(`Copied ${this.state.url} to cliboard`);
  };

  handleMail = () => {
    const body = encodeURIComponent(this.state.text + '\n\n' + this.state.url);
    window.open(`mailto:%20?subject=${this.state.title}&body=${body}`);
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  render() {
    const canShare =
      typeof window !== 'undefined' && window.navigator.share !== undefined;
    return (
      <div className={`sharing-panel ${this.state.loading ? 'loading' : ''}`}>
        <button onClick={this.props.onClose} class="close">
          &times;
        </button>
        {this.state.loading ? null : (
          <div class="content">
            <input
              type="text"
              spellcheck="false"
              onInput={this.handleTitleChange}
              value={this.state.title}
            />
            <br />
            <textarea spellcheck="false" onChange={this.handleTextChange}>
              {this.state.text}
            </textarea>
            <br />
            {canShare ? (
              <button class="button" onClick={this.share}>
                <FaShareAlt /> Share
              </button>
            ) : null}
            <CopyToClipboard text={this.state.url} onCopy={this.handleCopy}>
              <button title="Copy url to clipboard" class="button">
                <FaLink /> Copy Url
              </button>
            </CopyToClipboard>
            <SocialButtons
              url={this.state.url}
              text={this.state.title + '\n' + this.state.text}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SharingPanel;
