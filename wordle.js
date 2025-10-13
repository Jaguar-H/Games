function getSecret() {
  const words = [
    "apple", "brave", "crane", "delta", "eagle", "flame", "grape", "heart", "ideal", "joker",
    "karma", "lemon", "mango", "night", "ocean", "pearl", "queen", "robot", "snake", "tiger",
    "uncle", "vivid", "whale", "xenon", "youth", "zebra", "angel", "beach", "cloud", "dance",
    "earth", "focus", "giant", "happy", "ivory", "jolly", "kneel", "light", "magic", "noble",
    "orbit", "piano", "quest", "royal", "smile", "table", "union", "voice", "water", "yacht",
    "zesty", "amber", "bloom", "chase", "dream", "frost", "grind", "honor", "input", "joint",
    "knock", "lunar", "model", "nurse", "olive", "press", "quilt", "river", "shade", "treat",
    "urban", "vital", "wheat", "xylem", "young", "zonal", "adapt", "blend", "craft", "drift",
    "flock", "globe", "haste", "infer", "jewel", "layer", "march", "nerve", "oasis", "plate",
    "quick", "ridge", "scale", "trace", "vapor", "weary", "yield", "zeros", "catch", "spice"
  ];

  return words[Math.floor(Math.random() * words.length)]

}

function getPlayerWord(secret, previousWord, previousResult, chances, msg = "") {

  console.log("\t", msg);
  const guessedWord = prompt(`\t chances Remaining to guess : ${"❤️".repeat(chances)} \n
    \tguess ${secret.length} letter word :`).split("");

  if (guessedWord.length != secret.length) {
    console.clear()
    printGrid(previousWord, previousResult);
    return getPlayerWord(secret, previousWord, previousResult, chances, "Enter A Valid Word");
  }

  return guessedWord;
}

function printGrid(inputData, matchedData) {
  console.clear();
  console.log(`|   ${inputData[0]}  |   ${inputData[1]}  |   ${inputData[2]}  |   ${inputData[3]}  |   ${inputData[4]}  |`);
  console.log("-".repeat(36));
  console.log(`|      |      |      |      |      |`);
  console.log(`|  ${matchedData[0]}  |  ${matchedData[1]}  |  ${matchedData[2]}  |  ${matchedData[3]}  |  ${matchedData[4]}  |\n\n`);

}

function getChances(msg = "") {
  console.clear();
  console.log("\t", msg);
  const difficulty = parseInt(prompt("\tEnter The Difficulty Level (1 : 2 : 3) :"), 10);
  switch (difficulty) {
    case 1:
      return 15;
    case 2:
      return 10;
    case 3:
      return 5;
    default:
      return getChances("invalid Difficulty");
  }
}

function SymbolAndCount(itIsThere, isAtSameIndex, copy, userInput, index) {
  if (itIsThere && isAtSameIndex) {
    const indexToRemove = copy.indexOf(userInput[index]);
    copy[indexToRemove] = 0

    return ["🟢", 1, copy];
  }

  if (itIsThere && !isAtSameIndex) {
    const indexToRemove = copy.indexOf(userInput[index]);
    copy[indexToRemove] = 0

    return ["🟡", 0, copy];
  }

  return ["🔴", 0, copy];
}

function matchData(userInput, matchedResult, copy) {
  let perfectMatch = 0;

  for (let index = 0; index < copy.length; index++) {
    const itIsThere = copy.includes(userInput[index]);
    const isAtSameIndex = copy.at(index) === userInput.at(index)
    const output = SymbolAndCount(itIsThere, isAtSameIndex, copy, userInput, index);
    copy = output[2]

    matchedResult.push(output[0]);
    perfectMatch += output[1];
  }
  return [matchedResult, perfectMatch];

}

function getPlayerGuess(secret, previousWord, previousResult, chances) {
  return getPlayerWord(secret, previousWord, previousResult, chances);
}

function checkMatch(secret, guessedWord) {
  const copy = secret.slice();
  return matchData(guessedWord, [], copy);
}

function displayTurn(guessedWord, result, guessedWords) {
  printGrid(guessedWord, result);
  console.log("\tGuessed words so far:\n", guessedWords);
}

function isWin(secret, perfectMatch) {
  if (secret.length === perfectMatch) {
    console.log("\n\n\t🎉 Congratulations, You Win! 🎉\n\n");
    return true;
  }
  return false;
}

function startGame(secret, chances, previousResult, previousWord, guessedWords) {
  while (chances > 0) {
    const guessedWord = getPlayerGuess(secret, previousWord, previousResult, chances);
    guessedWords.push(guessedWord.join(""));

    const matchResults = checkMatch(secret, guessedWord);
    const result = matchResults[0]
    const perfectMatch = matchResults[1]
    displayTurn(guessedWord, result, guessedWords);

    if (isWin(secret, perfectMatch)) return;

    previousResult = result;
    previousWord = guessedWord;
    chances--;
  }
  console.log(`\n\n  you lose
  the secret was ${secret.join("")}`);
}

function main() {
  const secret = getSecret().split("");
  let chances = getChances();
  let previousWord = ["-", "-", "-", "-", "-"];
  let previousResult = ["-", "-", "-", "-", "-"];
  const gussedWords = [];
  startGame(secret, chances, previousResult, previousWord, gussedWords)

  const playAgain = confirm("do you want to play again :");

  if (playAgain) {
    return main()
  }
}

main();
