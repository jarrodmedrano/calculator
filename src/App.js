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
      count: '0',
      memCount: '0',
      flipped: false,
      operator: '',
    };

  initialState = this.state;

  operate = {
    '*': (x, y) => { return x * y },
    '+': (x, y) => { return x + y },
    '-': (x, y) => { return x - y },
    '/': (x, y) => { return x / y },
  };

  onClickHandler = (value) => {
    if(this.state.count === '0') {
      this.setState({count: value})
    } else if(this.state.flipped === false) {
      this.setState({count: this.state.count + value})
    } else {
      this.setState({memCount: value, count: this.operate[this.state.operator](parseInt(this.state.count), parseInt(value))})
    }
  };

  operatorHandler = (value) => {
      this.setState({operator: value, flipped: true});
  };

  resetHandler = () => {
    this.setState(this.initialState);
  };

  equalsHandler = () => {
    this.setState({count: this.operate[this.state.operator](parseInt(this.state.count), parseInt(this.state.memCount))})
  };

  render() {
    const buttons = ['0','1','2','3','4','5','6','7','8','9'];
    const operators = ['*','-','+','/'];
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
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
