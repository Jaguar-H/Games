const readline = require("readline");

const MAP = [
  "##########",
  "#        #",
  "#   ##   #",
  "#        #",
  "####   ###",
  "#        #",
  "#   ##   #",
  "#        #",
  "##########"
];

const MAP_W = MAP[0].length;
const MAP_H = MAP.length;

let player = {
  x: 3.5,
  y: 3.5,
  a: 0
};

const FOV = Math.PI / 3;
const DEPTH = 20;
const SCREEN_W = 80;
const SCREEN_H = 24;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (_, key) => {
  if (key.name === "w") move(0.2);
  if (key.name === "s") move(-0.2);
  if (key.name === "a") player.a -= 0.1;
  if (key.name === "d") player.a += 0.1;
  if (key.ctrl && key.name === "c") process.exit();
});

function move(speed) {
  const nx = player.x + Math.cos(player.a) * speed;
  const ny = player.y + Math.sin(player.a) * speed;

  if (MAP[Math.floor(ny)][Math.floor(nx)] !== "#") {
    player.x = nx;
    player.y = ny;
  }
}

function castRay(angle) {
  for (let d = 0; d < DEPTH; d += 0.05) {
    const x = player.x + Math.cos(angle) * d;
    const y = player.y + Math.sin(angle) * d;

    if (
      x < 0 || x >= MAP_W ||
      y < 0 || y >= MAP_H ||
      MAP[Math.floor(y)][Math.floor(x)] === "#"
    ) {
      return d;
    }
  }
  return DEPTH;
}

function draw() {
  let screen = "";

  for (let col = 0; col < SCREEN_W; col++) {
    const rayAngle =
      (player.a - FOV / 2) + (col / SCREEN_W) * FOV;

    let dist = castRay(rayAngle);

    const wallHeight = Math.floor(SCREEN_H / dist);

    for (let row = 0; row < SCREEN_H; row++) {
      if (row < SCREEN_H / 2 - wallHeight / 2)
        screen += " ";
      else if (row > SCREEN_H / 2 + wallHeight / 2)
        screen += ".";
      else {
        if (dist < 5) screen += "█";
        else if (dist < 10) screen += "▓";
        else screen += "░";
      }
    }

    screen += "\n";
  }

  console.clear();
  console.log(screen);
}

setInterval(draw, 50);
