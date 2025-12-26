import { updatePlayer } from "./player.js";
import { generateMonsters, updateMonsters } from "./monsters.js";
import { render } from "./rendering.js";
import { gameStatus} from "./rules.js";
import { maze } from "./maze.js";

const generateMessage = (status) =>{
  if (status === "WIN") return "YOU WON  IT'S PARTY TIME 🎊"
  return "YOU WERE SLAINED BY THE MONSTER 👹"
}


const monsters = generateMonsters(2);

const player = { type: "player", x: 1, y: maze.length - 2 };

const intervalID = setInterval(() => {
  
  console.clear();

  updatePlayer(player);
  updateMonsters(monsters);
  render(player, monsters);

  const status = gameStatus(player,monsters)

  if (status !== "PLAYING"){
    const message = generateMessage(status)
    console.log(message);
    clearInterval(intervalID)
  }
    
}, 500);
