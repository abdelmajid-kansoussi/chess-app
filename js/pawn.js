class Pawn extends Piece {
    constructor(row, col, color) {
      super(row, col, color);
      this.name = "pawn"
    }
  
    getLegalMoves() {}
  }
  