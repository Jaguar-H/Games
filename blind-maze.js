const WL = "🟫";
const PL = "🐭";
const ES = "  ";
const TR = "🧨"

function printMaze(blindMaze) {
  for (let index = 0; index < blindMaze.length; index++) {
    console.log(blindMaze[index].join(""));
  }
}

function isItValid(movement, pos, mazeArray) {
  switch (movement) {
    case "w":
      return mazeArray[pos[0] - 1][pos[1]] !== WL;
    case "s":
      return mazeArray[pos[0] + 1][pos[1]] !== WL;
    case "d":
      return mazeArray[pos[0]][pos[1] + 1] !== WL;
    case "a":
      return mazeArray[pos[0]][pos[1] - 1] !== WL;
  }
  return false;
}

function revealArea(mazeArray, blindMaze, pos) {
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  const Y = pos[0];
  const X = pos[1];

  for (let index = 0; index < directions.length; index++) {
    const newY = Y + directions[index][0];
    const newX = X + directions[index][1];
    blindMaze[newY][newX] = mazeArray[newY][newX];
  }

  return blindMaze;
}

function moveUser(movement, pos, mazeArray, blindMaze) {
  if (isItValid(movement, pos, mazeArray)) {
    blindMaze[pos[0]][pos[1]] = ES;

    if (movement === "w") { pos[0] = pos[0] - 1; }
    if (movement === "s") { pos[0] = pos[0] + 1; }
    if (movement === "d") { pos[1] = pos[1] + 1; }
    if (movement === "a") { pos[1] = pos[1] - 1; }
  }

  blindMaze[pos[0]][pos[1]] = PL

  if (mazeArray[pos[0]][pos[1]] === TR) {
    console.clear();
    printMaze(blindMaze);
    console.log("💥 BOOM! You hit a trap. Game Over.");
    return "BOOM";
  }

  if (mazeArray[pos[0][1]] === "🧀") {
      console.clear();
      printMaze(blindMaze);
      console.log("you won !!!!! you number of move are :", moveCount);
      return "WIN";
    }

  return pos;
}

function getRandomPosition(mazeArray) {
  const pos1 = Math.floor(Math.random() * 13) + 1;
  const pos2 = Math.floor(Math.random() * 17) + 1;

  if (mazeArray[pos1][pos2] === WL) {
    return getRandomPosition(mazeArray);
  }
  mazeArray[pos1][pos2] = TR
  return;
}

function plantBomb(mazeArray) {
  let bombs = 5;
  while (bombs > 0) {
    getRandomPosition(mazeArray);
    bombs--;
  }
  return mazeArray;
}

function getUserData(mazeArray, blindMaze, pos, moveCount) {
  console.clear();
  blindMaze = revealArea(mazeArray, blindMaze, pos);
  printMaze(blindMaze);
  console.log("\tNumber of moves played : ", moveCount);
  console.log("\n\t w = 👆\ts = 👇\t a = 👈\t d = 👉\n");
  return prompt("\tenter where to move : ");
}

function startGame(mazeArray, blindMaze) {
  let currentPos = [16, 1]
  let moveCount = 0;
  mazeArray = plantBomb(mazeArray);
  while (true) {
    const userMovement = getUserData(mazeArray, blindMaze, currentPos, moveCount);
    currentPos = moveUser(userMovement, currentPos, mazeArray, blindMaze);
    moveCount++

    if (currentPos === "BOOM") { return; }
    if (currentPos === "WIN") { return; }

  }
}

