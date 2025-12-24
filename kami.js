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

function delay(sec) {
  let index = 0;
  while (index < 1250001643 * sec) {
    index++;
  }
}

const isWin = () => board.flatMap((x) => x).every((e) => board[0][0] === e);

const createCounter = (x = 0) => () => x++;

const renderPuzzel = (board) => {
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

const paint = ([y, x], newColor, board) => {
  const fromColor = board[y][x];

  if (fromColor === newColor) return;

  const toColor = [[y, x]];

  while (toColor.length > 0) {
    console.clear();
    renderPuzzel(board);
    delay(.03);

    const [cy, cx] = toColor.shift();

    if (isValidBlockToColor(cy, cx, fromColor)) {
      board[cy][cx] = newColor;

      const neighbors = [
        [cy + 1, cx],
        [cy - 1, cx],
        [cy, cx + 1],
        [cy, cx - 1],
      ].filter(([ny, nx]) => isValidBlockToColor(ny, nx, fromColor));

      toColor.push(...neighbors);
    }
  }
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
  const block = decodeMove(prompt("Enter the box you want to color : "));

  console.log("\n\n\n to paint the block use 0: 🟥, 1: 🟩, 2: ⬜️");
  const color = parseInt(prompt("Enter the color you want to paint : "));

  return [block, color];
};
let lives = 4;

renderPuzzel();

while (!isWin() && lives !== 0) {
  console.log("\n\n\t\tthe remaining lives are : ", lives, "\n\n");

  const move = getUserMove();
  paint(move[0], move[1], board);
  console.clear();
  renderPuzzel();

  lives--;
}

console.log(isWin() ? "you Won................." : "You LOST ...............");
