import React from 'react';
import Calculator from './calculator/Calculator';
import MainReducer, {mainInitState} from './reducer';
import * as actions from './actions';
import 'whatwg-fetch'

function AppModel(props) {
  let output;
  if (props.calculations.data.length) {output =
    props.calculations.data.map((elem, i) => <li key={i}>{JSON.stringify(elem)}</li>)
  } else {output = <li>Data is not recieved.</li>;}
  return (
    <div>
      <div style={{display: 'inline-block'}}>
        <h1>JS Calculator!</h1>
        <Calculator width="20%" onEval={props.handleCalculation} />
      </div>
      <div style={{display: 'inline-block'}}>
        <ul>
          {output}
        </ul>
      </div>
    </div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = mainInitState;
    this.handleCalculation = this.handleCalculation.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleCalculation(formula) {
    this.setState(MainReducer(this.state, actions.makeAction(actions.FETCH_EVAL)));
    fetch('/calculations', {
      method: 'POST',
      body: JSON.stringify({
        calculation: formula.replace(/ /g, ''),
        date: new Date(),
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res.status == 200) {
        this.setState(MainReducer(this.state, actions.makeAction(actions.FETCH_EVAL_SUCC)));
        this.setState(MainReducer(this.state, actions.makeAction(actions.REQ_CALCULATIONS)));
      } else {
        this.setState(MainReducer(this.state, actions.makeAction(actions.FETCH_EVAL_FAIL)));
      }
    })
  }

  componentDidMount() {
    this.setState(MainReducer(this.state, actions.makeAction(actions.REQ_CALCULATIONS)));
  }

  componentWillUpdate(nextProps, nextState) {

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    function parseJSON(response) {
      return response.json()
    }
    if (nextState.calculations.req) {
      fetch('/calculations')
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
          this.setState(MainReducer(this.state, actions.makeAction(actions.REQ_CALCULATIONS_SUCC, data )));
        }.bind(this)).catch(function(error) {
          console.log('request failed');
          this.setState(MainReducer(this.state, actions.makeAction(actions.REQ_CALCULATIONS_FAIL)));
        }.bind(this));
    }
  }


  render () {
    return <AppModel
      calculations={this.state.calculations}
      handleCalculation={this.handleCalculation} />;
  }
};
