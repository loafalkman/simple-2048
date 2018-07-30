import React, { Component } from 'react';

class Option extends Component {
  shouldRender() {
    const { matchesState, activeState } = this.props;

    return matchesState && matchesState === activeState;
  }

  render() {
    const { children } = this.props;

    if (!this.shouldRender()) {
      return (null);
    }

    return (
      <div>
        { children }
      </div>
    );
  }
}

export default Option;