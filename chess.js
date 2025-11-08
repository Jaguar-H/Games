// ======Global constants=====

const pwn = " ♟";
const pieces = [" ♜", " ♞", " ♝", " ♛", " ♚", " ♝", " ♞", " ♜", " ♟"];

//======UI helper ======

const black = (text) => "\x1B[1;38;5;0m" + text + "\x1B[0m";
const customBg = (text, code) => "\x1B[48;5;" + code + "m" + text + "\x1B[0m";
const tileColor = (row, col) => (row + col) % 2 === 0 ? 221 : 22;

//======Board Setup=====

function choosePiece(row, col) {
  switch (row) {
    case 0: return black(pieces[col]);
    case 1: return black(pwn);
    case 6: return pwn;
    case 7: return pieces[col];
    default: return "  ";
  }
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
let board = formBoard();

//===== Render=====

function renderBoard(board) {
  console.clear();
  console.log("\n\n\t\t    A B C D E F G H");
  board.forEach((row, i) => {
    const line = row.map((piece, j) => customBg(piece, tileColor(i, j))).join("");
    console.log(`\t\t ${8 - i} ${line} ${8 - i}`);
  });
  console.log("\t\t    A B C D E F G H");
}


//===== utility =====

const decodeMove = (pos) => {
  const chars = "ABCDEFGH";
  const y = chars.indexOf(pos[0].toUpperCase());
  const x = 8 - parseInt(pos[1]);
  return [x, y];
}

const isEmpty = from => board[from[0]][from[1]] === "  ";
const getPieceAt = (pos) => board[pos[0]][pos[1]];
const setPieceTo = (pos, piece) => (board[pos[0]][pos[1]] = piece);

//===== piece color function =====

const isWhite = target => pieces.includes(target);
const isBlack = target => !isWhite(target);

const isOpponent = (piece, target) => (isBlack(piece) && isWhite(target))
  || (isWhite(piece) && isBlack(target));

const getPieceType = (target) => {
  if (target.includes(" ♟")) return "pawn";
  if (target.includes(" ♜")) return "rook";
  return;
};

//===== pieces rules functions ======

//===Pawn Rules functions ====

const isInitialPosition = from => from[0] === 1 || from[0] === 6;
const isValidTile = (to, from) => isEmpty(to) && !isEmpty(from);
const isDiagonalMove = (yDiff, xDiff) => yDiff === 1 && xDiff === 1;

const isValidDiagonalMove = (piece, to) => {
  const target = getPieceAt(to);
  return !isEmpty(target) && isOpponent(piece, target);
}

const isInitialMove = (yDiff, xDiff, from) => yDiff === 2 && xDiff === 0
  && isInitialPosition(from);

const isSingleStepMove = (yDiff, xDiff, to, from) => yDiff === 1 && xDiff === 0
  && isValidTile(to, from);

const isKillingMove = (yDiff, xDiff, piece, to) =>
  isDiagonalMove(yDiff, xDiff) && isValidDiagonalMove(piece, to);

//=====Rook Rules functions ====

const isLinearPath = (from, to) => from[0] === to[0] || from[1] === to[1];
const isVerticalMove = (from, to) => from[1] === to[1];
const getStep = (from, to, axis) => (from[axis] < to[axis] ? 1 : -1);

const tracePath = (start, end, cord, direction, step) => {
  const cells = [];
  for (let pos = start + step; pos !== end; pos += step) {
    direction === 1 ? cells.push([pos, cord]) : cells.push([cord, pos]);
  }
  return cells;
}

const isVerticalPathClear = (from, to) => {
  const step = getStep(from, to, 0);
  const frontCells = tracePath(from[0], to[0], to[1], 1, step);
  return frontCells.every(isEmpty);
};

const isHorizontalPathClear = (from, to) => {
  const step = getStep(from, to, 1);
  const sideCells = tracePath(from[1], to[1], to[0], 0, step);
  return sideCells.every(isEmpty);
};

const isPathClear = (from, to) => {
  return isVerticalMove(from, to)
  ? isVerticalPathClear(from, to)
  : isHorizontalPathClear(from, to);
};


// ===== pieces rules =====

function pawnRules(from, to, piece) {
  const direction = isWhite(piece) ? 1 : -1;
  const xDiff = Math.abs(from[1] - to[1]);
  const yDiff = (from[0] - to[0]) * direction;

  return isInitialMove(yDiff, xDiff, from)
    || isSingleStepMove(yDiff, xDiff, to, from)
    || isKillingMove(yDiff, xDiff, piece, to);
}

function rookRules(from, to, piece) {
  const target = getPieceAt(to);
  return (
    isLinearPath(from, to) &&
    isPathClear(from, to) &&
    (isEmpty(to) || isOpponent(piece, target))
  );
}

//===== Getting And Validating Moves=====

function isValidMove(move, player) {
  const from = move[0];
  const to = move[1];
  const piece = getPieceAt(from);
  const type = getPieceType(piece);

  switch (type) {
    case "pawn":
      return pawnRules(from, to, piece);
    case "rook":
      return rookRules(from, to, piece);
    default:
      return false;
  }
}

function getUserMove(player) {
  while (true) {
    const from = decodeMove(prompt("From : ").toUpperCase());
    const to = decodeMove(prompt("To : ").toUpperCase());
    if (isValidMove([from, to], player)) {
      return [from, to];
    }
    renderBoard(board);
    console.log("\n\n\t\t Enter a valid move\n\n\t");
  }
}

//=====Move & Play=====


function moveUser(move) {
  const from = move[0];
  const to = move[1];
  const piece = getPieceAt(from);
  setPieceTo(to, piece);
  setPieceTo(from, "  ");
}

function changePlayer(player) {
  return player === 1 ? 2 : 1;
}

const playTurn = (player) => {
  renderBoard(board);
  const move = getUserMove();
  moveUser(move);
  return changePlayer(player);
};

function play() {
  let player = 1;
  while (true) {
    player = playTurn(player);
  }
}

play();
