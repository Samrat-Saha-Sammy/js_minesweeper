const config = {
  row: 5,
  col: 5,
  bomb: 3,
  total: 0,
};

let bombPos = [];

const placeBomb = () => {
  for (let i = 0; i < bombPos.length; i++) {
    const _id = bombPos[i];
    const _e = document.querySelector("#d" + _id);
    _e.innerText = "*";

    // Top
    const _t = document.querySelector("#d" + (_id - config.row));
    if (_t) {
      _t.innerText = parseInt(_t.textContent)
        ? parseInt(_t.textContent) + 1
        : 1;
    }
    // Top  Right

    const _t2 = document.querySelector("#d" + (_id - config.row + 1));
    if (_t2 && _id % config.row) {
      _t2.innerText = parseInt(_t2.textContent)
        ? parseInt(_t2.textContent) + 1
        : 1;
    }
    // Right

    let next = _id + 1;
    console.log(next, _id % config.row);
    const _t3 = document.querySelector("#d" + next);
    if (_t3 && _id % config.row) {
      _t3.innerText = parseInt(_t3.textContent)
        ? parseInt(_t3.textContent) + 1
        : 1;
    }
    // Bottom Right
    const _t6 = document.querySelector("#d" + (_id + config.row + 1));
    if (_t6 && _id % config.row) {
      _t6.innerText = parseInt(_t6.textContent)
        ? parseInt(_t6.textContent) + 1
        : 1;
    }

    // Bottom
    const _t5 = document.querySelector("#d" + (_id + config.row));
    if (_t5) {
      _t5.innerText = parseInt(_t5.textContent)
        ? parseInt(_t5.textContent) + 1
        : 1;
    }

    // Bottom Left

    const _t7 = document.querySelector("#d" + (_id + config.row - 1));
    if (_t7 && (_id % config.row) - 1) {
      _t7.innerText = parseInt(_t7.textContent)
        ? parseInt(_t7.textContent) - 1
        : 1;
    }

    // Left
    const _t4 = document.querySelector("#d" + (_id - 1));
    if (_t4 && (_id % config.row) - 1) {
      _t4.innerText = parseInt(_t4.textContent)
        ? parseInt(_t4.textContent) + 1
        : 1;
    }
    // Top Left

    const _t8 = document.querySelector("#d" + (_id - config.row - 1));
    if (_t8 && (_id % config.row) - 1) {
      _t8.innerText = parseInt(_t8.textContent)
        ? parseInt(_t8.textContent) + 1
        : 1;
    }
  }
};

const renderBoard = () => {
  const _ROOT_DOM = document.querySelector("#gameArea");

  for (let j = 0; j < config.col; j++) {
    const rowDiv = document.createElement("div");

    for (let i = 0; i < config.row; i++) {
      const newDiv = document.createElement("div");
      const newContent = document.createTextNode(j * 5 + (i + 1));
      newDiv.setAttribute("id", "d" + (j * 5 + (i + 1)));
      //newDiv.appendChild(newContent);
      rowDiv.appendChild(newDiv);
    }
    _ROOT_DOM.appendChild(rowDiv);
  }

  placeBomb();
};

const init = () => {
  config.total = config.row * config.col;
  bombPos = getRandomBombPos();
  renderBoard();
};

const getRandomBombPos = () => {
  var arr = [];
  while (arr.length < config.bomb) {
    var r = Math.floor(Math.random() * config.total) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);
  return arr;
};

document.addEventListener("DOMContentLoaded", init);
