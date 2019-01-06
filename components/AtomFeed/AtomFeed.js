import { Component } from 'preact';
import './AtomFeed.css';
import AtomFeedItem from '../AtomFeedItem/AtomFeedItem';

const excerpt = (str, len) =>
  str.length > len ? str.slice(0, len - 3).trim() + '...' : str;

class AtomFeed extends Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
      loaded: false
    };
  }

  componentWillMount() {
    if (typeof window === 'undefined') return;
    fetch(this.props.url)
      .then(response => response.text())
      .then(xml => new DOMParser().parseFromString(xml, 'application/xml'))
      .then(this.parseAtomDocument);
  }

  componentWillUnmount() {}

  parseAtomDocument = feed => {
    const items = Array.from(feed.getElementsByTagName('entry')).map(entry => ({
      title: entry.getElementsByTagName('title')[0].textContent,
      time: entry.getElementsByTagName('published')[0].textContent,
      content: excerpt(
        entry
          .getElementsByTagName('content')[0]
          .textContent.replace(/<(?:.|\n)*?>/gm, '')
          .replace(/[\s\r\n]+/gm, ' '),
        100
      ),
      link: entry.getElementsByTagName('link')[0].getAttribute('href'),
      id: entry.getElementsByTagName('id')[0].textContent,
      image: entry
        .getElementsByTagName('media:thumbnail')[0]
        .getAttribute('url')
    }));
    this.setState({ items, loaded: true });
  };

  render() {
    return (
      <div className="AtomFeed">
        {(!this.state.loaded && <div class="loader" />) || null}
        {this.state.items.map(item => (
          <AtomFeedItem {...item} key={item.id} />
        ))}
      </div>
    );
  }
}

export default AtomFeed;
