import { prisma } from "../lib/prisma.js";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      username: "bob123",
      password: "pass123",
      city: "jaipur",
    },
  });

  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({});

  console.log("All users:", JSON.stringify(allUsers));
}

main();
