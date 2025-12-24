import { maze } from "./maze.js";
import { updateEntity } from "./monsters.js";

const movement = { W: [-1, 0], S: [1, 0], A: [0, -1], D: [0, 1] };

const readMove = () => {
  const move = Deno.readTextFileSync("./instruction.txt");
  Deno.writeTextFileSync("./instruction.txt", "");
  return move || "X";
};

const nextPosition = (player, [dy, dx]) => {
  return[player.y + dy, player.x + dx]
};

const getDirection = (move) =>movement[move.toUpperCase()];

const isBlocked = ([y,x]) => maze[y][x] === 1;

export const updatePlayer = (player) => {
  const move = readMove();
  const direction = getDirection(move);
  if (!direction) return;
  const next = nextPosition(player, direction);
  if (isBlocked(next)) return;
  updateEntity(player, next);
  
};

