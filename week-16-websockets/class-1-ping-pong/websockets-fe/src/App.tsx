import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket>();

  function sendMessage() {
    if (inputRef.current) {
      const message = inputRef.current.value;
      if (!socket) return;
      socket.send(message);
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <>
      <div style={{ fontStyle: "italic" }}>ping pong sever!</div>
      <input ref={inputRef} type="text" placeholder="ping" />
      <button onClick={() => sendMessage()}>Send</button>
    </>
  );
}

export default App;
