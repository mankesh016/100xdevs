function sum(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function doOperation(a, b, operation) {
    return operation(a, b);
}

let ans = doOperation(5, 3, multiply);
console.log(ans);