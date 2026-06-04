"use client";

import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/text-input";

export default async function Room({ params }: { params: { roomId: string } }) {
  const roomId = (await params).roomId;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: 70,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      Room Page {roomId}
      <div>
        <TextInput placeholder="Type something..."></TextInput>
        <Button onclick={() => {}}>Send</Button>
      </div>
    </div>
  );
}
