class Move {
  constructor(startRow, startCol, endRow, endCol, position, isEnPassant = false, isCastling = false) {
    this.startRow = startRow;
    this.startCol = startCol;
    this.endRow = endRow;
    this.endCol = endCol;
    this.movedPiece = position[startRow][startCol];
    this.capturedPiece = position[endRow][endCol];

    // En passant
    this.isEnPassant = isEnPassant;
    if (this.isEnPassant) {
      this.capturedPiece = this.movedPiece == "wp" ? "bp" : "wp";
    }

    // Promotion
    this.isPromotion = (this.movedPiece == "wp" && this.endRow == 0) || (this.movedPiece == "bp" && this.endRow == 7);

    // Castling
    this.isCastling = isCastling;
  }
}

