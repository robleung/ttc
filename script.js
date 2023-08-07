// use modules for one of something, use factories for multiple of something
const gameboard = (() => {
  arr = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  return { arr };
})();
const displayController = (() => {
  const render = (arr) => {
    let content = document.querySelector(".content");
    for (let i = 0; i < arr.length; i++) {
      let div = document.createElement("div");
      div.classList.add("gameboard");
      div.innerText = arr[i];
      content.appendChild(div);
    }
  };
  return { render };
})();
const player = (name) => {
  this.name = name;
  return { name };
};
