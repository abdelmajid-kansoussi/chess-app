class Game {
  constructor() {
    this.drop = this.drop.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragStart = this.dragStart.bind(this);

    this.position = this.getStartingPosition();

    this.draggedPiece = null;
    this.draggedPieceElement = null;
    this.turn = "white";

    this.drawBoard();
  }

  drawBoard() {
    const boardElement = document.getElementById("board");

    this.position.forEach((row, i) => {
      row.forEach((piece, j) => {
        const squareElement = document.createElement("div");
        squareElement.classList.add("square");
        boardElement.appendChild(squareElement);
        squareElement.dataset.row = i;
        squareElement.dataset.col = j;
        squareElement.addEventListener("drop", this.drop);
        squareElement.addEventListener("dragenter", this.dragEnter);
        squareElement.addEventListener("dragover", this.dragOver);

        if (i % 2 == j % 2) {
          squareElement.style.backgroundColor = "green";
        } else {
          squareElement.style.backgroundColor = "red";
        }

        if (piece != "") {
          const pieceElement = document.createElement("img");
          pieceElement.draggable = true;
          pieceElement.src = `images/${piece.color}-${piece.name}.png`;
          squareElement.appendChild(pieceElement);
          pieceElement.addEventListener("dragstart", this.dragStart);
        }
      });
    });
  }

  getStartingPosition() {
    return [
      [
        new Rook(0, 0, "black"),
        new Knight(0, 1, "black"),
        new Bishop(0, 2, "black"),
        new Queen(0, 3, "black"),
        new King(0, 4, "black"),
        new Bishop(0, 5, "black"),
        new Knight(0, 6, "black"),
        new Rook(0, 7, "black"),
      ],
      [
        new Pawn(1, 0, "black"),
        new Pawn(1, 1, "black"),
        new Pawn(1, 2, "black"),
        new Pawn(1, 3, "black"),
        new Pawn(1, 4, "black"),
        new Pawn(1, 5, "black"),
        new Pawn(1, 6, "black"),
        new Pawn(1, 7, "black"),
      ],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      [
        new Pawn(6, 0, "white"),
        new Pawn(6, 1, "white"),
        new Pawn(6, 2, "white"),
        new Pawn(6, 3, "white"),
        new Pawn(6, 4, "white"),
        new Pawn(6, 5, "white"),
        new Pawn(6, 6, "white"),
        new Pawn(6, 7, "white"),
      ],
      [
        new Rook(7, 0, "white"),
        new Knight(7, 1, "white"),
        new Bishop(7, 2, "white"),
        new Queen(7, 3, "white"),
        new King(7, 4, "white"),
        new Bishop(7, 5, "white"),
        new Knight(7, 6, "white"),
        new Rook(7, 7, "white"),
      ],
    ];
  }

  dragStart(e) {
    const { row: startingRow, col: startingCol } =
      e.target.parentElement.dataset;
    this.draggedPiece = this.position[startingRow][startingCol];
    this.draggedPieceElement = e.target;
  }

  drop(e) {
    if (this.draggedPiece.color != this.turn) return;

    let endingRow, endingCol;


    if (e.target.classList.contains("square")) {
      // if the e.target contains the class square, the square is empty
      endingRow = e.target.dataset.row;
      endingCol = e.target.dataset.col;

      if (
        this.isLegalMove(
          { endingRow, endingCol },
          this.draggedPiece.getLegalMoves(this.position)
        )
      ) {
        e.target.appendChild(this.draggedPieceElement);
      } else {
        console.log("hello")
        return;
      }
    } else {
      // else e.target is a piece and the square is full
      endingRow = e.target.parentElement.dataset.row;
      endingCol = e.target.parentElement.dataset.col;
      if (
        this.isLegalMove(
          { endingRow, endingCol },
          this.draggedPiece.getLegalMoves(this.position)
        )
      ) {
        e.target.appendChild(this.draggedPieceElement);
      } else {
        return;
      }
      e.target.parentElement.appendChild(this.draggedPieceElement);
      e.target.parentElement.removeChild(e.target);
    }

    this.makeMove(endingRow, endingCol);

    this.draggedPiece = null;
    this.draggedPieceElement = null;
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter(e) {
    e.preventDefault();
  }

  makeMove(endingRow, endingCol) {
    const { row: startingRow, col: startingCol } = this.draggedPiece;
    this.position[endingRow][endingCol] = this.draggedPiece;
    this.position[startingRow][startingCol] = "";
    this.draggedPiece.row = Number(endingRow);
    this.draggedPiece.col = Number(endingCol);
    this.swapTurns();
  }

  swapTurns() {
    this.turn = this.turn == "white" ? "black" : "white";
  }

  isLegalMove(move, legalMoves) {
    for (const legalMove of legalMoves) {
      if (
        move.endingCol == legalMove.endingCol &&
        move.endingRow == legalMove.endingRow
      ) {
        return true;
      }
    }
    return false;
  }
}
