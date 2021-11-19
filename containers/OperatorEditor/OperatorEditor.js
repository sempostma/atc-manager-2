import { Component } from 'preact';
import './OperatorEditor.css';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa/index.esm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import { saveState, loadState } from '../../lib/persistance';
import {
  refresh,
  operatorsById,
  defaultOperators,
  operators
} from '../../lib/airplane-library/airplane-library';
import SchemaForm from 'react-jsonschema-form';
import {
  sendMessageError,
  sendMessageInfo,
  sendMessageWarning
} from '../../components/GameMessages/GameMessages';
import { debounce } from '../../lib/util';
import { clone } from 'jsondiffpatch';
import operatorSchema from '../../schema/operator';

class OperatorEditor extends Component {
  constructor(props) {
    super();

    refresh();

    this.state = {
      json: '',
      plane: null,
      operatorsSet: Object.assign(
        {},
        ...(loadState().customOperators || []).map(x => ({ [x.id]: x }))
      ),
      debouncing: false,
      rawJSON: false
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleInputChanged = e => {
    const id = e.target.value;
    const operator = operatorsById[id];

    this.setState({
      operator,
      json: operator !== null ? JSON.stringify(operator, null, 4) : ''
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
        (prevstate.infoMessage = null), (prevstate.operator = obj);
        return prevstate;
      });
    } catch (err) {
      this.setState({
        warningMessage: err.message,
        infoMessage: null,
        operator: null
      });
    }
  }, 500);

  handleSaveClick = e => {
    if (this.state.operator === null)
      return sendMessageError('Please submit a valid save file');
    const operatorsSet = this.state.operatorsSet;
    operatorsSet[this.state.operator.id] = this.state.plane;
    let gamePersistance = loadState();
    gamePersistance.customOperators = Object.values(operatorsSet);
    saveState(gamePersistance);

    refresh();

    this.setState({
      operatorsSet
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
      `Savefile ${this.state.operator.name.trim()}.json`
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
      prevstate.operator = e.formData;
      prevstate.operatorsSet[prevstate.operator.id] = e.formData;
      return prevstate;
    });
  };

  handleNewOperatorClick = e => {
    const newId = Math.max(...operators.map(x => x.id)) + 1;
    const operator = clone(operators[0]);
    operator.id = newId;
    this.setState(prevstate => {
      prevstate.operator = operator;
      prevstate.operatorsSet[operator.id] = operator;
      return prevstate;
    });
  };

  handleOperatorDeleteClick = e => {
    if (this.state.operator === null)
      return sendMessageWarning('No operator is selected');
    const operatorsSet = this.state.operatorsSet;
    delete operatorsSet[this.state.operator.id];
    let gamePersistance = loadState();
    gamePersistance.customOperators = Object.values(operatorsSet);
    saveState(gamePersistance);

    refresh();

    this.setState({
      operatorsSet,
      operator: null
    });
    sendMessageInfo('Saved file to local storage');
  };

  render() {
    const url =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://esstudio.site/atc-manager-2';

    return (
      <div className="OperatorEditor">
        <div className="panel">
          <h1>Operator Editor</h1>

          <select onInput={this.handleInputChanged}>
            <option value="">Choose Operator:</option>
            {Object.keys(operatorsById).map((id, i) => (
              <option
                key={i}
                value={id}
                selected={eq(operatorsById[id], this.state.operator)}
              >
                {operatorsById[id].name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button onClick={this.handleNewOperatorClick}>New</button>
          {this.state.operator ? (
            <button onClick={this.handleOperatorDeleteClick}>
              {defaultOperators.map(x => x.id).includes(this.state.operator.id)
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
            formData={this.state.operator}
            onChange={this.handleEditingObjectChange}
            schema={operatorSchema}
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
            disabled={!this.state.operator || this.state.operator.name === ''}
          />
          <label for="saveseditor">Open File</label>
          <CopyToClipboard text={this.state.json} onCopy={this.handleCopy}>
            <button disabled={this.state.debouncing || this.state.json === ''}>
              Copy to Clipboard
            </button>
          </CopyToClipboard>
          <button
            disabled={this.state.debouncing || this.state.operator === null}
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
            Submit currently selected operator for approval.
          </small>

          <form
            action="https://getsimpleform.com/messages?form_api_token=edde415b219f71f64840e6a3dbd3ff7d"
            style="margin-bottom: 0;"
            method="post"
            redirect={url + '/#/editor/operator-submission-success'}
          >
            <div>Email*</div>
            <input type="email" name="email" required />
            <input name="content_type" type="hidden" value="operator" />
            <input
              name="content"
              type="hidden"
              value={
                this.state.operator &&
                JSON.stringify(this.state.operator, null, 4)
              }
            />
            <br />
            <br />
            <div>Sources*</div>
            <small>
              Links or text pointing to sources you have used to create or edit
              an operator so we can verify the data.
            </small>
            <textarea name="message" required minLength="20" />
            <br />
            <br />
            <button
              disabled={this.state.debouncing || this.state.operator === null}
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

export default OperatorEditor;

const eq = (p1, p2) => p1 && p2 && p1.id === p2.id;
