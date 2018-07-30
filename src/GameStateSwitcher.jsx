import React, { Component } from 'react';

class GameStateSwitcher extends Component {
  render() {
    const { children, gameState } = this.props;

    const childrenWithProps = React.Children.map(
      children,
      function (child) {
        return React.cloneElement(child, { activeState: gameState });
      }
    );

    return (
      <div>
        { childrenWithProps }
      </div>
    );
  }
}

export default GameStateSwitcher;