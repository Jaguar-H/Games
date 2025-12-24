const colors = { 0: "🟥", 1: "🟩", 2: "⬜️" };
const board = [
  [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
  [2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
  [2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
  [2, 1, 1, 1, 2, 0, 0, 2, 2, 2, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0],
  [2, 1, 1, 2, 0, 0, 2, 1, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 0],
  [2, 1, 2, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 2, 1, 2, 0, 0, 0],
  [2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 2, 0, 0, 0],
  [2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 2, 0, 0, 0],
  [2, 1, 2, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 2, 1, 2, 0, 0, 0],
  [2, 1, 1, 2, 0, 0, 2, 1, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 0],
  [2, 1, 1, 1, 2, 0, 0, 2, 2, 2, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0],
  [2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
  [2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
];

function bg(char, colorCode) {
  return `\x1b[48;5;${colorCode}m${black(char)}\x1b[0m`;
}

function black(char) {
  return `\x1b[30m${char}\x1b[0m`;
}

function delay(sec) {
  let index = 0;
  while (index < 1250001643 * sec) {
    index++;
  }
}

const isWin = () => board.flatMap((x) => x).every((e) => board[0][0] === e);

const createCounter = (x = 0) => () => x++;

const renderPuzzel = () => {
  const count = createCounter();
  console.log("\t\t.   A B C D E F G H I J K L M N O P Q R S T");
  board.forEach((row) => {
    const line = row.map(
      (num) => colors[num],
    ).join("");

    console.log("\t\t", count().toString().padEnd(2), line);
  });
};

const isInBound = ([cy, cx]) =>
  cy >= 0 && cy < board.length && cx >= 0 && cx < board[0].length;

const isValidBlockToColor = (cy, cx, fromColor) =>
  isInBound([cy, cx]) && board[cy][cx] === fromColor;


const paint = ([y, x], newColor, fromColor) => {
  console.clear();
  renderPuzzel();
  delay(.01);

  if (fromColor === newColor) return;
  const [cy, cx] = [y, x];
  
  if (isValidBlockToColor(cy, cx, fromColor)) {
    board[cy][cx] = newColor;
    paint([cy + 1, cx], newColor, fromColor);
    paint([cy - 1, cx], newColor, fromColor);
    paint([cy, cx + 1], newColor, fromColor);
    paint([cy, cx - 1], newColor, fromColor);
  }
  return;
};

const moves = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
};

const decodeMove = (move) => {
  move = move.trim();
  const x = moves[move[0]];
  const y = parseInt(move.slice(1));
  return [y, x];
};

const getUserMove = () => {
  console.log("Enter the block Number you want to paint\n\n");
  const [y, x] = decodeMove(prompt("Enter the box you want to color : "));

  console.log("\n\n\n to paint the block use 0: 🟥, 1: 🟩, 2: ⬜️");
  const color = parseInt(prompt("Enter the color you want to paint : "));

  const fromColor = board[y][x];
  paint([y, x], color, fromColor);
  console.clear();
};

let lives = 4;

renderPuzzel();
while (!isWin() && lives !== 0) {
  console.log("\n\n\t\tthe remaining lives are : ", lives, "\n\n");

  getUserMove();
  console.clear();
  renderPuzzel();

  lives--;
}

console.log(isWin() ? "you Won................." : "You LOST ...............");
