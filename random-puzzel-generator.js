const WL = "🟫";
const PL = "🐭";
const ES = "  ";
let maze = []

function formMaze(size, maze = []) {

  for (let index = 0; index < size; index++) {
    const lines = []

    for (let itrator = 0; itrator < size; itrator++) {

      if (index % 2 !== 0 && itrator % 2 !== 0) {
        lines.push("  ");

      } else {
        lines.push("🟫");
      }
    }

    maze.push(lines);
  }

  return maze;
}

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

function printMaze(maze) {
  for (let index = 0; index < maze.length; index++) {
    console.log(maze[index].join(""));
  }
}

// printMaze(maze)
let playerPos = [1, 1];

function delay(sec) {
  let index = 0;
  while (index < 1250001643 * sec) {
    index++;
  }
}


function validMoves(mazeArray, pos, moves, size, availableMoves = []) {
  if (pos[0] - 2 > 0 && mazeArray[pos[0] - 2][pos[1]] !== WL && !includes(moves, [pos[0] - 2, pos[1]])) {
    availableMoves.push([pos[0] - 2, pos[1]])
  }
  if (pos[0] + 2 < size && mazeArray[pos[0] + 2][pos[1]] !== WL && !includes(moves, [pos[0] + 2, pos[1]])) {
    availableMoves.push([pos[0] + 2, pos[1]])
  }
  if (pos[1] - 2 > 0 && mazeArray[pos[0]][pos[1] - 2] !== WL && !includes(moves, [pos[0], pos[1] - 2])) {
    availableMoves.push([pos[0], pos[1] - 2])
  }
  if (pos[1] + 2 < size && mazeArray[pos[0]][pos[1] + 2] !== WL && !includes(moves, [pos[0], pos[1] + 2])) {
    availableMoves.push([pos[0], pos[1] + 2])
  }

  return availableMoves;
}

function bridgeGap(pos, move) {
  const midY = (pos[0] + move[0]) / 2;
  const midX = (pos[1] + move[1]) / 2;
  maze[midY][midX] = "  "
}

function moveBot(maze, move, pos, clr) {
  console.clear();
  maze[clr[0]][clr[1]] = "  ";
  // maze[move[0]][move[1]] = PL;
  bridgeGap(pos, move);
  pos = move.slice();
  printMaze(maze)
  delay(0.01);
  return pos
}

function Direction(availableMoves, moves, visited) {
  if (availableMoves.length === 0) {
    return visited.pop();
  }
  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  if (includes(moves, move)) {
    return Direction(availableMoves, moves, visited);
  }
  return move;
}

function main() {
  let moves = [];
  const visited = [];
  let size = parseInt(prompt("enter the Size :"));
  size = (size % 2) + (size - 1)
  maze = formMaze(size);
  let boxVisited = 0;
  while (true) {

    moves.push(playerPos.slice());
    
    if (boxVisited + 1 === Math.pow((size - 1)/2,2)) {
      maze[1][1] = "🧀";
      maze[size - 2][size - 2] = PL;
      console.log("done ");
      printMaze(maze)
      return solve([size - 2 , size - 2]);
    }
    let availableMoves = validMoves(maze, playerPos, moves, size);
    if (availableMoves.length === 0) {
      
      const clearIndex = playerPos.slice();
      playerPos = visited.pop();
      playerPos = moveBot(maze, playerPos, playerPos, clearIndex);
      continue;
    }
    boxVisited += 1
    
    const move = Direction(availableMoves, moves, visited);
    visited.push(playerPos.slice());
    const clearIndex = playerPos.slice();
    playerPos = moveBot(maze, move, playerPos, clearIndex);
    console.log(boxVisited)

  }
}


function validMoves1(mazeArray, pos, moves, availableMoves = []) {
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

function moveBot1(maze, move, pos, clr) {
  maze[clr[0]][clr[1]] = "🟢";
  // printMaze(maze)
  console.clear();
  maze[move[0]][move[1]] = PL;
  pos = move.slice();
  printMaze(maze)
  delay(0.005);
  return pos
}

function findDistance(pos, CH = [1, 1]) {
  return Math.sqrt(((CH[0] - pos[0]) ** 2) + ((CH[1] - pos[1]) ** 2))
}

function shortestDistance(moves) {
  let shortestDistance = Infinity;
  let indexValue = 0;
  for (let index = 0; index < moves.length; index++) {
    const distance = findDistance(moves[index]);
    if (distance < shortestDistance) {
      indexValue = index;
      shortestDistance = distance;
    }
  }
  return indexValue;
}

function directionToMove(availableMoves, moves, visited) {
  if (availableMoves.length === 0) {
    return visited.pop();
  }
  
  const move = availableMoves[shortestDistance(availableMoves)];
  if (includes(moves, move)) {
    return directionToMove(availableMoves, moves, visited);
  }
  return move;
}

function solve(playerPos) {
  console.clear();
  let moves = [];
  const visited = [];
  let mov = 0;
  while (true) {
    moves.push(playerPos.slice());
    let availableMoves = validMoves1(maze, playerPos, moves);
    if (availableMoves.length === 0) {
      const clearIndex = playerPos.slice();
      playerPos = visited.pop();
      if (playerPos === undefined) {
        console.log("No path to cheese 🧀");
        return;
      }
      playerPos = moveBot1(maze, playerPos, playerPos, clearIndex);
      continue;
    }

    const move = directionToMove(availableMoves, moves, visited);
    visited.push(playerPos.slice());
    const clearIndex = playerPos.slice();
    playerPos = moveBot1(maze, move, playerPos, clearIndex);
    mov++;

    if (playerPos[0] === 1 && playerPos[1] === 1) {
      console.log("You won in", mov, "moves!");
      return;
    }
  }
}

main();
