import React from 'react';
import CalcModel from './view';
import CalculatorReducer, {initialState} from './reducer';
import {actionType, actionFromCode} from './actions';


export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
  }

  updateState (code) {
    let newState = CalculatorReducer(this.state, actionFromCode(code));
    this.setState(CalculatorReducer(this.state, actionFromCode(code)));
  }

  handleClick (code) {
    if (!code) return null;
    return this.updateState(code);
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState && this.state.lastEval !== nextState.lastEval) {
      this.props.onEval(nextState.lastEval);
    }
  }

  render () {
    return <CalcModel onClick={this.handleClick}
      formula={this.state.string + (this.state.operation
                      ? ' ' + this.state.operation : '')}
      input={this.state[this.state.input] || this.state.n1}
      style={{width: this.props.width || '25%'}} />;
  }
}
