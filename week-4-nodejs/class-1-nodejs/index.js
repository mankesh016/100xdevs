// const chalk = require("chalk"); // not working
const path = require("path"); // working

// console.log(chalk.red("hello there")); // working with .mjs extension

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log(sum(2, 5));
// console.log(__dirname);
// console.log(__filename);

console.log(path.join(__dirname, "index.js"));
console.log(path.join(__dirname, "../index.js"));
