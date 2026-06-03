import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // data.username and data.password (put to database)
  console.log(data, data.username, data.password);

  //   const users = await prisma.user.findMany({});
  //   console.log(users);

  const existingUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (existingUser) {
    return NextResponse.json({
      message: "User already exists",
    });
  }

  await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
    },
  });

  return NextResponse.json({
    message: "User registered successfully",
  });
}
