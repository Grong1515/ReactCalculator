import {actionCodes} from './config';

export const TYPE_NUMBER = 'TYPE_NUMBER';
export const SIGN_CHANGE = 'SGN_CH';
export const TYPE_DOT = 'DOT';
export const TYPE_OPERATION = 'TYPE_OPERATION';
export const CALCULATE = 'CALCULATE';
export const TYPE_C = 'TYPE_C';
export const TYPE_CE = 'TYPE_CE';
export const TYPE_BS = 'BACKSPACE';

export function actionType(type, val) {
  return {
    type,
    val,
  };
}

export function actionFromCode(code) {
  if ([...numberCodes()].includes(code)) {
    return actionType(TYPE_NUMBER, code);
  } else if ([actionCodes.DIVISION, actionCodes.MULT, actionCodes.SUM, actionCodes.SUBTR].includes(code)) {
    return actionType(TYPE_OPERATION, code);
  } else if (code === actionCodes.SGN_CH) {
    return actionType(SIGN_CHANGE);
  } else if (code === actionCodes.DOT) {
    return actionType(TYPE_DOT);
  } else if (code === actionCodes.EQ) {
    return actionType(CALCULATE);
  } else if (code === actionCodes.C) {
    return actionType(TYPE_C);
  } else if (code === actionCodes.CE) {
    return actionType(TYPE_CE);
  } else if (code === actionCodes.BS) {
    return actionType(TYPE_BS);
  } else {
    return {};
  }
}

function* numberCodes() {
  for (let i=0;i<=9;i++) {
    yield String(i);
  }
}
