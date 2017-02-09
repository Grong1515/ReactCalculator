import React from 'react';
import {actionCodes, buttonsList} from './config.js';

export function Cell (props) {
  return <div className={"calc cell " + props.className}
     onClick={props.onClick}
     data-code={props.code}>{props.text}</div>;
}

export function Row (props) {
  return <div><div className="calc row">{props.children}</div></div>;
}

export function Container (props) {
  return (
    <div className="calc container">
      {props.children}
    </div>
  )
}

export function Outputs (props) {
  return (
    <Container>
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

export function CalcButton (props) {

  return <Cell
    className={'button ' + props.className }
    text={props.text}
    code={props.code || null}
    onClick={props.onClick || null} />;
}

export function CalcButtonRow (props) {
  var row = props.buttons.map((b, i) => {
    function onClick () {
      props.onClick(b.code)
    }
    return <CalcButton text={b.text}
      className={b.class}
      code={b.code} onClick={onClick}
      key={props.row + i} />;
  });
  return <Row>{row}</Row>;
}

export function Buttons (props) {
  return (
    <Container>
      {buttonsList.map((el, i) => (<CalcButtonRow buttons={el}
       key={'btn_row_' + i} row={'btn_' + i + '_'}
       onClick={props.onClick} />)) }
    </Container>
  );
}

export default function CalcModel(props) {
  return (
    <div className="calc calculator" style={props.style}
      tabIndex="0" onKeyDown={props.onKeyPress}>
      <Outputs
        formula={props.formula}
        input={props.input} />
      <Buttons onClick={props.onClick}/>
    </div>
  );
}
