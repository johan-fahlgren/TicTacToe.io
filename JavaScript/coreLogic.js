export class coreLogic {
  constructor() {
    let playerOne;
    let playerTwo;
    let scoreOne;
    let scoreTwo;
    let playerTurn;
    let currentPlayer;

    /** Winning patterns. */
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
   * getNextPlayer
   * Method used to switches between players every turn if there is no win or draw.
   * returns currentPlayer.
   * @param {boolean} playerTurn - boolean variable used to switch between players
   * @param {string} currentPlayer - contains playerOne or playerTwo variable.
   */
  getNextPlayer() {
    this.playerTurn = !this.playerTurn;
    this.currentPlayer = this.playerTurn ? this.playerOne : this.playerTwo;
    return this.currentPlayer;
  }

  /**
   * UpdateScoreOne
   * Method looks at scoreOne and updates the score with a ++ (or +=1).
   * @param {int} scoreOne - contains current score variable.
   */
  updateScoreOne() {
    this.scoreOne++;
  }

  /**
   * UpdateScoreTwo
   * Method looks at scoreTwo and updates the score with a ++ (or +=1).
   * @param {int} scoreTwo - contains current score variable.
   */
  updateScoreTwo() {
    this.scoreTwo++;
  }
}
