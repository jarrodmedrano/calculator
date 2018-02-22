import React, { Component } from 'react';
import './App.css';

class Button extends Component {

  render () {
    const {value, onClick} = this.props;

    return (
      <button onClick={() => onClick(value)}>{value}</button>
    )
  }
};

class App extends Component {
  state = {
      currentCount: '0',
      pastCount: '0',
      flipped: false,
      operator: ''
    };

  initialState = this.state;

  operate = {
    '*': (x, y) => { return x * y },
    '+': (x, y) => { return x + y },
    '-': (x, y) => { return x - y },
    '/': (x, y) => { return x / y },
  };

  onClickHandler = (value) => {
    if(this.state.currentCount === '0') {
      //set the current count to the number you pressed
      this.setState({currentCount: value})
    } else if(this.state.flipped === false) {
      //if no operator was pressed keep adding numbers to the end of the string
      this.setState({currentCount: this.state.currentCount + value})
    } else {
      //calculate the new count using whatever operator was pressed
      let newCount =
        this.operate[this.state.operator](parseInt(this.state.currentCount),
        parseInt(value));

      this.setState({pastCount: value, currentCount: newCount})
    }
  };

  operatorHandler = (value) => {
    //set the operator to whatever operator was pressed
    this.setState({operator: value, flipped: true});
  };

  resetHandler = () => {
    this.setState(this.initialState);
  };

  equalsHandler = () => {
    if(this.state.operator && this.state.currentCount !== '0') {
      let newCount = this.operate[this.state.operator](parseInt(this.state.currentCount), parseInt(this.state.pastCount));
      this.setState({currentCount: newCount})
    }
  };

  render() {
    const buttons = ['0','1','2','3','4','5','6','7','8','9'];
    const operators = ['*','-','+','/'];
    return (
      <div className="App">
        <h1>{this.state.currentCount}</h1>
        {
          buttons.map((item, id) => {
            return <Button key={id} onClick={this.onClickHandler} value={item} />
          })
        }
        {
          operators.map((item, id) => {
            return <Button key={id} onClick={this.operatorHandler} value={item} />
          })
        }
        <Button value="=" onClick={this.equalsHandler} />
        <Button value="AC" onClick={this.resetHandler} />
      </div>
    );
  }
}

export default App;
