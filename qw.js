const WL = "🟫";
const ES = "  ";
const START = "🏁";
const CHEESE = "🧀";

// ---------- CONFIG ----------
const SCREEN_WIDTH = 60;   // number of columns in "3D" view
const SCREEN_HEIGHT = 24;  // number of rows in "3D" view
const FOV = Math.PI / 3;   // 60 degrees
const MAX_DEPTH = 20;
const MOVE_SPEED = 0.5;
const ROT_SPEED = 0.2;

// ---------- MAZE ----------
const maze = [
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
  [WL, START, ES, WL, WL, ES, WL, ES, ES, ES, ES, ES, WL, WL, ES, ES, ES, WL],
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, CHEESE, WL]
];

const MAP_H = maze.length;
const MAP_W = maze[0].length;

// ---------- PLAYER STATE ----------
let playerX = 1.5;
let playerY = 16.5;
let playerAngle = -Math.PI / 2; // facing up

// Find START and CHEESE from maze
let cheeseX = null;
let cheeseY = null;

for (let y = 0; y < MAP_H; y++) {
  for (let x = 0; x < MAP_W; x++) {
    if (maze[y][x] === START) {
      playerY = y + 0.5;
      playerX = x + 0.5;
      maze[y][x] = ES;
    }
    if (maze[y][x] === CHEESE) {
      cheeseY = y + 0.5;
      cheeseX = x + 0.5;
      // keep cheese tile as non-wall for collision
    }
  }
}

// ---------- UTILS ----------
function isWall(wx, wy) {
  if (wx < 0 || wy < 0 || wx >= MAP_W || wy >= MAP_H) return true;
  return maze[wy][wx] === WL;
}

function distance(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

// ---------- RENDERING ----------
function render3D() {
  const screen = Array.from({ length: SCREEN_HEIGHT }, () => Array(SCREEN_WIDTH).fill(" "));

  for (let x = 0; x < SCREEN_WIDTH; x++) {
    const rayAngle =
      playerAngle - FOV / 2 + (x / SCREEN_WIDTH) * FOV;

    let distToWall = 0.0;
    let hitWall = false;

    const eyeX = Math.cos(rayAngle);
    const eyeY = Math.sin(rayAngle);

    while (!hitWall && distToWall < MAX_DEPTH) {
      distToWall += 0.1;

      const testX = Math.floor(playerX + eyeX * distToWall);
      const testY = Math.floor(playerY + eyeY * distToWall);

      if (testX < 0 || testY < 0 || testX >= MAP_W || testY >= MAP_H) {
        hitWall = true;
        distToWall = MAX_DEPTH;
      } else if (isWall(testX, testY)) {
        hitWall = true;
      }
    }

    const ceiling = Math.floor(SCREEN_HEIGHT / 2 - SCREEN_HEIGHT / distToWall);
    const floor = SCREEN_HEIGHT - ceiling;

    let shade = " ";
    if (distToWall <= MAX_DEPTH / 6) shade = "█";
    else if (distToWall <= MAX_DEPTH / 4) shade = "▓";
    else if (distToWall <= MAX_DEPTH / 3) shade = "▒";
    else if (distToWall <= MAX_DEPTH / 2) shade = "░";
    else shade = ".";

    for (let y = 0; y < SCREEN_HEIGHT; y++) {
      if (y < ceiling) {
        screen[y][x] = " ";
      } else if (y > ceiling && y <= floor) {
        screen[y][x] = shade;
      } else {
        // floor
        const b = 1 - (y - SCREEN_HEIGHT / 2) / (SCREEN_HEIGHT / 2);
        if (b < 0.25) screen[y][x] = "#";
        else if (b < 0.5) screen[y][x] = "x";
        else if (b < 0.75) screen[y][x] = ".";
        else screen[y][x] = " ";
      }
    }
  }

  console.clear();
  console.log(screen.map(row => row.join("")).join("\n"));
  console.log("");
  console.log(`Pos: (${playerX.toFixed(2)}, ${playerY.toFixed(2)})  Angle: ${playerAngle.toFixed(2)} rad`);
  console.log(`Dist to cheese: ${distance(playerX, playerY, cheeseX, cheeseY).toFixed(2)}`);
  console.log("Controls: W = forward, S = backward, A = turn left, D = turn right, quit = exit");
}

// ---------- INPUT & MOVEMENT ----------
function handleInput(input) {
  input = (input || "").trim().toLowerCase();
  if (input === "quit") return "QUIT";

  if (input === "a") {
    playerAngle -= ROT_SPEED;
  } else if (input === "d") {
    playerAngle += ROT_SPEED;
  }

  let moveX = 0;
  let moveY = 0;

  if (input === "w") {
    moveX = Math.cos(playerAngle) * MOVE_SPEED;
    moveY = Math.sin(playerAngle) * MOVE_SPEED;
  } else if (input === "s") {
    moveX = -Math.cos(playerAngle) * MOVE_SPEED;
    moveY = -Math.sin(playerAngle) * MOVE_SPEED;
  }

  const newX = playerX + moveX;
  const newY = playerY + moveY;

  if (!isWall(Math.floor(newX), Math.floor(newY))) {
    playerX = newX;
    playerY = newY;
  }

  return null;
}

// ---------- GAME LOOP ----------
export function main() {
  let moves = 0;

  while (true) {
    render3D();

    if (distance(playerX, playerY, cheeseX, cheeseY) < 0.7) {
      console.log("\nYOU FOUND THE 🧀 CHEESE!");
      console.log("Total moves:", moves);
      break;
    }

    const input = prompt("Move: ");
    const res = handleInput(input);
    moves++;

    if (res === "QUIT") {
      console.log("Game quit.");
      break;
    }
  }
}

main()