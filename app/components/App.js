import React from 'react';
import Calculator from './calculator/Calculator';
import 'whatwg-fetch'

function AppModel() {
  return (
    <div>
      <h1>JS Calculator!</h1>
      <div>
        <Calculator width="20%" onSubmit={this.props.handleCalculation} />
      </div>
      <div>
        <ul>
          {this.props.calculations.map((elem) => <li>{JSON.stringify(elem)}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {calculations: []};
    this.handleCalculation = this.handleCalculation.bind(this);
  }

  handleCalculation(formula) {
    fetch('/calculations', {
      method: 'POST',
      body: JSON.stringify({
        calculation: formula,
        date: new Date(),
      }),
    }).then(res => {
      if (res.status === 200) {

      }
    })
  }

  componentDidMount() {
    fetch('/calculations')
      .then(res => {
        if (res.status == 200) {
          return res.data;
        } else {
          console.log(res);
        }
      })
      .then(data => {
        console.log(data);
      });
  }


  render () {
    return <AppModel
      calculations={this.state.calculations}
      handleCalculation={this.handleCalculation} />;
  }
};
