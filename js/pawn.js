class Pawn extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = `images/${this.color}-pawn.png`;
  }

  getMoves(position) {
    let moves = [];
    if (this.color == "black") {
      // moving one step down
      if (this.row < 7 && position[this.row + 1][this.col] == "") {
        moves.push(new Move(this.row, this.col, this.row + 1, this.col));
      }
      // moving two steps down
      if (this.row == 1 && position[this.row + 2][this.col] == "") {
        moves.push(new Move(this.row, this.col, this.row + 2, this.col));
      }
      // capturing to the left
      if (
        this.row < 7 &&
        this.col >= 1 &&
        position[this.row + 1][this.col - 1] != "" &&
        position[this.row + 1][this.col - 1].color != this.color
      ) {
        moves.push(new Move(this.row, this.col, this.row + 1, this.col - 1));
      }
      // capturing to the right
      if (
        this.row < 7 &&
        this.col < 7 &&
        position[this.row + 1][this.col + 1] != "" &&
        position[this.row + 1][this.col + 1].color != this.color
      ) {
        moves.push(new Move(this.row, this.col, this.row + 1, this.col + 1));
      }
    } else {
      // moving one step up
      if (this.row >= 1 && position[this.row - 1][this.col] == "") {
        moves.push(new Move(this.row, this.col, this.row - 1, this.col));
      }
      // moving two steps up
      if (this.row == 6 && position[this.row - 2][this.col] == "") {
        moves.push(new Move(this.row, this.col, this.row - 2, this.col));
      }
      // capturing to the left
      if (
        this.row >= 1 &&
        this.col >= 1 &&
        position[this.row - 1][this.col - 1] != "" &&
        position[this.row - 1][this.col - 1].color != this.color
      ) {
        moves.push(new Move(this.row, this.col, this.row - 1, this.col - 1));
      }
      // capturint to the right
      if (
        this.row >= 1 &&
        this.col < 7 &&
        position[this.row - 1][this.col + 1] != "" &&
        position[this.row - 1][this.col + 1].color != this.color
      ) {
        moves.push(new Move(this.row, this.col, this.row - 1, this.col + 1));
      }
    }
    return moves;
  }
}
