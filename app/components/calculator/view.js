import React from 'react';
import {actionCodes} from './config.js';

function Cell (props) {
  return <div className={"calc cell " + props.className}
     onClick={props.onClick}
     data-code={props.code}>{props.text}</div>;
}

function Row (props) {
  return <div><div className="calc row">{props.children}</div></div>;
}

function Container (props) {
  return (
    <div className="calc container">
      {props.children}
    </div>
  )
}

function Outputs (props) {
  return (
    <Container>
      <div>
        <input type="hidden" id="calcInput" onChange={props.handleTyping}/>
      </div>
      <Row>
        <Cell
          className="formula"
          text={props.formula} />
      </Row>
      <Row>
        <Cell
          className="input"
          text={props.input || '0'} />
      </Row>
    </Container>
  );
}

function CalcButton (props) {

  return <Cell
    className='button'
    text={props.text}
    code={props.code || null}
    onClick={props.onClick || null} />;
}

function CalcButtonRow (props) {
  var row = props.buttons.map((b, i) => {
    function onClick () {
      props.onClick(b.code)
    }
    return <CalcButton text={b.text}
      code={b.code} onClick={onClick}
      key={props.row + i} />;
  });
  return <Row>{row}</Row>;
}

function Buttons (props) {

  const buttonsList = [
    [
      {text: 'CE', code: actionCodes.CE},
      {text: 'C', code: actionCodes.C},
      {text: '<-', code: actionCodes.BS},
      {text: '/', code: actionCodes.DIVISION},
    ],
    [
      {text: 7, code: actionCodes[7]},
      {text: 8, code: actionCodes[8]},
      {text: 9, code: actionCodes[9]},
      {text: '*', code: actionCodes.MULT},
    ],
    [
      {text: 4, code: actionCodes[4]},
      {text: 5, code: actionCodes[5]},
      {text: 6, code: actionCodes[6]},
      {text: '-', code: actionCodes.SUBTR},
    ],
    [
      {text: 1, code: actionCodes[1]},
      {text: 2, code: actionCodes[2]},
      {text: 3, code: actionCodes[3]},
      {text: '+', code: actionCodes.SUM},
    ],
    [
      {text: '+/-', code: actionCodes.SGN_CH},
      {text: 0, code: actionCodes[0]},
      {text: '.', code: actionCodes.DOT},
      {text: '=', code: actionCodes.EQ},
    ],
  ];
  return (
    <Container>
      {buttonsList.map((el, i) => (<CalcButtonRow buttons={el}
       key={'btn_row_' + i} row={'btn_' + i + '_'}
       onClick={props.onClick} />)) }
    </Container>
  );
}

function CalcModel(props) {
  return (
    <div className="calc calculator" style={props.style}>
      <Outputs
        formula={props.formula}
        input={props.input} />
      <Buttons onClick={props.onClick}/>
    </div>
  );
}

export default CalcModel;
