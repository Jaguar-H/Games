// ====== Global constants ======
const pawn = " ♟";
const pieces = [" ♜", " ♞", " ♝", " ♛", " ♚", " ♝", " ♞", " ♜", " ♟"];

// ====== UI helper ======
const black = (text) => "\x1B[1;38;5;0m" + text + "\x1B[0m";
const customBg = (text, code) => "\x1B[48;5;" + code + "m" + text + "\x1B[0m";
const tileColor = (row, col) => (row + col) % 2 === 0 ? 221 : 22;

// ====== Board Setup ======
function choosePiece(row, col) {
  switch (row) {
    case 0: return black(pieces[col]);
    case 1: return black(pawn);
    case 6: return pawn;
    case 7: return pieces[col];
    default: return " ";
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

// ====== Render Board ======
function renderBoard(board) {
  console.clear();
  console.log("\n\n\t\t    A B C D E F G H");

  board.forEach((row, yAxis) => {
    const line = row
      .map((piece, xAxis) => customBg(piece, tileColor(yAxis, xAxis)))
      .join("");

    console.log(`\t\t ${8 - yAxis} ${line} ${8 - yAxis}`);
  });

  console.log("\t\t    A B C D E F G H");
}

// ====== Utility ======
const decodeMove = (pos) => {
  const chars = "ABCDEFGH";
  const y = chars.indexOf(pos[0].toUpperCase());
  const x = 8 - parseInt(pos[1]);
  return [x, y];
};

const isEmpty = (from) => board[from[0]][from[1]] === " ";
const getPieceAt = (pos) => board[pos[0]][pos[1]];
const setPieceTo = (pos, piece) => (board[pos[0]][pos[1]] = piece);
const isWhite = (target) => pieces.includes(target);
const isBlack = (target) => !isWhite(target);

// ====== Common function for rules ======
const isDiagonalMove = (from, to) => {
  return from[0] - to[0] !== 0 && from[1] - to[1] !== 0;
};

const isOpponent = (piece, target) =>
  (isBlack(piece) && isWhite(target)) || (isWhite(piece) && isBlack(target));

const canLandOn = (from, to) => {
  const piece = getPieceAt(from);
  const target = getPieceAt(to);
  return isEmpty(to) || isOpponent(piece, target);
};

const getStep = (from, to, axis) => (from[axis] < to[axis] ? 1 : -1);

const tracePath = (start, end, cord, direction, step, inc = 0) => {
  const cells = [];
  for (let pos = start + step; pos !== end; pos += step) {
    cord += inc;
    direction === 1 ? cells.push([pos, cord]) : cells.push([cord, pos]);
    console.log(cells);
  }
  return cells;
};

// ====== Functions for Pawn Rules ======
const wasInitialPosition = (from) => from[0] === 1 || from[0] === 6;

const isValidDiagonalMove = (piece, to) => {
  const target = getPieceAt(to);
  return !isEmpty(to) && isOpponent(piece, target);
};

const isInitialMove = (yDiff, xDiff, from, to) =>
  wasInitialPosition(from) && yDiff === 2 && xDiff === 0 && isEmpty(to);

const isSingleStepMove = (yDiff, xDiff, to) =>
  yDiff === 1 && xDiff === 0 && isEmpty(to);

const isKillingMove = (piece, to, from) =>
  isDiagonalMove(from, to) && isValidDiagonalMove(piece, to);

// ====== Functions for Rook Rules ======
const isLinearPath = (from, to) => from[0] === to[0] || from[1] === to[1];
const isVerticalMove = (from, to) => from[1] === to[1];

const isVerticalPathClear = (from, to) => {
  const step = getStep(from, to, 0);
  const verticalCells = tracePath(from[0], to[0], to[1], 1, step);
  return verticalCells.every(isEmpty);
};

const isHorizontalPathClear = (from, to) => {
  const step = getStep(from, to, 1);
  const horizontalCells = tracePath(from[1], to[1], to[0], 0, step);
  return horizontalCells.every(isEmpty);
};

const isPathClear = (from, to) => {
  return isVerticalMove(from, to)
    ? isVerticalPathClear(from, to)
    : isHorizontalPathClear(from, to);
};

// ====== Function for Bishop Rules ======
const isDiagonalPathClear = (from, to) => {
  const yStep = getStep(from, to, 0);
  const xStep = getStep(from, to, 1);
  const diagonalCells = tracePath(from[0], to[0], to[0], 1, yStep, xStep);
  return diagonalCells.every(isEmpty);
};

// ====== Pawn Rules ======
function pawnRules(from, to) {
  const piece = getPieceAt(from);
  const direction = isWhite(piece) ? 1 : -1;
  const xDiff = Math.abs(from[1] - to[1]);
  const yDiff = (from[0] - to[0]) * direction;

  return (
    isInitialMove(yDiff, xDiff, from, to) ||
    isSingleStepMove(yDiff, xDiff, to) ||
    isKillingMove(piece, to, from)
  );
}

// ====== Rook Rules ======
function rookRules(from, to) {
  return isLinearPath(from, to) && isPathClear(from, to) && canLandOn(from, to);
}

// ====== Bishop Rules ======
const bishopRules = (from, to) => {
  return isDiagonalMove(from, to) && isDiagonalPathClear(from, to) && canLandOn(from, to);
};

// ====== Knight Rules ======
const knightRules = (from, to) => canLandOn(from, to);

// ====== Queen Rules ======
const queenRules = (from, to) => bishopRules(from, to) || rookRules(from, to);

// ====== Getting and Validating Moves ======
const getPieceType = (target) => {
  if (target.includes(" ♟")) return pawnRules;
  if (target.includes(" ♜")) return rookRules;
  if (target.includes(" ♝")) return bishopRules;
  if (target.includes(" ♞")) return knightRules;
  if (target.includes(" ♛")) return queenRules;
  return;
};

const isPlayersTurn = (pieceColor, player) => pieceColor === player;

function isValidMove(move, player) {
  const from = move[0];
  const to = move[1];
  const piece = getPieceAt(from);
  const pieceColor = isWhite(piece) ? "white" : "black";
  const rules = getPieceType(piece);
  return isPlayersTurn(pieceColor, player) ? rules(from, to) : false;
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

// ====== Move & Play ======
function moveUser(move) {
  const from = move[0];
  const to = move[1];
  const piece = getPieceAt(from);
  setPieceTo(to, piece);
  setPieceTo(from, " ");
}

function changePlayer(player) {
  return player === "white" ? "black" : "white";
}

const playTurn = (player) => {
  renderBoard(board);
  const move = getUserMove();
  moveUser(move);
  return changePlayer(player);
};

function play() {
  let player = "white";
  while (true) {
    player = playTurn(player);
  }
}

play();
