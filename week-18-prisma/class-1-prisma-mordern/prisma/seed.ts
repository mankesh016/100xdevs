import { prisma } from "../lib/prisma.js";

async function createDummyUser() {
  const user = await prisma.user.create({
    data: {
      username: "Alice Dummy",
      password: "aliceDummyPass",
      age: 20,
    },
  });
  console.log("Created user:", user);
  return user.id;
}

async function createDummyTodo(title: string, userId: number) {
  const todo = await prisma.todos.create({
    data: {
      title: title,
      userId: userId,
    },
  });
  console.log("Created Todo", todo);
}

async function main() {
  let userId = await createDummyUser();
  createDummyTodo("Dummy todo", userId);
  createDummyTodo("Go to gym", userId);
}

main();
