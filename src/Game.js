class Game {
  constructor(max) {
    this.fourInterval = 8;
    this.counter = 0;
    this.maxValue = max;
    this.gameState = 'on';
    this.squares = [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0];
    
    this.preset();
  }

  preset() {
    this.possibleMoves = 4;
    this.nextLeft = this.movePositive(0,13,4,3,1);
    this.nextRight = this.moveNegative(15,2,4,3,1);
    this.nextUp = this.movePositive(0,4,1,12,4);
    this.nextDown = this.moveNegative(15,11,1,12,4);
    this.counter += 1;

    return this.squares;
  }

  willLose() {
    return this.possibleMoves === 0;
  }

  getSquares(code) {
    if (code === 38) { // up
      this.squares = this.nextUp.squares;
      this.gameState = this.nextUp.gameState;

      return this.nextUp;

    } else if (code === 39) { // right
      this.squares = this.nextRight.squares;
      this.gameState = this.nextRight.gameState;

      return this.nextRight;

    } else if (code === 40) { // down
      this.squares = this.nextDown.squares;
      this.gameState = this.nextDown.gameState;

      return this.nextDown;

    } else if (code === 37) { // left
      this.squares = this.nextLeft.squares;
      this.gameState = this.nextLeft.gameState;

      return this.nextLeft;
    }
      
    return { squares: this.squares, gameState: this.gameState };
  }

  movePositive(i, maxI, iPlus, maxJ, jPlus) {
    let list = this.squares.slice();
    let json = {gameState: 'on', squares: list};

    this.trimPositive(json,i, maxI, iPlus, maxJ, jPlus);
    this.mergePositive(json,i, maxI, iPlus, maxJ, jPlus);
    this.trimPositive(json, i, maxI, iPlus, maxJ, jPlus);
    this.getNewItem(json);

    return json;
  }

  moveNegative(i, iMin, iSub, jMin, jSub) {
    let list = this.squares.slice();
    let json = {gameState: 'on', squares: list};

    this.trimNegative(json, i, iMin, iSub, jMin, jSub);
    this.mergeNegative(json, i, iMin, iSub, jMin, jSub);
    this.trimNegative(json, i, iMin, iSub, jMin, jSub);
    this.getNewItem(json);

    return json;
  }

  mergePositive(json, i, maxI, iPlus, maxJ, jPlus) {
    let counter = 0;
    let added = 0;

    while (i < maxI) { // columns
      let j = i;
      let max = j + maxJ;

      while (j < max) {
        let current = json.squares[j];
        let next =  json.squares[j+jPlus];

        if (current === next) {
          added = current + next;
          this.isWinning(added, json);
          counter += added;
          json.squares[j] = added;
          json.squares[j+jPlus] = 0;
        }

        j+=jPlus;
      }

      i+=iPlus;
    }

    json.score = counter;
  }

  mergeNegative(json, i, iMin, iSub, jMin, jSub) {
    let counter = 0;
    let added = 0;

    while (i > iMin) { // columns
      let j = i;
      let max = j - jMin;

      while (j > max) {
        let current = json.squares[j];
        let next =  json.squares[j-jSub];

        if (current === next) {
          added = current + next;
          this.isWinning(added, json);

          counter += added;
          json.squares[j] = added;
          json.squares[j-jSub] = 0;
        }

        j-=jSub;
      }

      i-=iSub;
    }

    json.score = counter;

    return json;
  }

  trimPositive(json, i, iMax, iPlus, jMax, jPlus) {
      while (i < iMax) { // columns
        let modified = true;

        while (modified) {
          modified = false;

          let j = i;
          let max = j + jMax;

          while (j < max) { 
            let current = json.squares[j];
            let next =  json.squares[j+jPlus];

            if (current === 0 && next > 1) {
              json.squares[j] = next;
              json.squares[j+jPlus] = 0;
              modified = true;
            }

            j+=jPlus;
          }
      }

      i += iPlus;
    }
  }

  trimNegative(json, i, iMin, iSub, jMin, jSub) {
      while (i > iMin) { // columns
        let modified = true;

        while (modified) {
          modified = false;

          let j = i;
          let min = j - jMin;

          while (j > min) { 
            let current = json.squares[j];
            let next =  json.squares[j-jSub];

            if (current === 0 && next > 1) {
              json.squares[j] = next; // 4
              json.squares[j-jSub] = 0;
              modified = true;
            }

            j-=jSub;
          }
      }

      i-=iSub; // 1
    }
  }

  getNewItem(json) {
    let freeIndexes = this.getFreeIndexes(json.squares);

    if (freeIndexes.length === 0) {
      this.possibleMoves -= 1;
    } else {
      let index = this.randomIndex(freeIndexes);
      var newTile = 2;

      if (this.counter >= this.fourInterval) {
        this.counter = 0;
        newTile = 4;
      }
      json.newIndex = index;
      json.squares[index] = newTile;
    }
  }

  getFreeIndexes(squares) {
    let indexes = [];

    squares.map(
      function(number, index) {
        if (number === 0) {
          indexes.push(index);
        }
      }
    )

    return indexes;
  }

  randomIndex(freeIndexes) {
    let random1 = Math.floor(Math.random()*freeIndexes.length);
    let index = freeIndexes[random1];
    freeIndexes.splice(random1, 1);
    return index;
  }

  isWinning(added, json) {
    if (added === this.maxValue) {
      json.gameState = 'win';
    }
  }
}

module.exports = Game;