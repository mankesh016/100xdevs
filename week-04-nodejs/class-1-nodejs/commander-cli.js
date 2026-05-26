const fs = require("fs");
const { Command } = require("commander");

const program = new Command();

program
  .name("File releted CLI")
  .description("CLI to do file based tasks!")
  .version("8.0.2");

program
  .command("count_words")
  .description("counts the words in a file!")
  .argument("<file>", "file to count")
  .action((fileName) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log("Error occured while reading file:", err);
      } else {
        console.log(data);

        let cnt = data.split(" ").length;
        console.log(`There are ${cnt} words in the file ${fileName}`);
      }
    });
  });

program
  .command("count_sentences")
  .description("counts the sentences in a file!")
  .argument("<file>", "file to count")
  .action((fileName) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log("Error occured while reading file:", err);
      } else {
        console.log(data);

        let cnt = data.split("\n").length;
        console.log(`There are ${cnt} sentences in the file ${fileName}`);
      }
    });
  });

program.parse();
