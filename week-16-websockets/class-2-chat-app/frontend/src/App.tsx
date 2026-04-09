import { useEffect, useRef, useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Message } from "./components/Message";
import { Topbar } from "./components/Topbar";

function App() {
  const [messages, setMessages] = useState(["System's Default Message! 👋"]);
  const wsRef = useRef<WebSocket>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEnterKeyDown = (event: any) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    };
    window.addEventListener("keydown", handleEnterKeyDown);
    return () => window.removeEventListener("keydown", handleEnterKeyDown);
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onmessage = (e) => {
      const message = e.data.toString();
      setMessages((m) => [...m, message]);
    };

    return () => ws.close();
  }, []);

  function sendMessage() {
    if (!wsRef.current) return;
    if (!inputRef.current) return;
    const message = inputRef.current.value;
    wsRef.current.send(message);
    inputRef.current.value = "";
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="md:w-[min(22rem,30vw)] shrink-0 bg-blue-300 md:px-5 md:py-4 py-2  pl-[10vw]  md:flex md:flex-col md:justify-start md:items-center md:text-center md:flex-wrap md:gap-5">
        <Topbar roomId={1232} />
      </div>

      <div className="flex-1 flex flex-col bg-blue-200 px-[10vw] min-h-0 pb-[max(10px,5vh)] md:pt-[max(10px,5vh)]">
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar">
          <Message messages={messages} />
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex">
            <Input ref={inputRef} />
          </div>
          <Button text="Send" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
