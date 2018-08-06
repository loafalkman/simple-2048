import React, { Component } from 'react';
import Game from './Game.js';
import FrameSelector from './FrameSelector.jsx';
import './App.css';

class App extends Component {
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  constructor(props) {
    super(props);

    this.keepGoing = this.keepGoing.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.restartGame = this.restartGame.bind(this);

    document.addEventListener("keydown", this.onKeyPressed);

    let newGame = new Game(2048);
    let json = newGame.getSquares();

    this.state = { 
      newTile: 'false',
      squares: json.squares, 
      score: 0, 
      gameState: json.gameState, 
      buttonClick: this.keepGoing,
      game: newGame,
    };
  }

  keepGoing() {
    this.setState({
      gameState: 'on',
      maxValue: this.state.maxValue * 2
    });

    document.addEventListener("keydown", this.onKeyPressed);
  }

  restartGame() {
    let newGame = new Game(2048);
    let json = newGame.getSquares(0);

    this.setState({ 
      squares: json.squares, 
      score: 0, 
      gameState: json.gameState, 
      game: newGame,
    });

    document.addEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed(e) {
    let code = e.keyCode;

    if (code === 37 || code === 38 || code === 39 || code === 40) {
      let game = this.state.game;
      e.preventDefault();
      let json = game.getSquares(code);

      this.setState({
        newTile: json.newIndex,
        squares: json.squares,
        score: this.state.score + json.score,
        gameState: json.gameState,
      });

      game.preset();
      if (game.willLose()) {
        this.setState({gameState: 'lose'});
        document.removeEventListener("keydown", this.onKeyPressed);

      } else if (json.gameState === 'win') {
        document.removeEventListener("keydown", this.onKeyPressed);
      }
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>2048</h1>
          <div className="board">
            <div className="score">
              <span id="caption">SCORE</span>
              <span id="content">{ this.state.score }</span>
            </div>
            <button onClick={ this.restartGame }>
              New Game
            </button>
          </div>
        </div>
        <FrameSelector 
          squares={ this.state.squares } 
          onKeyDown={ this.onKeyPressed }
          gameState={ this.state.gameState } 
          keepGoing={ this.state.buttonClick }
          newTile={ this.state.newTile } 
        />
        <div className="instructions">
          <span><p className="fat">HOW TO PLAY:</p> Use your <p className="fat">arrow keys</p> to move the tiles. When two tiles with the same number touch, they <p className="fat">merge into one!</p></span>
        </div>
      </div>
    );
  }
}

export default App;