function main() {
  let mazeArrays = [[
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
    [WL, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL],
    [WL, ES, WL, WL, WL, ES, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL],
    [WL, ES, WL, ES, ES, ES, ES, ES, ES, WL, ES, WL, ES, ES, ES, WL, ES, WL],
    [WL, ES, WL, ES, WL, WL, WL, WL, ES, WL, ES, WL, ES, WL, ES, WL, ES, WL],
    [WL, ES, WL, ES, ES, ES, ES, ES, ES, WL, ES, ES, WL, WL, ES, WL, ES, WL],
    [WL, ES, WL, WL, WL, ES, WL, WL, WL, WL, WL, ES, WL, WL, ES, WL, ES, WL],
    [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, WL, ES, WL],
    [WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, WL],
    [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, WL],
    [WL, ES, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, WL, ES, WL, WL, ES, WL],
    [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, WL, ES, WL],
    [WL, ES, WL, ES, WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, WL, WL, ES, WL],
    [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, WL, WL, ES, WL],
    [WL, WL, ES, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, ES, ES, WL, ES, WL],
    [WL, WL, ES, ES, ES, ES, ES, ES, WL, ES, WL, WL, WL, WL, ES, WL, WL, WL],
    [WL, "🏁", ES, WL, WL, ES, WL, ES, ES, ES, ES, ES, WL, WL, ES, ES, ES, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, "🧀", WL]
  ],
  [
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
    [WL, ES, WL, WL, ES, WL, ES, WL, ES, ES, ES, WL, ES, WL, ES, ES, "🧀", WL],
    [WL, ES, ES, ES, ES, WL, ES, ES, WL, WL, ES, WL, ES, WL, ES, WL, WL, WL],
    [WL, WL, WL, WL, ES, WL, WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, WL],
    [WL, ES, ES, ES, ES, ES, ES, ES, WL, ES, WL, WL, WL, WL, WL, WL, ES, WL],
    [WL, ES, WL, WL, WL, WL, WL, WL, WL, ES, ES, ES, ES, ES, ES, ES, ES, WL],
    [WL, ES, ES, ES, ES, ES, ES, WL, ES, ES, WL, WL, WL, WL, WL, WL, WL, WL],
    [WL, WL, WL, WL, WL, ES, WL, WL, WL, WL, WL, ES, ES, ES, ES, ES, ES, WL],
    [WL, ES, ES, ES, WL, ES, ES, ES, ES, ES, ES, ES, WL, WL, WL, WL, ES, WL],
    [WL, ES, WL, ES, WL, WL, WL, WL, WL, ES, WL, WL, WL, ES, ES, ES, ES, WL],
    [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, WL, WL, WL, WL],
    [WL, ES, WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, WL, ES, ES, ES, ES, WL],
    [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, WL, WL, ES, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, WL, WL, ES, WL, WL],
    [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL],
    [WL, ES, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, WL],
    [WL, "🏁", ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL]
  ],
  [[WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
  [WL, ES, WL, ES, WL, WL, WL, ES, ES, ES, WL, WL, WL, ES, ES, ES, "🧀", WL],
  [WL, ES, ES, ES, ES, ES, WL, ES, WL, ES, ES, WL, ES, ES, WL, ES, WL, WL],
  [WL, WL, WL, WL, WL, ES, WL, ES, WL, ES, WL, WL, ES, WL, WL, ES, ES, WL],
  [WL, ES, ES, ES, WL, ES, ES, ES, WL, ES, WL, ES, ES, ES, ES, ES, WL, WL],
  [WL, ES, WL, ES, WL, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, ES, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, WL, ES, WL],
  [WL, ES, WL, WL, WL, WL, WL, ES, WL, WL, WL, WL, WL, ES, WL, ES, ES, WL],
  [WL, ES, ES, ES, WL, ES, WL, ES, ES, ES, WL, ES, WL, ES, WL, ES, WL, WL],
  [WL, WL, WL, ES, WL, ES, WL, WL, WL, ES, WL, ES, WL, ES, WL, ES, ES, WL],
  [WL, ES, ES, ES, WL, ES, ES, ES, ES, ES, WL, ES, WL, ES, ES, ES, WL, WL],
  [WL, ES, WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, ES, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, WL, WL],
  [WL, ES, WL, ES, WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, WL, ES, ES, WL],
  [WL, ES, ES, ES, WL, ES, ES, ES, WL, ES, ES, ES, WL, ES, ES, ES, WL, WL],
  [WL, ES, WL, WL, WL, ES, WL, ES, WL, ES, WL, ES, WL, WL, WL, WL, WL, WL],
  [WL, "🏁", ES, ES, ES, ES, WL, ES, WL, ES, WL, ES, ES, ES, ES, ES, ES, WL],
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL]]];

  let blindMaze = [
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, PL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES],
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES]
  ]
  startGame(mazeArrays[Math.floor(Math.random() * 3)], blindMaze);

  const playAgain = confirm("do you want to play agin :");
  if (playAgain) {
    return main()
  }

}

main()


