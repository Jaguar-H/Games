while(true){
  console.clear()
  console.log("\n\n\n\t W = 👆\tS = 👇\t A = 👈\t D = 👉\n");
  console.log("\n\t > quit <  to quit the game\n");
  
  const move = prompt("\tenter where to move : ");
  Deno.writeTextFileSync("./command.txt",move
  )
}