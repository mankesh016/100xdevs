const fs = require("fs");

function countWords(fileName) {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log("Error occured while reading file:", err);
    } else {
      console.log(data);
      //   let cnt = 0;
      //   for (let i = 0; i < data.length; i++) {
      //     if (data[i] === " ") cnt++;
      //   }

      let cnt = data.split(" ").length;
      console.log(`There are ${cnt} words in the file ${fileName}`);
    }
  });
}

countWords("a.txt");
console.log(process.argv);

countWords(process.argv[2]);
