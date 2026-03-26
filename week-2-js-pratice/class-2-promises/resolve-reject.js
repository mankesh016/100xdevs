function promisifiedFun() {
    return new Promise((resolve, reject) => {
        // resolve("Done");
        reject("Error");
    });
}


promisifiedFun().then((data) => {
    console.log("promise succeeded:", data);
}).catch((error) => {
    console.log("an error occured:", error);
}).finally(() => {
    console.log("finally");
});