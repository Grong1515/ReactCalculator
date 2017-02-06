import * as actions from './actions';

export const initialState = {
  n1: '',
  n2: '',
  operation: '',
  string: '',
  input: 'n1',
  lastOperation: '',
  lastEval: '',
  emptyStart: true,
};

export default function CalculatorReducer (state = initialState, action) {
  let newState;
  switch (action.type) {
    case actions.TYPE_NUMBER:
      let oldVal = state.emptyStart ? '' : state[state.input];
      let newVal = (oldVal.indexOf('.') + 1) ?
        oldVal + action.val
        : Number(oldVal + action.val).toString();
      if (!newVal) return state;
      newState = Object.assign({}, state);
      newState[state.input] = newVal;
      newState.emptyStart = false;
      return newState;
      break;
    case actions.SIGN_CHANGE:
      newState = Object.assign({}, state, {
        emptyStart: false,
      });
      newState[state.input] = String(0 - Number(newState[state.input]));
      return newState;
      break;
    case actions.TYPE_DOT:
      if (state.emptyStart) {
        newState = Object.assign({}, state, {
          emptyStart: false,
        });
        newState[state.input] = '0.';
        return newState;
      }
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
          n2: state.n1,
          operation: action.val,
          lastOperation: '',
          string: addNumberToString(state.string, state.n1),
          emptyStart: true,
        });
      } else if (state.input === 'n2') {
        if (!state.n2 || state.emptyStart) return Object.assign({}, state, {
          operation: action.val,
        });
        else {
          let newString = addNumberToString(state.string + ' ' + state.operation, state.n2);
          return Object.assign({}, state, {
            string: newString,
            operation: action.val,
            lastOperation: addNumberToString(state.operation, state.n2),
            emptyStart: true,
            n2: String(eval(newString)),
          })
        }
      }
      break;
    case actions.CALCULATE:
      // if (!state.n1 ) return state;
      if (!state.operation) return Object.assign({}, state, {
        n1: String(eval(state.n1 + state.lastOperation) || 0),
        lastEval: state.n1 + state.lastOperation,
        emptyStart: true,
      });
      let operation = addNumberToString(state.operation,
                        (state.n2 === '' ? state.n1 : state.n2));
      let result = eval(state.string + operation);
      return Object.assign({}, state, {
        n1: result.toString(),
        input: 'n1',
        n2: '',
        string: '',
        operation: '',
        lastOperation: operation,
        lastEval: state.string + operation,
        emptyStart: true,
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
      newState = Object.assign({}, state, {
        emptyStart: false,
      });
      let newNum = newState[state.input].slice(0, -1);
      newState[state.input] =
        (!newState[state.input] || !isFinite(newState[state.input]) || !isFinite(newNum)) ?
          '0'
          : newNum;
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
