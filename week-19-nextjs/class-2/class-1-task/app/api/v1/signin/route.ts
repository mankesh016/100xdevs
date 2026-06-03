import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      username: data.username,
      password: data.password,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "Incorrect username or password",
    });
  }

  return NextResponse.json({
    message: "Welcome back!",
  });
}
