// ======Global constants=====

const pawn = " ♟";
const EMPTY = "  ";
const pieces = [" ♜", " ♞", " ♝", " ♛", " ♚", " ♝", " ♞", " ♜", " ♟"];

//======UI helper ======

const black = (text) => "\x1B[1;38;5;0m" + text + "\x1B[0m";
const customBg = (text, code) => "\x1B[48;5;" + code + "m" + text + "\x1B[0m";
const tileColor = (row, col) => (row + col) % 2 === 0 ? 221 : 22;

//======Board Setup=====

function choosePiece(row, col) {
  switch (row) {
    case 0:
      return black(pieces[col]);
    case 1:
      return black(pawn);
    case 6:
      return pawn;
    case 7:
      return pieces[col];
    default:
      return EMPTY;
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

  board.forEach((row, yAxis) => {
    const line = row.map(
      (piece, xAxis) => customBg(piece, tileColor(yAxis, xAxis)),
    ).join("");

    console.log(`\t\t ${8 - yAxis} ${line} ${8 - yAxis}`);
  });

  console.log("\t\t    A B C D E F G H");
}

//===== utility =====

const decodeMove = (pos) => {
  const chars = "ABCDEFGH";
  const y = chars.indexOf(pos[0].toUpperCase());
  const x = 8 - parseInt(pos[1]);
  return [x, y];
};

const getPieceAt = ([y, x]) => board[y][x];

const setPieceTo = (pos, piece) => (board[pos[0]][pos[1]] = piece);

const isEmpty = (from) => getPieceAt(from) === EMPTY;

const isWhite = (target) => pieces.includes(target);

const isBlack = (target) => !isWhite(target);

const isDiagonalMove = (from, to) => {
  return Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1]);
};

const isOpponent = (piece, target) =>
  (isBlack(piece) && isWhite(target)) ||
  (isWhite(piece) && isBlack(target));

const canLandOn = (from, to) => {
  const piece = getPieceAt(from);
  const target = getPieceAt(to);
  return isEmpty(to) || isOpponent(piece, target);
};

const getStep = (pos1, pos2) => (pos1 < pos2 ? 1 : -1);
const stepToAdd = (pos1, pos2, step) => pos1 === pos2 ? 0 : step;

const isPathClear = (from, to) => {
  const pathCells = from[0] === to[0]
    ? traceHorizontal(from, to)
    : traceVertical(from, to);
  return pathCells.every(isEmpty);
};

const wasInitialPosition = (from) => from[0] === 1 || from[0] === 6;

const isValidDiagonalMove = (piece, to) => {
  const target = getPieceAt(to);
  return !isEmpty(to) && isOpponent(piece, target);
};

const isInitialMove = (yDiff, xDiff, from, to) =>
  wasInitialPosition(from) &&
  yDiff === 2 && xDiff === 0 && isEmpty(to);

const isSingleStepMove = (yDiff, xDiff, to) =>
  yDiff === 1 && xDiff === 0 &&
  isEmpty(to);

const isKillingMove = (piece, to, from) =>
  isDiagonalMove(from, to) && isValidDiagonalMove(piece, to);

const isLinearPath = (from, to) => from[0] === to[0] || from[1] === to[1];

const traceVertical = (from, to) => {
  const [fy, fx] = from;
  const [ty, tx] = to;
  const cells = [];
  const step = (ty - fy) / Math.abs(ty - fy);

  for (let y = fy + step; y !== ty; y += step) {
    cells.push([y, fx]);
  }

  return cells;
};

function traceHorizontal(from, to) {
  const [fy, fx] = from;
  const [ty, tx] = to;
  const cells = [];

  const step = (tx - fx) / Math.abs(tx - fx);

  for (let x = fx + step; x !== tx; x += step) {
    cells.push([fy, x]);
  }

  return cells;
}

function traceDiagonal(from, to) {
  const [fy, fx] = from;
  const [ty, tx] = to;

  const cells = [];
  const yStep = fy < ty ? 1 : -1;
  const xStep = fx < tx ? 1 : -1;

  let y = fy + yStep;
  let x = fx + xStep;

  while (y !== ty && x !== tx) {
    cells.push([y, x]);
    y += yStep;
    x += xStep;
  }

  return cells;
}

const isLShapedMove = ([fy, fx], [ty, tx]) =>
  Math.abs(fy - ty) === 2 && Math.abs(fx - tx) === 1;

function isOneStep(from, to) {
  const dy = Math.abs(from[0] - to[0]);
  const dx = Math.abs(from[1] - to[1]);

  return (dy <= 1 && dx <= 1) && !(dy === 0 && dx === 0);
}


function pawnRules(from, to) {
  const piece = getPieceAt(from);
  const direction = isWhite(piece) ? 1 : -1;
  const xDiff = Math.abs(from[1] - to[1]);
  const yDiff = (from[0] - to[0]) * direction;

  return (isInitialMove(yDiff, xDiff, from, to) ||
    isSingleStepMove(yDiff, xDiff, to) ||
    isKillingMove(piece, to, from));
}

const rookRules = (from, to) =>
  isLinearPath(from, to) &&
  isPathClear(from, to) &&
  canLandOn(from, to);

const bishopRules = (from, to) =>
  isDiagonalMove(from, to) &&
  traceDiagonal(from, to).every(isEmpty) &&
  canLandOn(from, to);

const knightRules = (from, to) =>
  isLShapedMove(from, to) &&
  canLandOn(from, to);

const queenRules = (from, to) =>
  bishopRules(from, to) ||
  rookRules(from, to);

const kingRules =(from,to) =>
  isOneStep(from,to) && canLandOn(from, to);



//===== Getting And Validating Moves=====

const getPieceRules = (target) => {

  if (target.includes("♟")) return pawnRules;
  if (target.includes("♜")) return rookRules;
  if (target.includes("♝")) return bishopRules;
  if (target.includes("♞")) return knightRules;
  if (target.includes("♛")) return queenRules;
  if (target.includes("♚")) return kingRules;

  return undefined;
};

const isPlayersTurn = (piece, player) =>
  (isWhite(piece) ? "white" : "black") === player;

function isValidMove(from, to, player) {
  const piece = getPieceAt(from);
  const rules = getPieceRules(piece);

  return isPlayersTurn(piece, player) ? rules(from, to) : false;
}

function getUserMove(player) {
  while (true) {
    const from = decodeMove(prompt("From : ").toUpperCase());
    const to = decodeMove(prompt("To : ").toUpperCase());

    if (isValidMove(from, to, player)) {
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
  return player === "white" ? "black" : "white";
}

const playTurn = (player) => {
  renderBoard(board);
  const move = getUserMove(player);
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
