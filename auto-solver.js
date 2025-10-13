const WL = "🟫";
const PL = "🐭";
const ES = "  ";

function isArray(x) {
  return typeof x === 'object';
}

function areArraysEqual(array, target) {
  if (array.length !== target.length) {
    return false;
  }

  for (let index = 0; index < array.length; index++) {
    if (!areDeepEqual(array[index], target[index])) {
      return false;
    }
  }

  return true;
}

function areDeepEqual(array, target) {
  if (typeof array !== typeof target) {
    return false;
  }

  if (isArray(array) && isArray(target)) {
    return areArraysEqual(array, target);
  }

  return array === target;
}
function includes(array, target) {
  for (let index = 0; index < array.length; index++) {

    if (areDeepEqual(array[index], target)) {
      return true;
    }
  }
  return false;
}

let maze = [
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
];

function printMaze(maze) {
  for (let index = 0; index < maze.length; index++) {
    console.log(maze[index].join(""));
  }
}

printMaze(maze)
let playerPos = [16, 1];

function delay(sec){
  let index = 0;
  while(index < 1250001643 * sec){
    index++;
  }
}


function validMoves(mazeArray, pos, moves, availableMoves = []) {
  if (mazeArray[pos[0] - 1][pos[1]] !== WL && !includes(moves, [pos[0] - 1, pos[1]])) {
    availableMoves.push([pos[0] - 1, pos[1]])
  }
  if (mazeArray[pos[0] + 1][pos[1]] !== WL && !includes(moves, [pos[0] + 1, pos[1]])) {
    availableMoves.push([pos[0] + 1, pos[1]])
  }
  if (mazeArray[pos[0]][pos[1] - 1] !== WL && !includes(moves, [pos[0], pos[1] - 1])) {
    availableMoves.push([pos[0], pos[1] - 1])
  }
  if (mazeArray[pos[0]][pos[1] + 1] !== WL && !includes(moves, [pos[0], pos[1] + 1])) {
    availableMoves.push([pos[0], pos[1] + 1])
  }

  return availableMoves;
}

function moveBot(maze, move, pos, clr) {
  console.clear();
  maze[clr[0]][clr[1]] = "🟢";
  maze[move[0]][move[1]] = PL;
  pos = move.slice();
  printMaze(maze)
  delay(0.2);
  return pos
}

function randomDirection(availableMoves, moves, visited) {
  if (availableMoves.length === 0) {
    return visited.pop();
  }
  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  if (includes(moves, move)) {
    return randomDirection(availableMoves, moves, visited);
  }
  return move;
}

function main() {
  let moves = [];
  const visited = [];
  let mov = 0;

  while (true) {
    moves.push(playerPos.slice());
    let availableMoves = validMoves(maze, playerPos, moves);
    if (availableMoves.length === 0) {
      const clearIndex = playerPos.slice();
      playerPos = visited.pop();
      if (playerPos === undefined) {
        console.log("No path to cheese 🧀");
        return;
      }
      playerPos = moveBot(maze, playerPos, playerPos,clearIndex);
      continue;
    }
    
    const move = randomDirection(availableMoves, moves, visited);
    visited.push(playerPos.slice());
    const clearIndex = playerPos.slice();
    playerPos = moveBot(maze, move, playerPos, clearIndex);
    mov++;

    if (playerPos[0] === 1 && playerPos[1] === 16) {
      console.log("You won in", mov, "moves!");
      return;
    }
  }
}

main();


