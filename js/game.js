class Game {
  constructor() {
    this.drop = this.drop.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.position = this.getStartPosition();
    this.turn = "white";
    this.startSquare = null;
    this.whiteKingLocation = [7, 4];
    this.blackKingLocation = [0, 4];
    this.checkmate = false;
    this.stalemate = false;
    this.drawStartPosition();
  }

  getSquareName(row, col) {
    const colMap = {
      0: "a",
      1: "b",
      2: "c",
      3: "d",
      4: "e",
      5: "f",
      6: "g",
      7: "h",
    };
    const squareName = `${colMap[col]}${8 - row}`;
    return squareName;
  }

  getSquareFromMouse(e) {
    const boardRect = document.querySelector(".board").getBoundingClientRect();
    const col = Math.floor((e.clientX - boardRect.x) / (boardRect.width / 8));
    const row = Math.floor((e.clientY - boardRect.y) / (boardRect.width / 8));
    return { row, col };
  }

  getSquareElement(row, col) {
    const squareName = this.getSquareName(row, col);
    return document.querySelector(`[data-name=${squareName}]`);
  }

  drawStartPosition() {
    const boardElement = document.getElementById("board");

    this.position.forEach((row, i) => {
      row.forEach((piece, j) => {
        const squareElement = document.createElement("div");
        squareElement.classList.add("square");
        boardElement.appendChild(squareElement);
        squareElement.dataset.name = this.getSquareName(i, j);
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
          pieceElement.src = piece.imgSrc;
          squareElement.appendChild(pieceElement);
          pieceElement.addEventListener("dragstart", this.dragStart);
        }
      });
    });
  }

  getStartPosition() {
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
    this.startSquare = this.getSquareFromMouse(e);
  }

  drop(e) {
    const endSquare = this.getSquareFromMouse(e);

    const move = new Move(
      this.startSquare.row,
      this.startSquare.col,
      endSquare.row,
      endSquare.col,
      this.position
    );

    if (move.movedPiece.color != this.turn) return;

    if (!this.isValidMove(move)) return;

    this.makeMove(move);
    if (this.checkmate) console.log("game over");

    const startSquareElement = this.getSquareElement(
      move.startRow,
      move.startCol
    );

    const endSquareElement = this.getSquareElement(move.endRow, move.endCol);
    endSquareElement.innerHTML = "";
    endSquareElement.appendChild(startSquareElement.firstChild);
    startSquareElement.innerHTML = "";

    this.swapTurns();

    this.startSquare = null;
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter(e) {
    e.preventDefault();
  }

  makeMove(move) {
    this.position[move.endRow][move.endCol] = move.movedPiece;
    this.position[move.startRow][move.startCol] = "";

    move.movedPiece.row = move.endRow;
    move.movedPiece.col = move.endCol;

    if (move.movedPiece.color == "white" && move.movedPiece instanceof King) {
      this.whiteKingLocation = [move.endRow, move.endCol];
    }
    if (move.movedPiece.color == "black" && move.movedPiece instanceof King) {
      this.blackKingLocation = [move.endRow, move.endCol];
    }
  }

  undoMove(move) {
    this.position[move.startRow][move.startCol] = move.movedPiece;
    this.position[move.endRow][move.endCol] = move.capturedPiece;

    move.movedPiece.row = move.startRow;
    move.movedPiece.col = move.startCol;

    if (move.movedPiece.color == "white" && move.movedPiece instanceof King) {
      this.whiteKingLocation = [move.startRow, move.startCol];
    }
    if (move.movedPiece.color == "black" && move.movedPiece instanceof King) {
      this.blackKingLocation = [move.startRow, move.startCol];
    }
  }

  swapTurns() {
    this.turn = this.turn == "white" ? "black" : "white";
  }

  getAllMoves() {
    let allMoves = [];
    for (const row of this.position) {
      for (const piece of row) {
        if (piece.color == this.turn) {
          const pieceMoves = piece.getMoves(this.position);
          for (const move of pieceMoves) allMoves.push(move);
        }
      }
    }
    return allMoves;
  }

  getValidMoves() {
    let validMoves = [];
    const allMoves = this.getAllMoves();
    for (const move of allMoves) {
      this.makeMove(move);
      if (!this.isCheck()) validMoves.push(move);
      this.undoMove(move);
    }

    if (validMoves.length == 0) {
      if (this.isCheck()) this.checkmate = true;
      else this.stalemate = true;
    }

    return validMoves;
  }

  isCheck() {
    if (this.turn == "white") {
      return this.isSquareAttacked(
        this.whiteKingLocation[0],
        this.whiteKingLocation[1]
      );
    } else {
      return this.isSquareAttacked(
        this.blackKingLocation[0],
        this.blackKingLocation[1]
      );
    }
  }

  isSquareAttacked(row, col) {
    this.swapTurns();
    const opponentMoves = this.getAllMoves();
    this.swapTurns();
    for (const move of opponentMoves) {
      if (move.endRow == row && move.endCol == col) {
        return true;
      }
    }
    return false;
  }

  isValidMove(move) {
    const validMoves = this.getValidMoves();
    for (const validMove of validMoves) {
      if (move.endRow == validMove.endRow && move.endCol == validMove.endCol) {
        return true;
      }
    }
    return false;
  }
}
