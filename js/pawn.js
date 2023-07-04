class Pawn extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.name = "pawn";
  }

  getLegalMoves(position) {
    let legalMoves = [];
    if (this.color == "black") {
      // moving one step down
      if (this.row < 7 && position[this.row + 1][this.col] == "") {
        legalMoves.push({ endingRow: this.row + 1, endingCol: this.col });
      }
      // moving two steps down
      if (this.row == 1 && position[this.row + 2][this.col] == "") {
        legalMoves.push({ endingRow: this.row + 2, endingCol: this.col });
      }
      // eating to the left
      if (
        this.row < 7 &&
        this.col >= 1 &&
        position[this.row + 1][this.col - 1] != "" &&
        position[this.row + 1][this.col - 1].color != this.color
      ) {
        legalMoves.push({ endingRow: this.row + 1, endingCol: this.col - 1 });
      }
      // eating to the right
      if (
        this.row < 7 &&
        this.col < 7 &&
        position[this.row + 1][this.col + 1] != "" &&
        position[this.row + 1][this.col + 1].color != this.color
      ) {
        legalMoves.push({ endingRow: this.row + 1, endingCol: this.col + 1 });
      }
    } else {
      // moving one stop up
      if (this.row >= 1 && position[this.row - 1][this.col] == "") {
        legalMoves.push({ endingRow: this.row - 1, endingCol: this.col });
      }
      // moving two steps up
      if (this.row == 6 && position[this.row - 2][this.col] == "") {
        legalMoves.push({ endingRow: this.row - 2, endingCol: this.col });
      }
      // eating to the left
      if (
        this.row >= 1 &&
        this.col >= 1 &&
        position[this.row - 1][this.col - 1] != "" &&
        position[this.row - 1][this.col - 1].color != this.color
      ) {
        legalMoves.push({ endingRow: this.row - 1, endingCol: this.col - 1 });
      }
      // eating to the right
      if (
        this.row >= 1 &&
        this.col < 7 &&
        position[this.row - 1][this.col + 1] != "" &&
        position[this.row - 1][this.col + 1].color != this.color
      ) {
        legalMoves.push({ endingRow: this.row - 1, endingCol: this.col + 1 });
      }
    }
    return legalMoves;
  }
}
