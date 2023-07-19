class Knight extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = `images/${color}-knight.png`;
  }

  getMoves(position, enPassantSquare = null) {
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
        row + direction[0] <= 7 &&
        col + direction[1] >= 0 &&
        col + direction[1] <= 7 &&
        position[row + direction[0]][col + direction[1]].color != color
      ) {
        moves.push(new Move(row, col, row + direction[0], col + direction[1], position));
      }
    }
    return moves;
  }
}
