import { Component } from 'preact';
import './PushNotifications.css';
import config from '../../lib/config';
import { sendMessageError } from '../GameMessages/GameMessages';
import { logErr } from '../../lib/util';

const urlBase64ToUint8Array = base64String => {
  if (typeof window === 'undefined') return;
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const status = {
  NOT_READY: 1,
  READY: 2,
  LOADING: 3,
  ERROR: 5,
  REGISTERED: 6,
  USER_REJECTED: 7
};

class PushNotifications extends Component {
  constructor(props) {
    super();
    this.state = {
      status: status.NOT_READY,
      cb: null
    };
  }

  componentWillMount() {
    if (typeof window === 'undefined') return;
    navigator.serviceWorker.ready
      .then(registration => {
        registration.pushManager
          .getSubscription()
          .then(subscription => {
            if (subscription !== null) {
              this.setState({ status: status.REGISTERED, subscription });
              return;
            }
            this.setState({
              status: status.READY,
              cb: () => {
                this.setState({ status: status.LOADING });
                registration.pushManager
                  .subscribe({
                    userVisibleOnly: true,
                    // The `urlBase64ToUint8Array()` function is the same as in
                    // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
                    applicationServerKey: urlBase64ToUint8Array(
                      config.publicVapidKey
                    )
                  })
                  .then(subscription => {
                    fetch(config.subscriptionURL, {
                      method: 'POST',
                      body: JSON.stringify(subscription),
                      headers: {
                        'content-type': 'application/json'
                      }
                    })
                      .then(response => response.text())
                      .then(json => {
                        this.setState({
                          status: status.REGISTERED,
                          subscription
                        });
                      })
                      .catch(err => {
                        throw err;
                      });
                  })
                  .catch(err => {
                    throw err;
                  });
              }
            });
          })
          .catch(err => {
            this.setState({ status: status.ERROR });
            sendMessageError('Whoops... Something went wrong.');
            logErr(err);
          });
      })
      .catch(err => {
        console.warn('serviceWorker.ready was rejected', err);
      });
  }

  componentWillUnmount() {}

  unsubscribe = () => {
    this.state.subscription
      .unsubscribe()
      .then(succesfull => {
        this.setState({ status: status.USER_REJECTED });
      })
      .catch(err => {
        this.setState({ status: status.ERROR });
      });
  };

  isVisible() {
    switch (this.state.status) {
    case status.READY:
    case status.REGISTERED:
    case status.ERROR:
    case status.USER_REJECTED:
    case status.LOADING:
      return true;
    case status.NOT_READY:
      return false;
    }
  }

  showButtons() {
    switch (this.state.status) {
    case status.READY:
    case status.LOADING:
      return true;
    case status.ERROR:
    case status.USER_REJECTED:
    case status.REGISTERED:
    case status.NOT_READY:
      return false;
    }
  }

  render() {
    const classList = [this.isVisible() ? 'visible' : 'hidden'];
    const btnDisabled = this.state.status === status.LOADING;
    return (
      <div className="PushNotifications" style={classList.join(' ')}>
        {this.showButtons() && (
          <div>
            Do you want to receive notifications from ATC Manager 2?
            <button
              onClick={() => this.setState({ status: status.USER_REJECTED })}
              disabled={btnDisabled}
            >
              No, Leave me alone *squawks 7600*
            </button>
            <button onClick={this.state.cb} disabled={btnDisabled}>
              Yes, acknowledge handover
            </button>
          </div>
        )}
        {this.state.status === status.REGISTERED && (
          <div>
            We can read you five by five. We'll keep you up to date.
            <button onClick={this.unsubscribe}>Terminate radio contact</button>
          </div>
        )}
        {this.state.status === status.ERROR && (
          <div>Whoops, something went wrong. *squawk 7700</div>
        )}
        {this.state.status === status.USER_REJECTED && (
          <div>Radio silence.</div>
        )}
        {Object.keys(this.state.status)
          .filter(key => status[key] === this.state.status)
          .join('')}
      </div>
    );
  }
}

export default PushNotifications;
