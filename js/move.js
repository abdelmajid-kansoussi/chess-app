class Move {
  constructor(startRow, startCol, endRow, endCol, position) {
    this.startRow = startRow;
    this.startCol = startCol;
    this.endRow = endRow;
    this.endCol = endCol;
    this.movedPiece = position[startRow][startCol];
    this.capturedPiece = position[endRow][endCol];
    this.movedPieceElement = document.querySelector(`[data-name="${this.startRow}-${this.startCol}"]`).firstChild || "";
    this.capturedPieceElement = document.querySelector(`[data-name="${this.endRow}-${this.endCol}"]`).firstChild || "";
    this.isPromotion = false;
    if (this.movedPiece instanceof Pawn && (this.endRow == 7 || this.endRow == 0)) this.isPromotion = true;
  }
}
