class Queen extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.name = "queen"
  }

  getLegalMoves(position) {
    this.row = Number(this.row);
    this.col = Number(this.col);

    let legalMoves = [];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 7; i++) {
        if (
          this.row + i * direction[0] >= 0 &&
          this.row + i * direction[0] <= 7 &&
          this.col + i * direction[1] >= 0 &&
          this.col + i * direction[1] <= 7
        ) {
          if (
            position[this.row + i * direction[0]][
              this.col + i * direction[1]
            ] == ""
          ) {
            legalMoves.push({
              endingRow: this.row + i * direction[0],
              endingCol: this.col + i * direction[1],
            });
            continue;
          }
          if (
            position[this.row + i * direction[0]][this.col + i * direction[1]]
              .color != this.color
          ) {
            legalMoves.push({
              endingRow: this.row + i * direction[0],
              endingCol: this.col + i * direction[1],
            });
            break;
          }
          if (
            position[this.row + i * direction[0]][this.col + i * direction[1]]
              .color == this.color
          ) {
            break;
          }
        }
      }
    }

    return legalMoves;
  }
}
