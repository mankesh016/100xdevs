// setTimeout(() => {
//     console.log("hi");
//     setTimeout(() => {
//         console.log("hello");
//         setTimeout(() => {
//             console.log("hello there");
//         }, 5000);
//     }, 3000);
// }, 1000);


// function fun1() {
//     console.log("Hi");
//     setTimeout(fun2, 3000);
// }
// function fun2() {
//     console.log("Hello");
//     setTimeout(fun3, 5000);
// }
// function fun3() {
//     console.log("Hello there");
// }
// setTimeout(fun1, 1000);


// Promise
function myPromise(ms) {
    let obj = new Promise(resolve => setTimeout(resolve, ms));
    console.log(obj, ms);
    return obj;
}

// myPromise(2000).then(function () {
//     console.log("hi");
//     myPromise(3000).then(function () {
//         console.log("hello");
//         myPromise(5000).then(function () {
//             console.log("hello there");
//         })
//     })
// })

myPromise(1000).then(function () {
    console.log("hi");
    return myPromise(3000);
}).then(function () {
    console.log("hello");
    return myPromise(5000);
}).then(function () {
    console.log("hello there");
})








