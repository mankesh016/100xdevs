const fs = require('fs');

// const data = fs.readFileSync('a.txt', 'utf-8');
// console.log(data);

// const data1 = fs.readFileSync('b.txt', 'utf-8');
// console.log(data1);

fs.readFileSync('a.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});
