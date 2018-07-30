import React, { Component } from 'react';
import './square.css';

class Square extends Component {
  render() {
    const { number, delay } = this.props;
    const squareID = "square-" + number;

      return (
        <div id={ squareID } delay={ delay } >
          <span>
            { number }
          </span>
        </div>
      );
  }
}

export default Square;