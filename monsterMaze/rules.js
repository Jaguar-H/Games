import { maze } from "./maze.js";

const exit = 2

export const isGameOver = (player,monsters) =>{
  return monsters.some(monster =>
    monster.x === player.x && monster.y === player.y
  )
}

export const hasWon = (player) => maze[player.y][player.x] === exit

export const gameStatus = (player,monsters) => {
  if (isGameOver(player,monsters)) return "LOSE"
  if (hasWon(player)) return "WIN"
  return "PLAYING"
}

