const fs = require('fs');

// const data = fs.readFileSync('a.txt', 'utf-8');
// console.log(data);

// const data1 = fs.readFileSync('b.txt', 'utf-8');
// console.log(data1);

function print(err, data) {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
}

function print2(err, data) {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
}

fs.readFile('a.txt', 'utf8', print);
fs.readFile('b.txt', 'utf8', print2);


console.log("Done!"); // Done getting printed first XD


setTimeout(() => { console.log("its been 2 sec!") }, 5);

let sum = 0;
for (let i = 1; i < 100000000; i++) {
    sum += i;
}

console.log(sum);