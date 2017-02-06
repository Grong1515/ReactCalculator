export const FETCH_EVAL = 'FETCH_EVAL';
export const FETCH_EVAL_FAIL = "FE_FAIL";
export const FETCH_EVAL_SUCC = "FE_SUCC";

export const REQ_CALCULATIONS = "RC_REQ";
export const REQ_CALCULATIONS_FAIL = "RC_FAIL";
export const REQ_CALCULATIONS_SUCC = "RC_SUCC";

export function makeAction(type, data) {
  return {type, data};
}
