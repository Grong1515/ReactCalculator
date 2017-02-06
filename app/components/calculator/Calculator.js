import React from 'react';
import CalcModel from './view';
import CalculatorReducer, {initialState} from './reducer';
import {actionType, actionFromCode} from './actions';
import handleInput from './inputHandler';


export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  updateState (code) {
    if (!code) return null;
    this.setState(CalculatorReducer(this.state, actionFromCode(code)));
  }

  handleClick (code) {
    return this.updateState(code);
  }

  handleKeyPress (e) {

    if (e.key == 'Escape') {
      document.activeElement.blur();
    }
    let code = handleInput(e.key);
    if (code != null) e.preventDefault();
    this.updateState(code);
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState && this.state.lastEval !== nextState.lastEval) {
      this.props.onEval(nextState.lastEval);
    }
  }

  render () {
    return <CalcModel onClick={this.handleClick}
      onKeyPress={this.handleKeyPress}
      formula={this.state.string + (this.state.operation
                      ? ' ' + this.state.operation : '')}
      input={this.state[this.state.input]}
      style={{width: this.props.width || '25%'}} />;
  }
}
