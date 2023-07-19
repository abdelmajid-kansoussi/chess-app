const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

class Game {
  constructor() {
    this.turn = "w";

    this.firstClickedSquare = null;
    this.secondClickedSquare = null;
    this.hasClickedSquare = false;

    this.whiteKingLocation = [7, 4];
    this.blackKingLocation = [0, 4];

    this.checkmate = false;
    this.stalemate = false;

    this.enPassantSquare = null;

    this.position = this.getStartPosition();
    this.drawPosition();

    this.handleClick = this.handleClick.bind(this);
    canvas.addEventListener("click", this.handleClick);
  }

  getClickedSquare(e) {
    const boardRect = canvas.getBoundingClientRect();
    const squareSize = canvas.width / 8;
    const col = Math.floor((e.clientX - boardRect.x) / squareSize);
    const row = Math.floor((e.clientY - boardRect.y) / squareSize);
    return { row, col };
  }

  drawPosition() {
    const squareSize = canvas.width / 8;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // drawing the square
        if (i % 2 == j % 2) ctx.fillStyle = "red";
        else ctx.fillStyle = "green";
        ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);

        // drawing the piece
        const piece = this.position[i][j];
        if (piece == "--") continue;
        const pieceImage = new Image();
        pieceImage.src = `images/${piece}.png`;
        pieceImage.addEventListener("load", () => {
          ctx.drawImage(pieceImage, j * squareSize, i * squareSize, squareSize, squareSize);
        });
      }
    }
  }

  getStartPosition() {
    return [
      ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
      ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
      ["--", "--", "--", "--", "--", "--", "--", "--"],
      ["--", "--", "--", "--", "--", "--", "--", "--"],
      ["--", "--", "--", "--", "--", "--", "--", "--"],
      ["--", "--", "--", "--", "--", "--", "--", "--"],
      ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
      ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
    ];
  }

  handleClick(e) {
    if (this.hasClickedSquare) {
      this.secondClickedSquare = this.getClickedSquare(e);
      const { row: endRow, col: endCol } = this.secondClickedSquare;
      const { row: startRow, col: startCol } = this.firstClickedSquare;
      const move = new Move(startRow, startCol, endRow, endCol, this.position);

      if (move.movedPiece[0] != this.turn || !this.isValidMove(move)) {
        console.log("not valid move");
        this.hasClickedSquare = false;
      } else {
        this.makeMove(move);
        this.drawPosition();
        this.swapTurns();

        this.firstClickedSquare = null;
        this.secondClickedSquare = null;
        this.hasClickedSquare = false;
      }
    } else {
      this.firstClickedSquare = this.getClickedSquare(e);
      this.hasClickedSquare = true;
    }
  }

  makeMove(move) {
    // Updating kings locations
    if (move.movedPiece == "wk") {
      this.whiteKingLocation = [move.endRow, move.endCol];
    }
    if (move.movedPiece == "bk") {
      this.blackKingLocation = [move.endRow, move.endCol];
    }

    this.position[move.endRow][move.endCol] = move.movedPiece;
    this.position[move.startRow][move.startCol] = "--";

    // // Promotion
    // if (move.isPromotion) {
    //   const promotionPiece = new Queen(move.endRow, move.endCol, move.movedPiece.color);
    //   this.position[move.endRow][move.endCol] = promotionPiece;
    // }

    // // En passant
    // if (move.movedPiece instanceof Pawn && move.startRow == 1 && move.endRow == 3) {
    //   this.enPassantSquare = { row: 2, col: move.startCol };
    // } else if (move.movedPiece instanceof Pawn && move.startRow == 6 && move.endRow == 4) {
    //   this.enPassantSquare = { row: 5, col: move.startCol };
    // } else {
    //   this.enPassantSquare = null;
    // }

    // if (move.isEnPassant) {
    //   if (move.movedPiece.color == "white") {
    //     this.position[this.enPassantSquare.row][this.enPassantSquare.col] = move.movedPiece;
    //     this.position[this.enPassantSquare.row + 1][this.enPassantSquare.col] = "";
    //     this.position[move.startRow][move.startCol] = "";
    //   } else {
    //     this.position[this.enPassantSquare.row][this.enPassantSquare.col] = move.movedPiece;
    //     this.position[this.enPassantSquare.row - 1][this.enPassantSquare.col] = "";
    //     this.position[move.startRow][move.startCol] = "";
    //   }
    // }
  }

  undoMove(move) {
    if (move.movedPiece == "wk") {
      this.whiteKingLocation = [move.startRow, move.startCol];
    }
    if (move.movedPiece == "bk") {
      this.blackKingLocation = [move.startRow, move.startCol];
    }
    // if (move.isEnPassant) {
    //   if (move.movedPiece.color == "white") {
    //     this.position[this.enPassantSquare.row][this.enPassantSquare.col] = "";
    //     this.position[move.startRow][move.startCol] = move.movedPiece;
    //     this.position[this.enPassantSquare.row + 1][this.enPassantSquare.col] = move.capturedPiece;
    //   } else {
    //     this.position[this.enPassantSquare.row][this.enPassantSquare.col] = "";
    //     this.position[move.startRow][move.startCol] = move.movedPiece;
    //     this.position[this.enPassantSquare.row - 1][this.enPassantSquare.col] = move.capturedPiece;
    //   }
    // } else {
    this.position[move.startRow][move.startCol] = move.movedPiece;
    this.position[move.endRow][move.endCol] = move.capturedPiece;
    // }
  }

  swapTurns() {
    this.turn = this.turn == "w" ? "b" : "w";
  }

  getPawnMoves(row, col) {
    let moves = [];
    // white pawn
    if (this.turn == "b") {
      // moving one square
      if (row + 1 < 8 && this.position[row + 1][col] == "--") {
        moves.push(new Move(row, col, row + 1, col, this.position));
      }
      // moving two squares
      if (row == 1 && this.position[row + 2][col] == "--") {
        moves.push(new Move(row, col, row + 2, col, this.position));
      }
      // capturing to the left
      if (row + 1 < 8 && col >= 1 && this.position[row + 1][col - 1][0] == "w") {
        moves.push(new Move(row, col, row + 1, col - 1, this.position));
      }
      // capturing to the right
      if (row + 1 < 8 && col + 1 < 8 && this.position[row + 1][col + 1][0] == "w") {
        moves.push(new Move(row, col, row + 1, col + 1, this.position));
      }
      // // En passant
      // if (enPassantSquare != null) {
      //   moves.push(new Move(row, col, enPassantSquare.row, enPassantSquare.col, position, enPassantSquare));
      // }
    }
    // black pawn
    else {
      // moving one square
      if (row - 1 >= 0 && this.position[row - 1][col] == "--") {
        moves.push(new Move(row, col, row - 1, col, this.position));
      }
      // moving two squares
      if (row == 6 && this.position[row - 2][col] == "--") {
        moves.push(new Move(row, col, row - 2, col, this.position));
      }
      // capturing to the left
      if (row - 1 >= 0 && col - 1 >= 0 && this.position[row - 1][col - 1][0] == "b") {
        moves.push(new Move(row, col, row - 1, col - 1, this.position));
      }
      // capturint to the right
      if (row - 1 >= 0 && col + 1 < 8 && this.position[row - 1][col + 1][0] == "b") {
        moves.push(new Move(row, col, row - 1, col + 1, this.position));
      }
      // if (enPassantSquare != null) {
      //   moves.push(new Move(row, col, enPassantSquare.row, enPassantSquare.col, position, enPassantSquare));
      // }
    }
    return moves;
  }

  getKnightMoves(row, col) {
    let moves = [];
    const directions = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (const direction of directions) {
      if (
        row + direction[0] >= 0 &&
        row + direction[0] < 8 &&
        col + direction[1] >= 0 &&
        col + direction[1] < 8 &&
        this.position[row + direction[0]][col + direction[1]][0] != this.turn
      ) {
        moves.push(new Move(row, col, row + direction[0], col + direction[1], this.position));
      }
    }
    return moves;
  }

  getRookMoves(row, col) {
    let moves = [];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 8; i++) {
        if (row + i * direction[0] >= 0 && row + i * direction[0] <= 7 && col + i * direction[1] >= 0 && col + i * direction[1] <= 7) {
          if (this.position[row + i * direction[0]][col + i * direction[1]] == "--") {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], this.position));
            continue;
          }
          if (this.position[row + i * direction[0]][col + i * direction[1]][0] != this.turn) {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], this.position));
            break;
          }
          if (this.position[row + i * direction[0]][col + i * direction[1]][0] == this.turn) {
            break;
          }
        }
      }
    }

    return moves;
  }

  getKingMoves(row, col) {
    let moves = [];
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const direction of directions) {
      if (
        row + direction[0] >= 0 &&
        row + direction[0] <= 7 &&
        col + direction[1] >= 0 &&
        col + direction[1] <= 7 &&
        this.position[row + direction[0]][col + direction[1]][0] != this.turn
      ) {
        moves.push(new Move(row, col, row + direction[0], col + direction[1], this.position));
      }
    }
    return moves;
  }

  getQueenMoves(row, col) {
    let moves = [];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 7; i++) {
        if (row + i * direction[0] >= 0 && row + i * direction[0] <= 7 && col + i * direction[1] >= 0 && col + i * direction[1] <= 7) {
          if (this.position[row + i * direction[0]][col + i * direction[1]] == "--") {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], this.position));
            continue;
          }
          if (this.position[row + i * direction[0]][col + i * direction[1]][0] != this.turn) {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], this.position));
            break;
          }
          if (this.position[row + i * direction[0]][col + i * direction[1]][0] == this.turn) {
            break;
          }
        }
      }
    }

    return moves;
  }

  getBishopMoves(row, col) {
    let moves = [];
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 7; i++) {
        if (row + i * direction[0] >= 0 && row + i * direction[0] <= 7 && col + i * direction[1] >= 0 && col + i * direction[1] <= 7) {
          if (this.position[row + i * direction[0]][col + i * direction[1]] == "--") {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], this.position));
            continue;
          }
          if (this.position[row + i * direction[0]][col + i * direction[1]][0] != this.turn) {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], this.position));
            break;
          }
          if (this.position[row + i * direction[0]][col + i * direction[1]][0] == this.turn) {
            break;
          }
        }
      }
    }

    return moves;
  }

  getAllMoves() {
    let allMoves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this.position[i][j];
        if (piece[0] == this.turn) {
          let pieceMoves = [];
          switch (piece[1]) {
            case "p":
              pieceMoves = this.getPawnMoves(i, j);
              break;
            case "r":
              pieceMoves = this.getRookMoves(i, j);
              break;
            case "b":
              pieceMoves = this.getBishopMoves(i, j);
              break;
            case "n":
              pieceMoves = this.getKnightMoves(i, j);
              break;
            case "q":
              pieceMoves = this.getQueenMoves(i, j);
              break;
            case "k":
              pieceMoves = this.getKingMoves(i, j);
              break;
          }
          for (let move of pieceMoves) {
            allMoves.push(move);
          }
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
    if (this.turn == "w") {
      return this.isSquareAttacked(this.whiteKingLocation[0], this.whiteKingLocation[1]);
    } else {
      return this.isSquareAttacked(this.blackKingLocation[0], this.blackKingLocation[1]);
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
      if (
        move.endRow == validMove.endRow &&
        move.endCol == validMove.endCol &&
        move.startRow == validMove.startRow &&
        move.startCol == validMove.startCol
      ) {
        return true;
      }
    }
    return false;
  }

  
}
