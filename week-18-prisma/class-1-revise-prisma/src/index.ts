// import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({});
  res.json(users);
});
app.get("/todos/:id", async (req, res) => {
  const todos = await prisma.todos.findMany({
    where: {
      userId: Number(req.params.id),
    },
  });
  res.json(todos);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// async function main() {
//   await prisma.user.create({
//     data: {
//       username: "bob1245473",
//       password: "pass123564",
//       city: "jaipur",
//     },
//   });
//   console.log("User created successfully");

//   await prisma.todos.create({
//     data: {
//       title: "go to gym",
//       userId: 1,
//     },
//   });
//   const allTodos = await prisma.todos.findMany({});
//   console.log("All Todos: ", JSON.stringify(allTodos));

//   const response = await prisma.user.findFirst({
//     where: {
//       id: 1,
//     },
//     include: {
//       todos: true,
//     },
//   });
//   console.log(response);

//   const allUsers = await prisma.user.findMany({});
//   console.log("All users:", JSON.stringify(allUsers));
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
