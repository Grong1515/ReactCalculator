import {actionCodes} from './config';

export default function handleInput (key) {
  if (actionCodes[key] === undefined) {
    if (['.', ','].includes(key)) return actionCodes.DOT;
    else if (['Enter', '='].includes(key)) return actionCodes.EQ;
    else if (['Backspace', 'Delete'].includes(key)) return actionCodes.BS;
    else if (key == '*') return actionCodes.MULT;
    else if (key == '/') return actionCodes.DIVISION;
    else if (key == '+') return actionCodes.SUM;
    else if (key == '-') return actionCodes.SUBTR;
    return null;
  } else return actionCodes[key];
}
