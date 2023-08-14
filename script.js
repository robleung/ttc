// use modules for one of something, use factories for multiple of something
const gameBoard = (() => {
  let arr = Array(9).fill("");
  const validMove = (pos) => {
    return arr[pos] == "";
  };
  const currentPlayer = () => {
    return arr.filter((x) => x == "").length % 2 == 0 ? 2 : 1;
  };
  const gameOver = (mark) => {
    // check for game over 1: tie, 0: draw, -1: pending
    return ((arr[0] == mark && arr[1]) == mark && arr[2] == mark) ||
      (arr[3] == mark && arr[4] == mark && arr[5] == mark) ||
      (arr[6] == mark && arr[7] == mark && arr[8] == mark) ||
      (arr[0] == mark && arr[3] == mark && arr[6] == mark) ||
      (arr[1] == mark && arr[4] == mark && arr[7] == mark) ||
      (arr[2] == mark && arr[5] == mark && arr[8] == mark) ||
      (arr[0] == mark && arr[4] == mark && arr[8] == mark) ||
      (arr[2] == mark && arr[4] == mark && arr[6] == mark)
      ? 1
      : arr.filter((x) => x == "").length == 0
      ? 0
      : -1;
  };
  const clearBoard = () => {
    location.reload();
  };
  return { arr, currentPlayer, validMove, gameOver, clearBoard };
})();
const displayController = (() => {
  const boxClick = (e) => {
    if (gameplayController.startPermissive) {
      let pos = e.target.id.split("-")[1];
      if (gameBoard.validMove(pos)) {
        gameBoard.arr[pos] = eval(
          `gameplayController.p${gameBoard.currentPlayer()}.marker`
        );
      }
      renderBoard();
      gameOverCheck();
    }
  };
  const gameOverCheck = () => {
    let prevPlayer = gameBoard.currentPlayer() == 1 ? 2 : 1;
    let mark = eval(`gameplayController.p${prevPlayer}.marker`);
    if (gameBoard.gameOver(mark) == 0 || gameBoard.gameOver(mark) == 1) {
      let info = document.querySelector(".info");
      info.innerHTML = "";
      let gameOverStatus = document.createElement("div");
      gameBoard.gameOver(mark) == 1
        ? (gameOverStatus.innerText =
            eval(`gameplayController.p${prevPlayer}.name`) + " has won.")
        : (gameOverStatus.innerText = "There was a tie.");
      let message = document.createElement("div");
      message.innerText = "Click Restart to play again.";
      let restartButton = document.createElement("button");
      restartButton.innerText = "Restart";
      restartButton.addEventListener("click", gameBoard.clearBoard);
      info.append(gameOverStatus, message, restartButton);
      gameplayController.startPermissive = 0;
    }
  };
  const renderBoard = () => {
    let turn = document.querySelector(".turn");
    gameplayController.startPermissive
      ? (turn.innerText =
          "It's your turn " +
          eval(`gameplayController.p${gameBoard.currentPlayer()}.name`))
      : (turn.innerText = "");
    let content = document.querySelector(".content");
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    for (let i = 0; i < gameBoard.arr.length; i++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.id = "box-" + i;
      div.addEventListener("click", boxClick);
      div.innerText = gameBoard.arr[i];
      content.append(div);
    }
  };
  return { renderBoard, boxClick };
})();

const player = (name, marker) => {
  return { name, marker };
};
const gameplayController = (() => {
  let startPermissive = 0;
  let p1;
  let p2;
  const loadPlayers = () => {
    gameplayController.p1 = player(prompt("Player 1 enter your name."), "X");
    gameplayController.p2 = player(prompt("Player 2 enter your name."), "O");
    gameplayController.startPermissive = 1;
    displayController.renderBoard();
  };

  const start = () => {
    let info = document.querySelector(".info");
    let message = document.createElement("div");
    message.innerText = "Click start to begin.";
    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    let startButton = document.createElement("button");
    startButton.innerText = "Start";
    startButton.addEventListener("click", loadPlayers);
    let restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.addEventListener("click", gameBoard.clearBoard);
    buttons.append(startButton, restartButton);
    let turn = document.createElement("div");
    turn.classList.add("turn");
    info.append(message, buttons, turn);
  };
  const init = () => {
    start();
    displayController.renderBoard();
  };
  return { startPermissive, p1, p2, init, loadPlayers };
})();

gameplayController.init();
