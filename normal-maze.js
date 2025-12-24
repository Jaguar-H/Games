// const WL = "" 
const WL = "🟫";
const PL = "🐭";
const ES = "  ";
// 🟫🩷
function printMaze(mazeArray) {
  for (let index = 0; index < mazeArray.length; index++) {
    console.log("\t", mazeArray[index].join(""));
  }
  console.log("\n\n");

}


function isItValid(movement, pos, mazeArray) {
  console.log(movement);
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


function moveUser(movement, pos, mazeArray, moves) {
  if (isItValid(movement, pos, mazeArray)) {
    mazeArray[pos[0]][pos[1]] = ES

    if (movement === "w") { pos[0] = pos[0] - 1; }
    if (movement === "s") { pos[0] = pos[0] + 1; }
    if (movement === "d") { pos[1] = pos[1] + 1; }
    if (movement === "a") { pos[1] = pos[1] - 1; }
  }

  if (mazeArray[pos[0]][pos[1]] === "🧀") {
    mazeArray[pos[0]][pos[1]] = PL
    console.clear();
    printMaze(mazeArray)
    console.log("");

    console.log("Congratulations You Won");
    console.log("MoveCount : ", moves);
    return "WIN";
  }
  mazeArray[pos[0]][pos[1]] = PL
  return pos;

}

function getUserMove(moveCount, mazeArray) {
  console.clear();
  printMaze(mazeArray);
  console.log("\tNumber of moves played : ", moveCount);
  console.log("\n\t W = 👆\tS = 👇\t A = 👈\t D = 👉\n");
  console.log("\n\t > quit <  to quit the game\n");
  return prompt("\tenter where to move : ");
}

function startGame(mazeArray) {
  printMaze(mazeArray);

  let currentPos = [16, 1]
  let moveCount = 0;
  while (true) {
    const userMovement = getUserMove(moveCount, mazeArray);
    if (userMovement === "quit"){
      console.log("Game Quitted .....");
       return}
    currentPos = moveUser(userMovement, currentPos, mazeArray, moveCount);
    moveCount++
    if (currentPos === "WIN") {
      return;
    }
  }
}


export function main() {
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
    [WL, ES, ES, ES, ES, WL, ES, ES, ES, WL, ES, WL, ES, WL, ES, WL, WL, WL],
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
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL]]
  ];
  startGame(mazeArrays[Math.floor(Math.random() * 3)]);
}
