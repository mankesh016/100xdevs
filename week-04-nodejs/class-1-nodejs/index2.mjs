import chalk from "chalk";

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log("Sum : ", sum(2, 5));
console.log("Multiply : ", multiply(2, 5));

console.log(chalk.red.bold("This is a error message!"));
console.log(chalk.green.underline("Successfully executed chalk commands!"));

console.log(chalk.blue.bold("Message in blue color!"));
console.log(chalk.yellow.bold("Wow different colors!"));
console.log(chalk.bgCyan.bold("Just chalk magics!"));

// console.log(__dirname); // not working directly
