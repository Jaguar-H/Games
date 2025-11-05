function black(text) {
  return "\x1B[1;38;5;0m" + text + "\x1B[0m";
}

const wp = " ♟";
const pieces = [" ♜", " ♞", " ♝", " ♛", " ♚", " ♝", " ♞", " ♜"];
const bp = black(" ♟");

function customBg(text, code) {
  return "\x1B[48;5;" + code + "m" + text + "\x1B[0m";
}

function choosePiece(row, col) {
  switch (row) {
    case 0: return black(pieces[col]);
    case 1: return bp;
    case 6: return wp;
    case 7: return pieces[col];
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
      line.push([piece]); 
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
      const piece = board[i][j][0];
      const color = tileColor(i,j);
      row += customBg(piece, color);
    }
    console.log("\t\t",8 - i, row, 8 - i);
  }
  console.log("\t\t    A B C D E F G H");
}

function decodeMove(pos) {
  const chars = "ABCDEFGH";
  const y = chars.indexOf(pos[0].toUpperCase());
  const x = 8 - parseInt(pos[1]);
  return [x, y];
}

function getUserMove() {
  const from = prompt("From : ");
  const to = prompt("To : ");
  return [from.toUpperCase(), to.toUpperCase()];
} 

function isValidMove(move,player){
  const from = decodeMove(move[0]);
  const to = decodeMove(move[1]);
  const pieceToMove = board[from[0]][from[1]];

  
}

function moveUser(move) {
  const from = decodeMove(move[0]);
  const to = decodeMove(move[1]);

  const piece = board[from[0]][from[1]][0];
  board[to[0]][to[1]][0] = piece;
  board[from[0]][from[1]][0] = "  ";
}

function play() {
  let player = 1;
  while (true) {
    renderBoard(board);
    const move = getUserMove();
    moveUser(move)
   }
}

let board = formBoard();
play();
