import { coreLogic } from "./coreLogic.js";
const core = new coreLogic();

// TODO(done) - ADD BOT FUNCTION
// TODO(done) - CLICK CELLS FAST AND WIN, ADD RESTRICTION DURING BOT TURN
// TODO(done) - IF BOT WINS NOTHING HAPPENS
// TODO - BUG - PLAYER SWITCHING BETWEEN TURNS, SHOULD REMAIN
// TODO - BUG - BOT NEVER STARTS
// TODO - BUG - setTimeout() not working(asynchronous function), alternative?

//Variables
core.playerOne = "x";
core.playerTwo = "circle";
core.scoreOne = 0;
core.scoreTwo = 0;

//Button Elements
const newGame_btn = document.getElementById("newGame_btn");
const restart_btn = document.getElementById("restart_btn");
const bot_btn = document.getElementById("bot_btn");

//Elements
const cellElements = document.querySelectorAll("[data-index]");
const cellClassElements = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const dataWinningMessage = document.querySelector("[data-winning-message]");
const winningMessageElement = document.getElementById("winning_message");
const playerOneScore = document.querySelector(".playerOneScore");
const playerTwoScore = document.querySelector(".playerTwoScore");
const playerMessage = document.querySelector(".player_Message");

//Button event listeners
newGame_btn.addEventListener("click", startGame);
restart_btn.addEventListener("click", restartGame);
bot_btn.addEventListener("click", botBtnClicked, { once: true });

//Adds clicked class to button element
function botBtnClicked() {
  bot_btn.classList.add("bot");
}

startGame();

//Initializing the game and also clears the board from previous game data.
function startGame() {
  if (core.scoreOne < 1 || core.scoreTwo < 1) {
    core.playerTurn = Math.random() >= 0.5;
  }
  core.getNextPlayer(core.playerTurn);
  playerOneScore.textContent = core.scoreOne;
  playerTwoScore.textContent = core.scoreTwo;
  startMessage(core.playerTurn);

  cellElements.forEach((cell) => {
    cell.classList.remove(core.playerOne);
    cell.classList.remove(core.playerTwo);
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

  placeMark(cell, core.currentPlayer);

  if (checkWin(core.currentPlayer)) {
    updateScore(core.currentPlayer);
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    core.getNextPlayer();
    updateMessage(core.currentPlayer);

    if (bot_btn.className === "bot_btn bot") {
      cellElements.forEach((cell) => {
        cell.removeEventListener("click", handleClick);
      });

      botPlayer(core.currentPlayer);
      if (checkWin(core.currentPlayer)) {
        updateScore(core.currentPlayer);
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      } else {
        core.getNextPlayer();
        cellElements.forEach((cell) => {
          cell.addEventListener("click", handleClick);
        });
      }
    }
    updateMessage(core.currentPlayer);
    boardHoverClass();
  }
}

//GLUECODE
// Updates game score
function updateScore(currentPlayer) {
  if (core.currentPlayer == core.playerOne) {
    playerOneScore.textContent = core.updateScoreOne();
  } else {
    playerTwoScore.textContent = core.updateScoreTwo();
  }
}

//GLUECODE
//Initializing which player got the first move/starts.
function startMessage(playerTurn) {
  if (core.playerTurn === true) {
    playerMessage.textContent = "X Start";
  } else {
    playerMessage.textContent = "Circle Start";
  }
}

//GLUECODE
//Uppdates 'startMessage()' to show whos turn it is next
// based on currentPlayer variable.
function updateMessage(currentPlayer) {
  if (core.currentPlayer == core.playerOne) {
    playerMessage.textContent = "X's Turn";
  } else {
    playerMessage.textContent = "Circle's Turn";
  }
}

//GLUECODE
// Adds class to cell in order to put down an X or circle.
function placeMark(cell, currentPlayer) {
  cell.classList.add(core.currentPlayer);
}

//GLUECODE
// Adds hover effect to cell to show current mark/player.
function boardHoverClass() {
  board.classList.remove(core.playerOne);
  board.classList.remove(core.playerTwo);
  if (core.playerTurn) {
    board.classList.add(core.playerOne);
  } else {
    board.classList.add(core.playerTwo);
  }
}

// Checks trough all the cells and sees if there is a match with 'win' array.
function checkWin(currentPlayer) {
  for (let combination of core.win) {
    let sum = 0;
    for (let index of combination) {
      if (cellElements[index].classList.contains(core.currentPlayer)) {
        sum++;
      }
    }
    if (sum === 3) {
      return true;
    }
  }
  return false;
}

// Checks if every cell has either a playerOne och playerTwo class inside.
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(core.playerOne) ||
      cell.classList.contains(core.playerTwo)
    );
  });
}

// Outputs winning message based on a bool from check win and isdraw result.
function endGame(draw) {
  if (draw) {
    dataWinningMessage.textContent = "Draw!";
  } else {
    dataWinningMessage.textContent = `${core.playerTurn ? "X's" : "O's"} Win!`;
  }
  winningMessageElement.classList.add("show");
}

// Reloads current html document.
function restartGame() {
  return location.reload(true);
}

// Main BOT function, checks for empty cell and places mark at random.
function botPlayer(currentPlayer) {
  let cells = Array.from(cellElements);
  let fullCells = [];
  let emptyCells = [];

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].className == "cell x" || cells[i].className == "cell circle") {
      fullCells.push(i);
    } else {
      emptyCells.push(i);
    }
  }

  let botTurn = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  placeMark(cells[botTurn], core.currentPlayer);
}
