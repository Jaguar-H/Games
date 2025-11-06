const pwn = " ♟";
const peices = [" ♜", " ♞", " ♝", " ♛", " ♚", " ♝", " ♞", " ♜", " ♟"];

function black(text) {
  return "\x1B[1;38;5;0m" + text + "\x1B[0m";
}

function customBg(text, code) {
  return "\x1B[48;5;" + code + "m" + text + "\x1B[0m";
}

function choosePiece(row, col) {
  switch (row) {
    case 0: return black(peices[col]);
    case 1: return black(pwn);
    case 6: return pwn;
    case 7: return peices[col];
    default: return "  ";
  }
}

function tileColor(row, col) {
  return (row + col) % 2 === 0 ? 221 : 22;
}

function formBoard() {
  const board = [];
  for (let row = 0; row < 8; row++) {
    const line = [];
    for (let col = 0; col < 8; col++) {
      const piece = choosePiece(row, col);
      line.push(piece);
    }
    board.push(line);
  }
  return board;
}

function renderBoard(board) {
  console.clear();
  console.log("\n\n\t\t    A B C D E F G H");
  for (let i = 0; i < 8; i++) {
    let row = "";
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      const color = tileColor(i, j);
      row += customBg(piece, color);
    }
    console.log("\t\t", 8 - i, row, 8 - i);
  }
  console.log("\t\t    A B C D E F G H");
}

function decodeMove(pos) {
  const chars = "ABCDEFGH";
  const y = chars.indexOf(pos[0].toUpperCase());
  const x = 8 - parseInt(pos[1]);
  return [x, y];
}

function isOnInitialPosition(from) {
  return from[0] === 1 || from[0] === 6;
}

function isEmpty(from) {
  return board[from[0]][from[1]] === "  ";
}

function isValidTile(to, from) {
  return isEmpty(to) && !isEmpty(from);
}

function isDiagonalMove(yDiff, xDiff) {
  return yDiff === 1 && xDiff === 1;
}

function isWhite(target) {
  return peices.includes(target);
}

function isBlack(target) {
  return !isWhite(target);
}


function isOpponent(peice, target) {
  return isBlack(peice) && isWhite(target) || isWhite(peice) && isBlack(target);
}

function isValidDiagonalMove(peice, to) {
  const target = board[to[0]][to[1]];

  return target !== "  " && isOpponent(peice, target)
}

function isInitialMove(yDiff, xDiff, from) {
  return yDiff === 2 && xDiff === 0 && isOnInitialPosition(from);
}

function isSingleStepMove(yDiff, xDiff, to, from) {
  return yDiff === 1 && xDiff === 0 && isValidTile(to, from);
}

function isKillingMove(yDiff, xDiff, peice, to) {
  return isDiagonalMove(yDiff, xDiff) && isValidDiagonalMove(peice, to);
}

function pawnRules(from, to, peice) {
  const direction = isWhite(peice) ? 1 : -1
  const xDiff = Math.abs(from[1] - to[1]);
  const yDiff = (from[0] - to[0]) * direction;

  let isValid = isInitialMove(yDiff, xDiff, from) || isSingleStepMove(yDiff, xDiff, to, from);

  return isValid || isKillingMove(yDiff, xDiff, peice, to);

}

function islinearPath(from, to) {
  return from[0] === to[0] || from[1] === to[1]
}

function isPathClear(from, to) {
  const [x1, y1] = from;
  const [x2, y2] = to;

  if (x1 === x2) {
    const step = y2 > y1 ? 1 : -1;
    for (let y = y1 + step; y !== y2; y += step) {
      if (board[x1][y] !== "  ") return false;
    }
    return true;
  }


  const step = x2 > x1 ? 1 : -1;
  for (let x = x1 + step; x !== x2; x += step) {
    if (board[x][y1] !== "  ") {
      return false;
    }
  }


  return true;
}


function rookRules(from, to, peice) {
  return islinearPath(from, to) && isPathClear(from, to) && (isEmpty(to) || isOpponent(peice, target));
}


function isValidMove(move, player) {

  console.log(move, "inside is Valid");
  const from = move[0];
  const to = move[1];
  const target = board[from[0]][from[1]];
  console.log(target, from, to);


  if (target.includes(" ♟")) { return pawnRules(from, to, target); }
  if (target.includes(" ♜")) { return rookRules(from, to, target) }

}

function getUserMove(player) {
  while (true) {
    const from = decodeMove(prompt("From : ").toUpperCase());
    const to = decodeMove(prompt("To : ").toUpperCase());
    if (isValidMove([from, to], player)) {
      return [from, to];
    }
    console.log("\n\n\t\t Enter A valid Move\n\n\t");

  }
}

function moveUser(move) {
  const from = move[0];
  const to = move[1];

  const piece = board[from[0]][from[1]];
  board[to[0]][to[1]] = piece;
  board[from[0]][from[1]] = "  ";
}

function changePlayer(player) {
  return player === 1 ? 2 : 1;
}

function play() {
  let player = 1;
  while (true) {
    renderBoard(board);
    const move = getUserMove();
    moveUser(move);
    player = changePlayer(player);
  }
}

let board = formBoard();
play();
