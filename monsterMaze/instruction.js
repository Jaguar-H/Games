while(true){
  const move = prompt("=> ")
  Deno.writeTextFileSync("./instruction.txt",move
  )
}