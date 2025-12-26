import { maze } from "./maze.js";

export const getX = () => Math.floor(Math.random() * (maze[0].length - 2)/2) + 1;
export const getY = () => Math.floor(Math.random() * ((maze.length / 2) - 1)) + 1;

export const generateMonsters = (monsterCount) => {
  const monsters = [];
  for (let monster = 0; monster < monsterCount; monster++) {
    const x = getX();
    const y = getY();
    monsters.push({ type : "monster", x, y });
  }
  return monsters;
};


export const validMoves = ({x, y}) => {
  const blocksToCheck = [
    [y, x + 1],
    [y, x - 1],
    [y + 1, x],
    [y - 1, x],
  ];
  const wall = 1;
  const availablePath = [];

  for (const [y, x] of blocksToCheck) {
    if (maze[y][x] !== wall) availablePath.push([y, x]);
  }
  return availablePath;
};

export const updateEntity = (entity,[y,x]) => {
  entity.x = x;
  entity.y = y;
};

export const updateMonsters = (monsters) =>
  monsters.forEach(monster => {
  const move = chooseMove(validMoves(monster))
  if (move.length === 0) return
  updateEntity(monster,move)
});

export const chooseMove = (moves) => moves[Math.floor(Math.random() * moves.length)]


