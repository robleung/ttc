// use modules for one of something, use factories for multiple of something
const gamearr = (() => {
  let arr = Array(9).fill("");
  const validMove = (pos) => {
    return arr[pos] == "";
  };
  const gameOver = (mark) => {
    // check for game over 1: tie, 0: draw, -1: pending
    return ((arr[0] == arr[1]) == mark && arr[2] == mark) ||
      (arr[3] == mark && arr[4] == mark && arr[5] == mark) ||
      (arr[6] == mark && arr[7] == mark && arr[8] == mark) ||
      (arr[0] == mark && arr[3] == mark && arr[6] == mark) ||
      (arr[1] == mark && arr[4] == mark && arr[7] == mark) ||
      (arr[2] == mark && arr[5] == mark && arr[8] == mark) ||
      (arr[0] == mark && arr[4] == mark && arr[8] == mark) ||
      (arr[2] == mark && arr[4] == mark && arr[6] == mark)
      ? 1
      : arr.filter((x) => x == "").length == 9
      ? 0
      : -1;
  };
  return { arr, validMove, gameOver };
})();
const displayController = (() => {
  const boxClick = (e) => {
    // check to see if space is occupied
    // get current player
    // insert marker
    let pos = e.target.id.split("-")[1];
    gamearr.validMove(pos)
      ? (gamearr.arr[pos] = "X")
      : console.log("space occupied");
  };
  const renderBoard = () => {
    let content = document.querySelector(".content");
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    for (let i = 0; i < gamearr.arr.length; i++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.id = "box-" + i;
      div.addEventListener("click", boxClick);
      div.innerText = gamearr.arr[i];
      content.append(div);
    }
  };
  const render = () => {
    let info = document.querySelector(".info");
    let p1 = document.createElement("div");
    let p1Label = document.createElement("label");
    p1Label.innerText = "Enter a name for Player 1 - X";
    let p1Input = document.createElement("input");
    p1Input.type = "text";
    p1.append(p1Label);
    p1.append(p1Input);
    let p2 = document.createElement("div");
    let p2Label = document.createElement("label");
    p2Label.innerText = "Enter a name for Player 2 - O";
    let p2Input = document.createElement("input");
    p2Input.type = "text";
    p2.append(p2Label);
    p2.append(p2Input);
    let start = document.createElement("button");
    start.innerText = "Submit / Start";
    info.append(p1, p2, start);
    renderBoard();
  };
  return { render, renderBoard, boxClick };
})();

const player = (name, marker) => {
  return { name, marker };
};
const gameplayController = (() => {
  const loadPlayers = () => {
    // prompt for p1, prompt for p2
    // assign markers
  };
  const start = () => {
    displayController.render();
    gameplayController.loadPlayers();
  };
  return { start, loadPlayers };
})();

gameplayController.start();
