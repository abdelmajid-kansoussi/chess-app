class Move {
  constructor(startRow, startCol, endRow, endCol, position) {
    this.startRow = startRow;
    this.startCol = startCol;
    this.endRow = endRow;
    this.endCol = endCol;
    this.movedPiece = position[startRow][startCol];
    this.capturedPiece = position[endRow][endCol];
  }
}
