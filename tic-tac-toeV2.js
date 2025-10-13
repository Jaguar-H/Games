function dim(text) {
  return "\x1B[2m" + text + "\x1B[0m";
}

function bold(text) {
  return "\x1B[1m" + text + "\x1B[0m";
}

function updateData(index, player, dataArray, player1) {
  const inputData = player === player1 ? "❌" : "🟢";
  dataArray[index] = inputData;
  return dataArray;
}

function printGrid(val) {
  const line = "─".repeat(22);
  console.log(`\t\t${line}`);

  for (let i = 0; i < 9; i += 3) {

    console.log("\t\t│      │      │      │")
    console.log(`\t\t│  ${val[i]}  │  ${val[i + 1]}  │  ${val[i + 2]}  │`);
    console.log("\t\t│      │      │      │")
    console.log(`\t\t${line}`);
  }
}

function playerChange(player, player1, player2) {
  return player === player1 ? player2 : player1;
}

function isValEqual(indexs, val) {
  return (val[indexs[0]] === val[indexs[1]] && val[indexs[1]] === val[indexs[2]]);
}

function anyOneWon(val) {
  const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]];

  for (let index = 0; index < winConditions.length; index++) {
    if (isValEqual(winConditions[index], val)) {
      return true;
    }
  }
  return false;

}

function isValid(move, moves) {
  const isItPlayed = moves.includes(move);
  const isItInRange = 0 < move && move < 10;

  return isItInRange && !isItPlayed;
}

function renderBoard(dataArray) {
  console.clear();
  printGrid(dataArray);
}

function getPlayerMove(player, msg) {
  console.log("player :", bold(player), msg);
  const move = parseInt(prompt("Enter Box Number - "), 10);
  return move;
}

function removeMove(moves, dataArray) {
  const removedIndex = moves.shift();
  console.log(removedIndex);
  dataArray[removedIndex - 1] = dim(removedIndex) + " ";
}

function updateBoard(moves, move, dataArray, player, player1) {
  if (moves.length >= 6) {
    removeMove(moves, dataArray);
  }
  moves.push(move);
  dataArray = updateData(move - 1, player, dataArray, player1);
  return dataArray;
}

function checkWin(dataArray, player) {
  const won = anyOneWon(dataArray);

  if (won) {
    console.clear()
    printGrid(dataArray);
    console.log("Congratulations Player", bold(player));
    return true;
  }
  return false;
}

function startGame(dataArray, moves, player1, player2) {
  let msg = "";
  let player = player1;

  while (true) {
    renderBoard(dataArray);
    const move = getPlayerMove(player, msg);
    msg = "";

    if (!isValid(move, moves)) {
      msg = "Enter a Valid Move"
      continue;
    }

    dataArray = updateBoard(moves, move, dataArray, player, player1);

    if (checkWin(dataArray, player)) { return; }
    player = playerChange(player, player1, player2);

  }
}

function main() {
  let dataArray = [dim("1 "), dim("2 "), dim("3 "),
  dim("4 "), dim("5 "), dim("6 "),
  dim("7 "), dim("8 "), dim("9 ")];
  console.clear();
  const player1 = prompt(bold("enter Your Name Player 1 :"));
  const player2 = prompt(bold("enter Your Name Player 2 :"));
  const moves = [];

  startGame(dataArray, moves, player1, player2);

  const playAgain = confirm("do you want to play again ");

  if (playAgain) {
    main();
  }
}

main();
