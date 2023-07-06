class Knight extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = `images/${this.color}-knight.png`;
  }

  getMoves(position) {
    this.row = Number(this.row);
    this.col = Number(this.col);

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
        this.row + direction[0] >= 0 &&
        this.row + direction[0] <= 7 &&
        this.col + direction[1] >= 0 &&
        this.col + direction[1] <= 7 &&
        position[this.row + direction[0]][this.col + direction[1]].color !=
          this.color
      ) {
        moves.push(
          new Move(
            this.row,
            this.col,
            this.row + direction[0],
            this.col + direction[1]
          )
        );
      }
    }
    return moves;
  }
}
