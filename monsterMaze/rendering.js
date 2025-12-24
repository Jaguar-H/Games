import { maze } from "./maze.js";

const renderGrid = (grid) => {
  grid.forEach(row => {
    console.log(row.join(""));
  });
};

export const render = (player, monsters) => {
  const tiles = { 1: "🟫", 0: "  ", 2: "🧀" };
  const entityView = { player: "👨🏻‍🦰", monster: "👹" };

  const grid = maze.map((row) => row.map((t) => tiles[t]));
  
  grid[player.y][player.x] = entityView[player.type];

  for (const { type, x, y } of monsters) {
    grid[y][x] = entityView[type];
  }

  renderGrid(grid);
};
