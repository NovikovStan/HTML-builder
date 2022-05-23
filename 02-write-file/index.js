const fs = require("fs");
const path = require("path");
const { stdin: input, stdout: output } = require('process');

const rl = require("readline").createInterface({ input, output });
const ws = fs.createWriteStream(path.join(__dirname, "text.txt"));

rl.write("Please, enter your text here:\n");

rl.on("line", (text) => {
  if (text.trim() === "exit") rl.close();

  ws.write(`${text}\n`, (error) => {
    if (error) throw error;
  });
});

rl.on("close", () => {
  process.exit();
});

process.on("exit", (err) => {
  if (err === 0) {
    console.log("Thank you, bye!");
  } else {
    console.log(`Error, code: ${code}`);
  }
});
