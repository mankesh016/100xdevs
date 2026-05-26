const express = require("express");
const app = express();

function calculateSum(n) {
  const num = parseInt(n);
  return (num * (num + 1)) / 2;
}
app.get("/post/:other", (req, res) => {
  console.log(req.params.other);
  console.log(req.body);
  const n = req.query.n;
  const ans = calculateSum(n);
  res.send("Sum upto " + n + " is " + ans);
  res.send("hello");
});

app.listen(3003);
