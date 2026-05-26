let now = new Date();


console.log(now);

console.log(now.getDay());
console.log(now.getDate());
console.log(now.getMonth());
console.log(now.getFullYear());
console.log(now.getHours());
console.log(now.getTime());

console.log(now.toISOString());


let mp = new Map();
mp["monday"] = 1;
mp["wednesday"] = 3;
mp.set(5, "five");
mp.set(6, "six");
mp.set(7, "seven");

// mp.delete(5);
console.log(mp);