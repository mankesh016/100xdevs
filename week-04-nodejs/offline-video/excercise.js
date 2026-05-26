const express = require("express");
const { use } = require("react");
const app = express();

const user = [
  {
    name: "Mankesh",
    kidneys: [
      {
        healthy: true,
      },
    ],
  },
];
app.use(express.json());

app.get("/", (req, res) => {
  let index = 0;
  const kidneys = user[index].kidneys;
  const totalKidneys = kidneys.length;
  let healthyKidneys = kidneys.reduce((kid, cur) => kid + cur.healthy, 0);
  let unhealthKidneys = totalKidneys - healthyKidneys;
  res.json({ totalKidneys, healthyKidneys, unhealthKidneys });
});

app.post("/", (req, res) => {
  const index = 0;
  const state = req.body.state;
  user[index].kidneys.push({ healthy: state });
  res.json({ msg: "Done!" });
});

app.put("/", (req, res) => {
  if (checkUnhealthyKidneys()) {
    const index = 0;
    user[index].kidneys.map((kidney) => (kidney.healthy = true));
    console.log(user[index].kidneys);

    res.json({ msg: "Done!" });
  } else {
    res.status(411).json({
      msg: "you don't have any unhealthy kidneys",
    });
  }
});

app.delete("/", (req, res) => {
  if (checkUnhealthyKidneys()) {
    const index = 0;
    const healthyKidneys = user[index].kidneys.filter(
      (kidney) => kidney.healthy == true,
    );
    user[index].kidneys = healthyKidneys;
    console.log(healthyKidneys);

    res.json({ msg: "Done!" });
  } else {
    res.status(411).json({
      msg: "You don't have any unhealthy kidney",
    });
  }
});

function checkUnhealthyKidneys() {
  const index = 0;
  let result = false;
  user[index].kidneys.forEach((kidney) => {
    console.log(kidney);
    if (kidney.healthy === false) result = true;
  });
  console.log("result: ", result);
  return result;
}
app.listen(3001);
