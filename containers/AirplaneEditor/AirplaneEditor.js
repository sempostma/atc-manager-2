import { Component } from 'preact';
import './AirplaneEditor.css';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa/index.esm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import { saveState, loadState } from '../../lib/persistance';
import {
  airplanesById,
  airplanes,
  refresh,
  defaultAirplanes
} from '../../lib/airplane-library/airplane-library';
import SchemaForm from 'react-jsonschema-form';
import {
  sendMessageInfo,
  sendMessageError,
  sendMessageWarning
} from '../../components/GameMessages/GameMessages';
import { clone } from 'jsondiffpatch';
import airplaneSchema from '../../schema/airplane-model';

class AirplaneEditor extends Component {
  constructor(props) {
    super();

    refresh();

    this.state = {
      json: '',
      plane: null,
      planesSet: Object.assign(
        {},
        ...(loadState().customAirplanes || []).map(x => ({ [x.id]: x }))
      ),
      debouncing: false,
      rawJSON: false
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleInputChanged = e => {
    const id = e.target.value;
    const plane = airplanesById[id];

    this.setState({
      plane,
      json: plane !== null ? JSON.stringify(plane, null, 4) : ''
    });
  };

  handleJsonTextareaInput = e => {
    const json = e.target.value;
    this.setState({
      debouncing: true,
      json
    });
    this.parseTextareaJsonDebounced(json);
  };

  parseTextareaJsonDebounced = debounce(json => {
    this.setState({ debouncing: false });
    try {
      const obj = JSON.parse(json);
      this.setState(prevstate => {
        prevstate.warningMessage = null;
        prevstate.infoMessage = null;
        prevstate.plane = obj;
        return prevstate;
      });
    } catch (err) {
      this.setState({
        warningMessage: err.message,
        infoMessage: null,
        plane: null
      });
    }
  }, 500);

  handleSaveClick = e => {
    if (this.state.plane === null)
      return sendMessageError('Please submit a valid save file');
    const planesSet = this.state.planesSet;
    planesSet[this.state.plane.id] = this.state.plane;
    let gamePersistance = loadState();
    gamePersistance.customAirplanes = Object.values(planesSet);
    saveState(gamePersistance);

    refresh();

    this.setState({
      planesSet
    });
    sendMessageInfo('Saved file to local storage');
  };

  handleCopy = () => {
    this.setState({
      infoMessage: 'Savefile copied to clipboard.'
    });
  };

  handleSaveFileClick = () => {
    saveAs(
      new Blob([this.state.json], {
        type: 'application/json'
      }),
      `Savefile ${this.state.plane.name.trim()}.json`
    );
  };

  readFromFile = e => {
    var reader = new FileReader();
    const _this = this;
    reader.onload = function() {
      e.target.value = '';
      _this.setState(
        {
          json: reader.result
        },
        () => _this.parseTextareaJsonDebounced(reader.result)
      );
    };
    reader.readAsText(e.target.files[0]);
  };

  handleRawJSONSwitchInput = e => {
    this.setState({
      rawJSON: e.target.checked
    });
  };

  handleEditingObjectChange = e => {
    this.setState(prevstate => {
      prevstate.plane = e.formData;
      prevstate.planesSet[prevstate.plane.id] = e.formData;
      return prevstate;
    });
  };

  handleNewPlaneClick = e => {
    const newId = Math.max(...airplanes.map(x => x.id)) + 1;
    const plane = clone(airplanes[0]);
    plane.id = newId;
    this.setState(prevstate => {
      prevstate.plane = plane;
      prevstate.planesSet[plane.id] = plane;
      return prevstate;
    });
  };

  handlePlaneDeleteClick = e => {
    if (this.state.plane === null)
      return sendMessageWarning('No plane is selected');
    const planesSet = this.state.planesSet;
    delete planesSet[this.state.plane.id];
    let gamePersistance = loadState();
    gamePersistance.customAirplanes = Object.values(planesSet);
    saveState(gamePersistance);

    refresh();

    this.setState({
      planesSet,
      plane: null
    });
    sendMessageInfo('Saved file to local storage');
  };

  render() {
    const url =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://esstudio.site/atc-manager-2';

    return (
      <div className="AirplaneEditor">
        <div className="panel">
          <h1>Airplane Editor</h1>

          <select onInput={this.handleInputChanged}>
            <option value="">Choose Airplane:</option>
            {Object.keys(airplanesById).map((id, i) => (
              <option
                key={i}
                value={id}
                selected={eq(airplanesById[id], this.state.plane)}
              >
                {airplanesById[id].name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button onClick={this.handleNewPlaneClick}>New</button>
          {this.state.plane ? (
            <button onClick={this.handlePlaneDeleteClick}>
              {defaultAirplanes.map(x => x.id).includes(this.state.plane.id)
                ? 'Reset'
                : 'Remove'}
            </button>
          ) : null}
          <br />
          <br />
          <textarea
            onInput={this.handleJsonTextareaInput}
            className={`edit-save-box line-nums ${this.state.rawJSON ||
              'hidden'}`}
            value={this.state.json}
          />
          <SchemaForm
            formData={this.state.plane}
            onChange={this.handleEditingObjectChange}
            schema={airplaneSchema}
            className={`edit-save-box ${this.state.rawJSON && 'hidden'}`}
          />
          <span>Raw JSON</span>
          <label class="switch">
            <input
              type="checkbox"
              onInput={this.handleRawJSONSwitchInput}
              checked={this.state.rawJSON}
            />
            <span class="slider" />
          </label>
          <div className="warning-message">
            {this.state.warningMessage}&nbsp;
          </div>
          <div className="info-message">{this.state.infoMessage}&nbsp;</div>
          <button
            onClick={this.handleSaveFileClick}
            disabled={this.state.debouncing || this.state.json === ''}
          >
            Save to File
          </button>
          <input
            onChange={this.readFromFile}
            id="saveseditor"
            className="inputfile"
            type="file"
            accept=".json"
            disabled={!this.state.plane || this.state.plane.name === ''}
          />
          <label for="saveseditor">Open File</label>
          <CopyToClipboard text={this.state.json} onCopy={this.handleCopy}>
            <button disabled={this.state.debouncing || this.state.json === ''}>
              Copy to Clipboard
            </button>
          </CopyToClipboard>
          <button
            disabled={this.state.debouncing || this.state.plane === null}
            onClick={this.handleSaveClick}
          >
            {this.state.debouncing ? (
              <FaSpinner className="spinner" />
            ) : (
              <FaPaperPlane />
            )}{' '}
            Save
          </button>
        </div>
        <div className="panel">
          <h4 style="margin-bottom: 5px;">Submit for approval</h4>
          <small style="display: block; margin-bottom: 20px;">
            Submit currently selected airplane for approval.
          </small>

          <form
            action="https://getsimpleform.com/messages?form_api_token=edde415b219f71f64840e6a3dbd3ff7d"
            style="margin-bottom: 0;"
            method="post"
            redirect={url + '/#/editor/airplane-submission-success'}
          >
            <div>Email*</div>
            <input type="email" name="email" required />
            <input name="content_type" type="hidden" value="plane" />
            <input
              name="content"
              type="hidden"
              value={
                this.state.plane && JSON.stringify(this.state.plane, null, 4)
              }
            />
            <br />
            <br />
            <div>Sources*</div>
            <small>
              Links or text pointing to sources you have used to create or edit
              an airplane so we can verify the data.
            </small>
            <textarea name="message" required minLength="20" />
            <br />
            <br />
            <button
              disabled={this.state.debouncing || this.state.plane === null}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AirplaneEditor;

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const eq = (p1, p2) => p1 && p2 && p1.id === p2.id;
