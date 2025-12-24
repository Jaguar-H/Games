import { main } from "./normal-maze.js";
import { ticTacToe } from "./tic-tac-toeV2.js";

const fs = {
  DeskTop: { himu: { hi: "", hello: "" } },
  Public: {},
  games: { maze: main, "tic-tac-toe" : ticTacToe },
};

const path = [];

const getNode = () => path.reduce((node, curr) => node[curr], fs);
const isDir = (x) => typeof x === "object" && x !== null;


function cd(dir) {
  const cur = getNode();

  if (dir === "..") {
    path.pop();
    return;
  }
  if (!cur[dir]) return console.log("no such directory");
  if (typeof cur[dir] === "function"){
    return cur[dir]()
  }

  path.push(dir);
}

function mkdir(name) {
  const cur = getNode();
  if (cur[name]) return console.log("already exists");
  cur[name] = {};
}

function ls() {
  const cur = getNode();
  if (!isDir(cur)) return console.log("not a directory");
  console.log("\n\t",Object.keys(cur).join("\n\t "));
}

function pwd() {
  console.log("/" + path.join("/"));
}

function runProgram([name]) {
  const cur = getNode();
  const item = cur[name];
  if (typeof item === "function") item();
  else console.log("unknown command:", name);
}


const commands = { cd, mkdir, ls, pwd };

while (true) {
  const input = prompt("> " ).trim().split(" ");
  const [cmd, args] = input;

  if (!commands[cmd]) {
    console.log(cmd.length > 0 ? `${cmd} not found` : undefined);
    continue
    
  }
  commands[cmd](args);
}
