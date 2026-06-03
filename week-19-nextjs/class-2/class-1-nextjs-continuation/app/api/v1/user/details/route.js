import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    id: 1,
    name: "Kulas Light",
    username: "lkulas",
    email: "kulas.light@gmail.com",
  });
}
// Response.json({}) will also work
