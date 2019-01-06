import { Component } from 'preact';
import './EditorsRoot.css';
import NotFound from '../NotFound/NotFound';
import AirplaneEditor from '../../containers/AirplaneEditor/AirplaneEditor';
import SavesEditor from '../../containers/SavesEditor/SavesEditor';
import OperatorEditor from '../../containers/OperatorEditor/OperatorEditor';
import AirplaneSubmissionSuccess from '../../containers/AirplaneSubmissionSuccess/AirplaneSubmissionSuccess';
import OperatorSubmissionSuccess from '../../containers/OperatorSubmissionSuccess/OperatorSubmissionSuccess';

const getEditorRoute = editorroute =>
  ({
    'airplane-editor': <AirplaneEditor />,
    'save-editor': <SavesEditor />,
    'operator-editor': <OperatorEditor />,
    'airplane-submission-success': <AirplaneSubmissionSuccess />,
    'operator-submission-success': <OperatorSubmissionSuccess />
  }[editorroute] || <NotFound />);

class EditorsRoot extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="EditorsRoot">
        {getEditorRoute(this.props.editorroute)}
      </div>
    );
  }
}

export default EditorsRoot;
