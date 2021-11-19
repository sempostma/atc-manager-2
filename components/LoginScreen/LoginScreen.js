import { Component } from "preact";
import "./LoginScreen.css";
import UIStateStore from "../../stores/UIStateStore";
import AuthenticationStore from "../../stores/AuthenticationStore";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa/index.esm";

export default class LoginScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      open: UIStateStore.isLoginScreenVisible
    };
  }

  componentWillMount() {
    UIStateStore.on("change", this.handleUIStateStoreChange);
    AuthenticationStore.on("change", this.handleAuthenticationStoreChange);
  }

  componentWillUnmount() {
    UIStateStore.removeListener("change", this.handleUIStateStoreChange);
    AuthenticationStore.removeListener("change", this.handleAuthenticationStoreChange);
  }

  handleAuthenticationStoreChange = (action) => {

  }

  handleUIStateStoreChange = (action) => {
    this.setState({
      open: UIStateStore.isLoginScreenVisible
    })
  }

  signInWithGoogle() {
    AuthenticationStore.signInWithGoogle()
  }

  render() {
    if (this.state.open === false) return null
    return (
      <div className="LoginScreen">
        <div className="backdrop">
          <div role="dialog" className="dialog">
            <h2>Sign in</h2>
            <button onClick={this.signInWithGoogle}>Sign in with Google</button>
          </div>
        </div>
      </div>
    );
  }
}
