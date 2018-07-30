import React, { Component } from 'react';

class Win extends Component {
  render() {
    const { children, keepGoing } = this.props;

    return (
      <div className="holder">
        { children }

        <div className="end-frame">
          <span className="winner">You win!</span>
          <button className="keep-going" onClick={ keepGoing }>Keep going</button>
        </div>
      </div>
    );
  }
}

export default Win;