import { updatePlayer } from "./player.js";
import { maze } from "./maze.js";
import { generateMonsters, updateMonsters } from "./monsters.js";
import { render } from "./rendering.js";

const monsters = generateMonsters(2);
const player = { type: "player", x: 1, y: maze.length - 2 };

setInterval(() => {
  console.clear();
  updatePlayer(player);
  updateMonsters(monsters);
  render(player, monsters);
}, 500);
