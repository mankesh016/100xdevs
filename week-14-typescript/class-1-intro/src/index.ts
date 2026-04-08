let x: number = 10;
console.log(x);

function greet(firstName: string) {
  console.log("Hello" + firstName);
}
greet("Alice");

function sum(a: number, b: number) {
  // return "Alice"; // uncomment this and check type of ans
  return a + b;
}

let ans = sum(5, 7);
console.log(ans);

function delayedCall(fn: () => void) {
  setTimeout(fn, 1000);
}
delayedCall(() =>
  console.log("After Delayed Call This message will get printed!"),
);

let greet2 = () => {
  console.log("Hello, Again!");
};
greet2();
