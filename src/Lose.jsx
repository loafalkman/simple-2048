import React, { Component } from 'react';

class Lose extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="holder">
        { children }

        <div className="end-frame">
          <span className="winner">You loose!</span>
        </div> 
      </div>
    );
  }
}

export default Lose;