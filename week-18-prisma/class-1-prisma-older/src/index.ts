import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Your code here
  await prisma.user.create({
    data: {
      username: "bob123",
      password: "pass123",
      city: "jaipur",
    },
  });

  console.log("User created successfully");

  const allUsers = await prisma.user.findMany({});
  console.log("All users:", JSON.stringify(allUsers));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
