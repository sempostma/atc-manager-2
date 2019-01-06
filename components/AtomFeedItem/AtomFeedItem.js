import { Component } from 'preact';
import './AtomFeedItem.css';
import { format } from 'timeago.js';

class AtomFeedItem extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <a target="_blank" className="AtomFeedItem" href={this.props.link}>
        <figure style={{ backgroundImage: `url(${this.props.image})` }} />
        <h6>{this.props.title}</h6>
        <small>{format(new Date(this.props.time))}</small>
        <p>
          {this.props.content}
          <br />
        </p>
      </a>
    );
  }
}

export default AtomFeedItem;
