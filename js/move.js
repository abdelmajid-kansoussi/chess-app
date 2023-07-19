class Move {
  constructor(startRow, startCol, endRow, endCol, position) {
    this.startRow = startRow;
    this.startCol = startCol;
    this.endRow = endRow;
    this.endCol = endCol;
    this.movedPiece = position[startRow][startCol];
    this.capturedPiece = position[endRow][endCol];

    //   this.isPromotion = false;
    //   if (this.movedPiece instanceof Pawn && (this.endRow == 7 || this.endRow == 0)) {
    //     this.isPromotion = true;
    //   }

    //   this.isEnPassant = false;
    //   if (
    //     enPassantSquare != null &&
    //     this.movedPiece instanceof Pawn &&
    //     enPassantSquare.row == this.startRow &&
    //     enPassantSquare.col == this.endCol
    //   ) {
    //     this.isEnPassant = true;
    //     if (this.movedPiece.color == "white") this.capturedPiece = this.position[enPassantSquare.row + 1][enPassantSquare.col];
    //     else this.capturedPiece = this.position[enPassantSquare.row - 1][enPassantSquare.col];
    //   }
  }
}
