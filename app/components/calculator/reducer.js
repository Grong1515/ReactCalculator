import * as actions from './actions';

export const initialState = {
  n1: '',
  n2: '',
  operation: '',
  string: '',
  input: 'n1',
  lastOperation: '',
};

export default function CalculatorReducer (state = initialState, action) {
  let newState;
  switch (action.type) {
    case actions.TYPE_NUMBER:
      let newVal = (state[state.input].indexOf('.') + 1) ?
        state[state.input] + action.val
        : Number(state[state.input] + action.val).toString();
      if (!newVal) return state;
      newState = Object.assign({}, state);
      newState[state.input] = newVal;
      return newState;
      break;
    case actions.SIGN_CHANGE:
      newState = Object.assign({}, state);
      newState[state.input] = String(0 - Number(newState[state.input]));
      return newState;
      break;
    case actions.TYPE_DOT:
      if ((state[state.input].indexOf('.') + 1)) return state;
      newState = Object.assign({}, state);
      newState[state.input] =
        ((newState[state.input] && isFinite(newState[state.input])) ? newState[state.input] : '0') + '.';
      return newState;
      break;
    case actions.TYPE_OPERATION:
      if (state.input === 'n1') {
        return Object.assign({}, state, {
          input: 'n2',
          operation: action.val,
          lastOperation: '',
          string: addNumberToString(state.string, state.n1),
        });
      } else if (state.input === 'n2') {
        if (!state.n2) return Object.assign({}, state, {
          operation: action.val,
        });
        else {
          return Object.assign({}, state, {
            string: addNumberToString(state.string + ' ' + state.operation, state.n2),
            operation: action.val,
            n2: '',
          })
        }
      }
      break;
    case actions.CALCULATE:
      if (!state.operation) return Object.assign({}, state, {
        n1: eval(state.n1 + state.lastOperation).toString(),
      });
      let operation = state.operation
                        + (state.n2 === '' ? state.n1 : state.n2);
      let result = eval(state.string + operation);
      return Object.assign({}, state, {
        n1: result.toString(),
        input: 'n1',
        n2: '',
        string: '',
        operation: '',
        lastOperation: operation,
      });
      break;
    case actions.TYPE_C:
      return initialState;
      break;
    case actions.TYPE_CE:
      newState = Object.assign({}, state);
      newState[state.input] = '0';
      return newState;
      break;
    case actions.TYPE_BS:
      newState = Object.assign({}, state);
      newState[state.input] =
        (!newState[state.input] || !isFinite(newState[state.input])) ?
          '0'
          : newState[state.input].slice(0, -1);
      return newState;
      break;
    default:
      return state;
  }
};

function addNumberToString(string, numberStr) {
  return (string !== '' ? string + ' ': '') + ((numberStr.indexOf('-') + 1) ?
    '(' + numberStr + ')' : numberStr);
};
