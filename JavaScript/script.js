// TODO - ADD BOT FUNCTION

//Variables
const playerOne = "x";
const playerTwo = "circle";
let scoreOne = 0;
let scoreTwo = 0;
let playerTurn;

//Button Elements
const newGame_btn = document.getElementById("newGame_btn");
const restart_btn = document.getElementById("restart_btn");

//Elements
const cellElements = document.querySelectorAll("[data-index]");
const board = document.getElementById("board");
const dataWinningMessage = document.querySelector("[data-winning-message]");
const winningMessageElement = document.getElementById("winning_message");
const playerOneScore = document.querySelector(".playerOneScore");
const playerTwoScore = document.querySelector(".playerTwoScore");
const playerMessage = document.querySelector(".player_Message");

// Winning patterns
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

//Button event listeners
newGame_btn.addEventListener("click", startGame);
restart_btn.addEventListener("click", restartGame);

//Initializing the game and also clears the board from previous game data.
function startGame() {
  playerTurn = Math.random() >= 0.5;
  playerOneScore.textContent = scoreOne;
  playerTwoScore.textContent = scoreTwo;
  startMessage(playerTurn);

  cellElements.forEach((cell) => {
    cell.classList.remove(playerOne);
    cell.classList.remove(playerTwo);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  boardHoverClass();
  winningMessageElement.classList.remove("show");
}

// Takes in click parameter from EventListener
// Adds currentPlayer from playerTurn
// calls on differnt functions in game logic based on player and cell data.
function handleClick(e) {
  const cell = e.target;
  const currentPlayer = playerTurn ? playerOne : playerTwo;
  placeMark(cell, currentPlayer);

  if (checkWin(currentPlayer)) {
    updateScore(currentPlayer);
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    boardHoverClass();
    updateMessage(currentPlayer);
  }
}

//TODO - BUG: Score to currentplayer even if game ends in a draw.
// Updates game score
function updateScore(currentPlayer) {
  if (currentPlayer == playerOne) {
    playerOneScore.textContent = scoreOne++;
  } else {
    playerTwoScore.textContent = scoreTwo++;
  }
}

//Initializing which player got the first move/starts.
function startMessage(playerTurn) {
  if (playerTurn === true) {
    playerMessage.textContent = "X Start";
  } else {
    playerMessage.textContent = "Circle Start";
  }
}
//Uppdates 'startMessage()' to show whos turn it is
// based on currentplayer variable.
function updateMessage(currentPlayer) {
  if (currentPlayer == playerTwo) {
    playerMessage.textContent = "X's Turn";
  } else {
    playerMessage.textContent = "Circle's Turn";
  }
}
// Adds class to cell in order to put down an X or circle.
function placeMark(cell, currentPlayer) {
  cell.classList.add(currentPlayer);
}

// Switches between players every turn if there is no win or draw.
function switchTurns() {
  playerTurn = !playerTurn;
}
// Adds hover effect to cell to show current mark/player.
function boardHoverClass() {
  board.classList.remove(playerOne);
  board.classList.remove(playerTwo);
  if (playerTurn) {
    board.classList.add(playerOne);
  } else {
    board.classList.add(playerTwo);
  }
}

// Checks trough all the cells and sees if there is a match with 'win' array.
function checkWin(currentPlayer) {
  return win.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

// Checks if every cell has either a playerOne och playerTwo class inside.
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(playerOne) || cell.classList.contains(playerTwo)
    );
  });
}

// Outputs winning message based on a bool from check win and isdraw result.
function endGame(draw) {
  if (draw) {
    dataWinningMessage.textContent = "Draw!";
  } else {
    dataWinningMessage.textContent = `${playerTurn ? "X's" : "O's"} Win!`;
  }
  winningMessageElement.classList.add("show");
}

// Reloads current html document.
function restartGame() {
  return location.reload(true);
}
