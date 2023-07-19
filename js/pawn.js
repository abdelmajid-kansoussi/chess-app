class Pawn extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = `images/${color}-pawn.png`;
  }

  getMoves(position, enPassantSquare = null) {
    let moves = [];
    if (color == "black") {
      // moving one step down
      if (row < 7 && position[row + 1][col] == "") {
        moves.push(new Move(row, col, row + 1, col, position));
      }
      // moving two steps down
      if (row == 1 && position[row + 2][col] == "") {
        moves.push(new Move(row, col, row + 2, col, position));
      }
      // capturing to the left
      if (row < 7 && col >= 1 && position[row + 1][col - 1] != "" && position[row + 1][col - 1].color != color) {
        moves.push(new Move(row, col, row + 1, col - 1, position));
      }
      // capturing to the right
      if (row < 7 && col < 7 && position[row + 1][col + 1] != "" && position[row + 1][col + 1].color != color) {
        moves.push(new Move(row, col, row + 1, col + 1, position));
      }
      // En passant
      if (enPassantSquare != null) {
        moves.push(new Move(row, col, enPassantSquare.row, enPassantSquare.col, position, enPassantSquare));
      }
    } else {
      // moving one step up
      if (row >= 1 && position[row - 1][col] == "") {
        moves.push(new Move(row, col, row - 1, col, position));
      }
      // moving two steps up
      if (row == 6 && position[row - 2][col] == "") {
        moves.push(new Move(row, col, row - 2, col, position));
      }
      // capturing to the left
      if (row >= 1 && col >= 1 && position[row - 1][col - 1] != "" && position[row - 1][col - 1].color != color) {
        moves.push(new Move(row, col, row - 1, col - 1, position));
      }
      // capturint to the right
      if (row >= 1 && col < 7 && position[row - 1][col + 1] != "" && position[row - 1][col + 1].color != color) {
        moves.push(new Move(row, col, row - 1, col + 1, position));
      }
      if (enPassantSquare != null) {
        moves.push(new Move(row, col, enPassantSquare.row, enPassantSquare.col, position, enPassantSquare));
      }
    }
    return moves;
  }
}
