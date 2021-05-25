class JSMinesweeper {
  // Default Values
  constructor(row = 5, col = 5, boom = 2) {
    this.x = row;
    this.y = col;
    this.bomb = boom;
    this.totalBox = row * col;
    this.bombLocations = this.getRandomBombPos(); // Random Bomb Locations
    this.boxs = this.getBoxs();
  }

  getBoxs = () => {
    var arr = [];
    for (let i = 0; i < this.totalBox; i++) {
      const _i = i + 1;
      arr[i] = {
        id: _i,
        isBomb: this.bombLocations.includes(_i),
        isRightEdge: _i % this.x === 0,
        isLeftEdge: _i % this.x === 1,
        isTopEdge: _i <= this.x,
        isBottomEdge: _i > this.totalBox - this.x,
        isClicked: false,
        isHidden: true,
        steps: this.bombLocations.includes(_i) ? -1 : 0,
      };
    }
    return [...arr];
  };

  getRandomBombPos = () => {
    var arr = [];
    while (arr.length < this.bomb) {
      var r = Math.floor(Math.random() * this.totalBox) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  calcBombSteps = () => {
    for (let i = 0; i < this.totalBox; i++) {
      const _box = this.boxs[i];
      let _next = null; //@

      if (_box.isBomb) {
        // Left
        _next = this.boxs[i - 1];
        if (!_box.isLeftEdge && !_next?.isBomb) {
          _next.steps++;
        }
        // Right
        _next = this.boxs[i + 1];
        if (!_box.isRightEdge && !_next?.isBomb) {
          _next.steps++;
        }
        // Top
        _next = this.boxs[i - this.x];
        if (!_box.isTopEdge && !_next?.isBomb) {
          _next.steps++;
        }
        // Bottom
        _next = this.boxs[i + this.x];
        if (!_box.isBottomEdge && !_next?.isBomb) {
          _next.steps++;
        }

        // Top Left
        _next = this.boxs[i - this.x - 1];
        if (!_box.isTopEdge && !_box.isLeftEdge && !_next?.isBomb) {
          _next.steps++;
        }

        // Top Right
        _next = this.boxs[i - this.x + 1];
        if (!_box.isTopEdge && !_box.isRightEdge && !_next?.isBomb) {
          _next.steps++;
        }

        // Bottom Right
        _next = this.boxs[i + this.x + 1];
        if (!_box.isBottomEdge && !_box.isRightEdge && !_next?.isBomb) {
          _next.steps++;
        }

        // Bottom Left
        _next = this.boxs[i + this.x - 1];
        if (!_box.isBottomEdge && !_box.isLeftEdge && !_next?.isBomb) {
          _next.steps++;
        }
      }
    }
    this.plotDOM();
  };

  handleBoxClick = (_e) => {
    var x = /\d+/;
    const _id = parseInt(_e.target?.id.match(x)[0], 10);
    const _idx = _id - 1;
    const _box = this.boxs[_idx];
    debugger;
  };

  plotDOM = () => {
    const _ROOT_ = document.querySelector("#gameArea");
    _ROOT_.innerHTML = "";
    if (!_ROOT_) {
      console.error("DOM with id #gameArea not found");
      return false;
    }

    let rowBlockDiv = document.createElement("div");
    for (let i = 0; i < this.totalBox; i++) {
      const newDiv = document.createElement("div");
      const _text = this.boxs[i].steps > 0 ? this.boxs[i].steps : "";
      let classList = ["box"];
      classList = classList.concat(_text ? ["floor-map"] : []);
      classList = classList.concat(this.boxs[i].isBomb ? ["boom"] : []);
      classList = classList.concat(this.boxs[i].isHidden ? ["hidden"] : []);
      newDiv.setAttribute("id", "d" + i);

      newDiv.className = `${classList.join(" ")}`;
      const newContent = document.createTextNode(_text);
      newDiv.appendChild(newContent);
      newDiv.addEventListener("click", this.handleBoxClick);
      rowBlockDiv.appendChild(newDiv);

      if (this.boxs[i].isRightEdge) {
        _ROOT_.appendChild(rowBlockDiv);
        rowBlockDiv = document.createElement("div"); // reset
      }
    }
  };
}

const loadGame = () => {
  const _g = new JSMinesweeper(10, 10, 5);
  _g.calcBombSteps();
};

document.addEventListener("DOMContentLoaded", loadGame);
