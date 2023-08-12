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
  const render = () => {
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
      content.appendChild(div);
    }
  };
  return { render, boxClick };
})();

const player = (name) => {
  return { name };
};
const gameplayController = (() => {})();
