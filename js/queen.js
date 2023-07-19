class Queen extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = `images/${color}-queen.png`;
  }

  getMoves(position, enPassantSquare = null) {
    let moves = [];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 7; i++) {
        if (row + i * direction[0] >= 0 && row + i * direction[0] <= 7 && col + i * direction[1] >= 0 && col + i * direction[1] <= 7) {
          if (position[row + i * direction[0]][col + i * direction[1]] == "") {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], position));
            continue;
          }
          if (position[row + i * direction[0]][col + i * direction[1]].color != color) {
            moves.push(new Move(row, col, row + i * direction[0], col + i * direction[1], position));
            break;
          }
          if (position[row + i * direction[0]][col + i * direction[1]].color == color) {
            break;
          }
        }
      }
    }

    return moves;
  }
}
