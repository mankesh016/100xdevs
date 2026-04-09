import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];
let userCount = 1;

wss.on("connection", (socket) => {
  allSockets = [...allSockets, socket];
  socket.send("Connected with websocket 🌐 : sent from server");
  const curUser = userCount++;

  socket.on("message", (e) => {
    console.log(e.toString() + " : user" + curUser);

    allSockets.forEach((s) => {
      //   if (s != socket)
      s.send(e.toString() + " : user" + curUser);
    });
    // socket.send(e.toString() + ": sent from server");
  });

  socket.on("disconnect", () => {
    allSockets.filter((e) => e != socket);
  });

  //   socket.on("close", (e) => {
  //     console.log(e.toString() + ": user disconnected");
  //     socket.send(e.toString() + ": connection closed");
  //   });

  //   socket.on("message", (e) => {
  //     socket.send(e.toString() + ": sent again from server");
  //   });
});
