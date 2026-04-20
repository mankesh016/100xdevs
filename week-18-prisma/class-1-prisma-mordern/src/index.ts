import { prisma } from "../lib/prisma.js";

async function createUser() {
  const user = await prisma.user.create({
    data: {
      username: "cp_first",
      password: "pass123",
      age: 20,
    },
  });
  console.log("Created user:", user);
}

async function createTodo(title: string, userId: number) {
  const todo = await prisma.todos.create({
    data: {
      title: title,
      userId: userId,
    },
  });
  console.log("Created Todo", todo);
}

async function main() {
  // await createUser();
  // await createTodo("Exam prep RTU", 6);
  // await createTodo("to prints admit cards", 6);

  const allTodos = await prisma.todos.findMany({});
  console.log("All Todos", JSON.stringify(allTodos));

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({});
  console.log("All users:", JSON.stringify(allUsers));

  // one to many relationship
  const user = await prisma.user.findFirst({
    where: {
      id: 6,
    },
    include: {
      todos: true,
    },
  });

  console.log("User: ", user);

  const user2 = await prisma.user.findFirst({
    where: {
      id: 6,
    },
    select: {
      username: true,
      city: true,
      todos: true,
    },
  });

  console.log("User2: ", user2);
}

main();
