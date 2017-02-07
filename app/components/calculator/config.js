
export const actionCodes = {
    C: 'c',
    CE: 'ce',
    BS: 'backsp',
    DIVISION: '/',
    SUM: '+',
    MULT: '*',
    SUBTR: '-',
    EQ: '=',
    DOT: '.',
    SGN_CH: 'sign_change',
    0: String(0),
    1: String(1),
    2: String(2),
    3: String(3),
    4: String(4),
    5: String(5),
    6: String(6),
    7: String(7),
    8: String(8),
    9: String(9),
  };

export const buttonsList = [
  [
    {text: 'CE', code: actionCodes.CE, class: 'utility'},
    {text: 'C', code: actionCodes.C, class: 'utility'},
    {text: '⇐', code: actionCodes.BS, class: 'utility'},
    {text: '÷', code: actionCodes.DIVISION, class: 'utility'},
  ],
  [
    {text: 7, code: actionCodes[7], class: 'bold'},
    {text: 8, code: actionCodes[8], class: 'bold'},
    {text: 9, code: actionCodes[9], class: 'bold'},
    {text: '*', code: actionCodes.MULT, class: 'utility'},
  ],
  [
    {text: 4, code: actionCodes[4], class: 'bold'},
    {text: 5, code: actionCodes[5], class: 'bold'},
    {text: 6, code: actionCodes[6], class: 'bold'},
    {text: '-', code: actionCodes.SUBTR, class: 'utility'},
  ],
  [
    {text: 1, code: actionCodes[1], class: 'bold'},
    {text: 2, code: actionCodes[2], class: 'bold'},
    {text: 3, code: actionCodes[3], class: 'bold'},
    {text: '+', code: actionCodes.SUM, class: 'utility'},
  ],
  [
    {text: '±', code: actionCodes.SGN_CH, class: 'utility'},
    {text: 0, code: actionCodes[0], class: 'bold'},
    {text: '.', code: actionCodes.DOT, class: 'bold'},
    {text: '=', code: actionCodes.EQ, class: 'utility'},
  ],
];
