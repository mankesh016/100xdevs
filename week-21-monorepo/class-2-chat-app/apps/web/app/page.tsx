"use client";

import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  function onClickHandler() {
    router.push("/chat/123");
    console.log("Join Button Clicked!");
  }

  return (
    // I fucking hate this
    <div
      style={{
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        color: "white",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>Chat Application</div>
        <div>
          {/* <input type="text" placeholder="Room ID"></input> */}
          {/* <button>Join</button> */}
          <TextInput placeholder="Room ID"></TextInput>
          <Button onclick={onClickHandler}>Join</Button>
        </div>
      </div>
    </div>
  );
}
