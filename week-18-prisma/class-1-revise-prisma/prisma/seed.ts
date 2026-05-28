import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// async function createUsers() {
//   // Seed User with nested Todos
//   await prisma.user.create({
//     data: {
//       username: "dummyuser1",
//       password: "hashedpassword456",
//       age: 23,
//       city: "dummy city",
//       todos: {
//         create: [
//           { title: "dummy task 1", completed: true },
//           { title: "dummy task 2", completed: false },
//         ],
//       },
//     },
//   });
//   console.log("Seeding complete!");
// }

async function createRandomFakeUsers() {
  //   console.log("🌱 Cleaning up database before seeding...");
  // Optional: Clears existing data so you don't hit duplicate username errors
  //   await prisma.todos.deleteMany({});
  //   await prisma.user.deleteMany({});

  console.log("⏳ Generating mock data with Faker...");

  // Generate 10 dummy users
  for (let i = 0; i < 10; i++) {
    // Generate a unique username by adding a random number or suffix
    const mockUsername = `${faker.internet.username()}_${faker.number.int({ min: 10, max: 99 })}`;

    await prisma.user.create({
      data: {
        username: mockUsername,
        password: faker.internet.password(), // Simulated plain text/hashed password
        age: faker.number.int({ min: 18, max: 60 }), // Generates age between 18 and 60
        city: faker.location.city(),
        todos: {
          create: [
            {
              title: faker.hacker.verb() + " " + faker.hacker.noun(), // e.g., "override primary matrix"
              completed: faker.datatype.boolean(),
            },
            {
              title: faker.git.commitMessage(), // e.g., "fix: resolve merge conflict"
              completed: faker.datatype.boolean(),
            },
            {
              title: faker.lorem.sentence({ min: 3, max: 7 }),
              completed: faker.datatype.boolean(),
            },
          ],
        },
      },
    });
  }

  console.log(
    "✅ Seeding complete! 10 users and 30 todos successfully created.",
  );
}

// createUsers();
createRandomFakeUsers();
