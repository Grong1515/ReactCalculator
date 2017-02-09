import React from 'react';
import ReactRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils';
import * as view from '../app/components/calculator/view';
import Calculator from '../app/components/calculator/Calculator';

import {shallow} from 'enzyme';

import {CalculateString} from './calculator.test.js';

test('calculator snapshot', () => {
  const calc = ReactRenderer.create(
    <Calculator/>
  );
  let tree = calc.toJSON();
  expect(tree).toMatchSnapshot();
})

// test('calculator keyboard input 1', () => {
//   const CalcTestObj = shallow(<Calculator />);
//
//   CalcTestObj.simulate('keydown', {key: '2'});
//   // expect(CalcTestObj.find('.input').text()).toBe('2');
//   // CalcTestObj.simulate('keyDown', {key: '+'});
//   // CalcTestObj.simulate('keyDown', {key: '2'});
//   // CalcTestObj.simulate('keyDown', {key: '*'});
//   // CalcTestObj.simulate('keyDown', {key: '2'});
//   // CalcTestObj.simulate('keyDown', {key: 'Enter'});
//
//   expect(CalcTestObj.state()).toEqual(CalculateString('2+2*2='));
// });
