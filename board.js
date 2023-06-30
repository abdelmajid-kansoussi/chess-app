class Game {
  constructor() {
    this.position = this.getStartingPosition();
    this.drawBoard();
  }

  drawBoard() {
    const boardElement = document.getElementById("board");

    this.position.forEach((row, i) => {
      row.forEach((col, j) => {
        const squareElement = document.createElement("div");
        squareElement.classList.add("square");
        boardElement.appendChild(squareElement);

        if (i % 2 == j % 2) {
          squareElement.style.backgroundColor = "green";
        } else {
          squareElement.style.backgroundColor = "red";
        }

        if (col != "") {
          const pieceElement = document.createElement("img");
          pieceElement.draggable = true;
          pieceElement.src = `images/${col}.png`;
          squareElement.appendChild(pieceElement);
        }
      });
    });
  }

  getStartingPosition() {
    //prettier-ignore
    return [
      ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
      ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
      [ ""  , ""  , ""  , ""  , ""  , ""  , ""  , "" ],
      [ ""  , ""  , ""  , ""  , ""  , ""  , ""  , "" ],
      [ ""  , ""  , ""  , ""  , ""  , ""  , ""  , "" ],
      [ ""  , ""  , ""  , ""  , ""  , ""  , ""  , "" ],
      ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
      ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
    ];
  }
}
