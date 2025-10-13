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

function hideArea(blindMaze,pos){
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  const Y = pos[0];
  const X = pos[1];

  for (let index = 0; index < directions.length; index++) {
    const newY = Y + directions[index][0];
    const newX = X + directions[index][1];
    blindMaze[newY][newX] = ES;
  }

  return blindMaze;

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
    blindMaze = hideArea(blindMaze,pos)

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
  while(bombs > 0) {
    getRandomPosition(mazeArray);
    bombs--;
  }
  return mazeArray;
}

function startGame(mazeArray, blindMaze) {
  let currentPos = [16, 1]
  let moveCount = 0;
  mazeArray = plantBomb(mazeArray);
  while (true) {
    console.clear();
    blindMaze = revealArea(mazeArray, blindMaze, currentPos);
    printMaze(blindMaze);
    const userMovement = prompt("enter where to move :");
    currentPos = moveUser(userMovement, currentPos, mazeArray, blindMaze);
    moveCount++
    if (currentPos === "BOOM") { return; }
    if (currentPos[0] === 17 && currentPos[1] === 16) {
      console.clear();
      printMaze(blindMaze);
      console.log("you won !!!!! you number of move are :", moveCount);
      return;
    }
  }
}

function main() {
  let mazeArray = [
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
  ];

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
    [ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, "🧀", ES]
  ]
  startGame(mazeArray, blindMaze);

  const playAgain = confirm("do you want to play agin :");
  if (playAgain) {
    return main()
  }

}

main();
