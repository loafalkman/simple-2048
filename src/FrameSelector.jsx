import React, { Component } from 'react';

import GameFrame from './GameFrame';
import GameStateSwitcher from './GameStateSwitcher.jsx';
import Option from './Option.jsx';
import Win from './Win.jsx';
import Lose from './Lose.jsx';

class FrameSelector extends Component {

  render() {
    const { squares, gameState, keepGoing, newTile } = this.props;
    
    return (
      <div>
        <GameStateSwitcher gameState={ gameState } >
          <Option matchesState="win">
            <Win keepGoing={ keepGoing }>
              <GameFrame squares={ squares } gameState={ gameState } />
            </Win>
          </Option>

          <Option matchesState="lose">
            <Lose>
              <GameFrame squares={ squares } gameState={ gameState } />
            </Lose>
          </Option>

          <Option matchesState="on">
            <div className="holder">
              <GameFrame squares={ squares } gameState={ gameState } newTile={ newTile } />
            </div>
          </Option>
        </GameStateSwitcher>
      </div>
    );
  }
}

export default FrameSelector;