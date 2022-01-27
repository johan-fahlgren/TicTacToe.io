const playerOne = "x";
const playerTwo = "circle";
let playerTurn;

const restart_btn = document.getElementById("restart_btn");

const cellElements = document.querySelectorAll("[data-index]");
const board = document.getElementById("board");
const dataWinningMessage = document.querySelector("[data-winning-message]");
const winningMessageElement = document.getElementById("winning_message");

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

restart_btn.addEventListener("click", startGame);

function startGame() {
  playerTurn = Math.random() >= 0.5;

  cellElements.forEach((cell) => {
    cell.classList.remove(playerOne);
    cell.classList.remove(playerTwo);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  boardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  //clicked cell
  const cell = e.target;

  const currentPlayer = playerTurn ? playerOne : playerTwo;
  //Place marker/tick
  placeMark(cell, currentPlayer);

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    boardHoverClass();
  }
}

function placeMark(cell, currentPlayer) {
  cell.classList.add(currentPlayer);
}

function switchTurns() {
  playerTurn = !playerTurn;
}

function boardHoverClass() {
  board.classList.remove(playerOne);
  board.classList.remove(playerTwo);
  if (playerTurn) {
    board.classList.add(playerOne);
  } else {
    board.classList.add(playerTwo);
  }
}

function checkWin(currentPlayer) {
  return win.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(playerOne) || cell.classList.contains(playerTwo)
    );
  });
}

function endGame(draw) {
  if (draw) {
    dataWinningMessage.textContent = "Draw!";
  } else {
    dataWinningMessage.textContent = `${playerTurn ? "X's" : "O's"} Win!`;
  }
  winningMessageElement.classList.add("show");
}
