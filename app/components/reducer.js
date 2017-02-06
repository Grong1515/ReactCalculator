import * as actions from './actions';

export const mainInitState = {
  calculations: {
    data: [],
    req: false,
    fail: false,
  },
  evals: {
    data: '',
    req: false,
    fail: false,
  },
}

export default function MainReducer(state = mainInitState, action) {
  let res = Object.assign({}, state, {
    calculations: Calculations(state.calculations, action),
    evals: Evals(state.evals, action),
  });
  return res;
}

function Calculations (state = mainInitState.calculations, action) {
  switch (action.type) {
    case actions.REQ_CALCULATIONS:
      return Object.assign({}, state, {
        req: true,
      });
      break;
    case actions.REQ_CALCULATIONS_SUCC:
      return Object.assign({}, state, {
        req: false,
        data: action.data,
      });
      break;
    case actions.REQ_CALCULATIONS_FAIL:
      return Object.assign({}, state, {
        req: false,
        data: [],
        fail: true,
      });
      break;
    default:
      return state;
  }
}

function Evals (state = mainInitState.evals, action) {
  switch (action.type) {
    case actions.FETCH_EVAL:
      return Object.assign({}, state, {
        data: action.data,
        req: true,
        fail: false,
      });
      break;
    case actions.FETCH_EVAL_SUCC:
      return Object.assign({}, mainInitState.evals);
      break;
    case actions.FETCH_EVAL_FAIL:
      return Object.assign({}, state, {
        fail: true,
        req: false,
      });
      break;
    default:
      return state;
      break;
  }
}
