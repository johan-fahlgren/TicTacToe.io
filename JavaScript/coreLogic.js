// TODO - (done) - GÖR OM TILL EN `updateScore()` metod.

/**
 * @file Tic-Tac-Toe Game logic
 * @author Johan Fahlgren
 */

/**
 * @class
 * @classdesc Main game logic
 */

export class coreLogic {
  /**
   * Constructor takes playerOne and playerTwo names.
   * @param {string} playerOneString - sets playerOne variable.
   * @param {string} playerTwoString - sets playerTwo variable.
   */
  constructor(playerOneString, playerTwoString) {
    this.playerOne = playerOneString;
    this.playerTwo = playerTwoString;
    this.scoreOne = 0;
    this.scoreTwo = 0;
    this.playerTurn;
    this.currentPlayer;

    //Nested array with winning patterns.

    this.win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  /**
   * Method used to switches between players every turn if there is no win
   * or draw.
   * @returns {string} playerOne || PlayerTwo.
   */
  getNextPlayer() {
    this.playerTurn = !this.playerTurn;
    this.currentPlayer = this.playerTurn ? this.playerOne : this.playerTwo;

    return this.currentPlayer;
  }

  /**
   * Method updates score for currentplayer and saves it to localstorage.
   * @param {object} currentPlayer - playerOne or playerTwo.
   * @returns {number|number} scoreOne || scoreTwo - current score as number.
   */
  updateScore(currentPlayer) {
    if (currentPlayer == this.playerOne) {
      this.scoreOne++;
      localStorage.setItem("playerOneScore", this.scoreOne);
      return this.scoreOne;
    } else {
      this.scoreTwo++;
      localStorage.setItem("playerTwoScore", this.scoreTwo);
      return this.scoreTwo;
    }
  }

  /**
   * Method checks if current player has won or not.
   * @param {Array.<?string>} playerCells - An array of strings containing
   * playernames or nulls based of current board state.
   * @returns {boolean} - Returns true if win, else false.
   */
  checkWin(playerCells) {
    for (let combination of this.win) {
      let sum = 0;
      for (let index of combination) {
        if (playerCells[index] === this.currentPlayer) {
          sum++;
        }
      }
      if (sum === 3) {
        return true;
      }
    }
    return false;
  }

  /**
   * Method checks if current round is a draw or not.
   * @param {Array.<?string>} playerCells - An array of strings containing
   * playernames or nulls based of current board state.
   * @returns {boolean} - Returns true if draw, else false.
   */
  isDraw(playerCells) {
    if (playerCells.includes(null)) {
      return false;
    } else {
      return true;
    }
  }
}
