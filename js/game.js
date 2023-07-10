class Game {
  constructor() {
    this.drop = this.drop.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.position = this.getStartPosition();
    this.draggedPiece = null;
    this.turn = "white";
    this.drawBoard();
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

  drawBoard() {
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
    const { row, col } = this.getSquareFromMouse(e);
    this.draggedPiece = this.position[row][col];
  }

  drop(e) {
    // if (this.draggedPiece.color != this.turn) return;

    const { row, col } = this.getSquareFromMouse(e);

    console.log(this.draggedPiece)

    const move = new Move(
      this.draggedPiece.row,
      this.draggedPiece.col,
      row,
      col
    );

    // if (this.isLegalMove(move, this.draggedPiece.getMoves(this.position))) {
    //   this.makeMove(move);
    //   if (this.isKingAttacked(this.turn)) {
    //     this.undoMove(move);
    //     return;
    //   } else {
    //     squareElement.innerHTML = "";
    //     squareElement.appendChild(this.draggedPieceElement);
    //   }
    // } else {
    //   return;
    // }

    this.makeMove(move);

    this.swapTurns();
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter(e) {
    e.preventDefault();
  }

  makeMove(move) {
    this.position[move.endRow][move.endCol] = this.draggedPiece;
    this.position[move.startRow][move.startCol] = "";
    this.draggedPiece.row = move.endRow;
    this.draggedPiece.col = move.endCol;
    const startSquareElement = this.getSquareElement(
      move.startRow,
      move.startCol
    );
    const endSquareElement = this.getSquareElement(move.endRow, move.endCol);
    endSquareElement.innerHTML = startSquareElement.innerHTML;
    startSquareElement.innerHTML = "";
  }

  swapTurns() {
    this.turn = this.turn == "white" ? "black" : "white";
  }

  undoMove(move) {
    this.position[move.startRow][move.startCol] = this.draggedPiece;
    this.position[move.endRow][move.endCol] = "";
    this.draggedPiece.row = move.startRow;
    this.draggedPiece.col = move.startCol;
    const startSquareElement = this.getSquareElement(
      move.startRow,
      move.startCol
    );
    const endSquareElement = this.getSquareElement(move.endRow, move.endCol);
    startSquareElement.innerHTML = endSquareElement.innerHTML;
    endSquareElement.innerHTML = "";
  }

  getAllMoves() {
    let allMoves = [];
    for (const row of this.position) {
      for (const piece of row) {
        if (piece.color == this.turn) {
          const pieceMoves = piece.getMoves(this.position);
          for (const move of pieceMoves) {
            allMoves.push(move);
          }
        }
      }
    }
    return allMoves;
  }

  // isLegalMove(move, legalMoves) {
  //   for (const legalMove of legalMoves) {
  //     if (
  //       move.end.col == legalMove.end.col &&
  //       move.end.row == legalMove.end.row
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // isKingAttacked(color) {
  //   const king = this.getKing(color);
  //   const enemyColor = color == "white" ? "black" : "white";
  //   const enemyMoves = this.getPlayerMoves(enemyColor);
  //   for (const move of enemyMoves) {
  //     if (move.end.row == king.row && move.end.col == king.col) return true;
  //   }
  //   return false;
  // }

  // getKing(KingColor) {
  //   let king;
  //   this.position.forEach((row) =>
  //     row.forEach((piece) => {
  //       if (piece.color == KingColor && piece instanceof King) king = piece;
  //     })
  //   );
  //   return king;
  // }

  // getPlayerMoves(playerColor) {
  //   let moves = [];
  //   this.position.forEach((row) =>
  //     row.forEach((piece) => {
  //       if (piece.color == playerColor) {
  //         moves.push(piece.getMoves(this.position));
  //       }
  //     })
  //   );
  //   return moves.flat();
  // }
}
