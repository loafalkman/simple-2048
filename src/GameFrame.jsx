import React, { Component } from 'react';

import Square from './Square.jsx';
import './frame.css';

class GameFrame extends Component {
  render() {
    const { squares, gameState, newTile } = this.props;

    return (
      <div className="game-frame" blur={ gameState }>
        <div className="grid-container">
           {
              squares.map(
                function(number, index) {
                  let delay = "false";
                  let square = squares[index];
                  if (index === newTile) {
                    delay = "true";
                  }

                  return (
                    <div className="grid-item" key={ index }  >
                      <Square number={ square } delay={ delay }  />
                    </div>
                  );
                }
              )
            }
        </div>
      </div>
    );
  }
}

export default GameFrame;