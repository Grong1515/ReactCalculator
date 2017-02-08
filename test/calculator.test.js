require('babel-polyfill');

import * as actions from  '../app/components/calculator/actions';
import CalculatorReducer from  '../app/components/calculator/reducer';
import {actionCodes as ac} from '../app/components/calculator/config';


function CalculateString(input, evaluation) {
  if (!(typeof input === 'string' || input.constructor === Array))
    throw new Error('Invalid input');
  evaluation = evaluation || Object.assign({}, CalculatorReducer());
  for (let i=0; i<input.length; i++) {
    let code;
    code = actions.actionFromCode(input[i]);
    evaluation = CalculatorReducer(evaluation, code);
  }
  return evaluation;
};


test('evaluation input', () => {
  let res = CalculateString('2');
  expect(res.n1).toEqual('2');
});

test('evaluation 2+2*2', () => {
  let res = CalculateString('2+2*2=');
  expect(res.n1).toEqual('6');
  expect(res.lastEval).toBe('2 + 2 * 2');
});

test('evaluation 425-grg-59h', () => {
  expect(CalculateString('425-grg/59h=').n1).toEqual(String(425/59));
});

test('check BS 1', () => {
  let input = [
    ac[7],
    ac.BS,
  ];
  expect(CalculateString(input).n1).toEqual('0');
});

test('check BS 2', () => {
  let input = [
    ac[7],
    ac[2],
    ac[3],
    ac.BS,
  ];
  expect(CalculateString(input).n1).toEqual('72');
});

test('check BS with NaN', () => {
  let input = [
    ac[0],
    ac.DIVISION,
    ac[0],
    ac.BS,
  ];
  expect(CalculateString(input).n1).toEqual('0');
});

test('check BS with not finit', () => {
  let state = CalculatorReducer();
  state.n1 = '2.134234234e-2';
  expect(CalculateString([ac.BS], state).n1).toEqual('0');
});

test('check input after EQ', () => {
  let input = [
    ac.DOT,
    ac[7],
    ac[5],
    ac.MUL,
    ac.EQ,
    ac[3],
    ac[3],
  ];
  expect(CalculateString(input).input).toEqual('n1');
  expect(CalculateString(input).n1).toEqual('33');
});

test('check input after operation', () => {
  let input = [
    ac.DOT,
    ac[7],
    ac[5],
    ac.MULT,
    ac[3],
    ac[3],
  ];
  expect(CalculateString(input).input).toEqual('n2');
  expect(CalculateString(input).n2).toEqual('33');
});

test('check  CE', () => {
  let input = [
    ac.DOT,
    ac[7],
    ac[5],
    ac.MULT,
    ac[3],
    ac[3],
    ac.CE,
  ];
  expect(CalculateString(input).n2).toEqual('0');
  expect(CalculateString(input).input).toEqual('n2');
});

test('check  C', () => {
  let input = [
    ac.DOT,
    ac[7],
    ac[5],
    ac.MUL,
    ac[3],
    ac[3],
    ac.C,
  ];
  expect(CalculateString(input)).toEqual(CalculatorReducer());
});

test('check  DOT', () => {
  let input = [
    ac.DOT,
    ac[7],
    ac[5],
    ac.DOT,
    ac[3],
  ];
  expect(CalculateString(input).n1).toEqual('0.753');
});

test('check  Zero 1', () => {
  expect(CalculateString('0000001').n1).toEqual('1');
});

test('check  Zero 2', () => {
  expect(CalculateString('0.000001').n1).toEqual('0.000001');
});

test('check  string 1', () => {
  expect(CalculateString('123+23').string).toEqual('123');
});

test('check  string 2', () => {
  expect(CalculateString('123').string).toEqual('');
});

test('check  string 3', () => {
  expect(CalculateString('123+23*54').string).toEqual('123 + 23');
});


test('check  lastOperation', () => {
  expect(CalculateString('123+23=').lastOperation).toEqual('+ 23');
  expect(CalculateString('123+=').lastOperation).toEqual('+ 123');
  expect(CalculateString('123+23*5').lastOperation).toEqual('+ 23');
  expect(CalculateString('123+23*5=').lastOperation).toEqual('* 5');
});
