// use modules for one of something, use factories for multiple of something
const gameboard = (() => {
  let arr = Array(9).fill("");
  return { arr };
})();
const displayController = (() => {
  const render = (arr) => {
    let content = document.querySelector(".content");
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    for (let i = 0; i < arr.length; i++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.innerText = arr[i];
      content.appendChild(div);
    }
  };
  return { render };
})();
const player = (name) => {
  return { name };
};

displayController.render(gameboard.arr);
gameboard.arr[4] = "X";
displayController.render(gameboard.arr);
