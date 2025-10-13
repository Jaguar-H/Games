function formMaze(size,maze = []){

  let solidlines = []
  for (let index = 0; index < size;index++){
    solidlines.push("🟫")
  }
  maze.push(solidlines)
  let block = true;
  for (let index = 0; index < size - 2; index++){
    const hollowlines = []

    for (let itrator = 0; itrator < size; itrator++){
      if (itrator === size - 1 || itrator === 0){
        hollowlines.push("🟫");
        continue;
      }

      if((index + itrator) %2 !== 0){
        hollowlines.push("🟫");
        continue;
      }
      hollowlines.push("  ");
    }
    
    maze.push(hollowlines);
    
}
maze.push(solidlines)

return maze;
}

