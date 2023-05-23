const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const port = 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    credentials: true,
  },
});

const listKeyJoinRoom = [];
io.on("connection", (socket) => {
  socket.on("join_room", (value) => {
    listKeyJoinRoom.push(value);
    socket.join(value);

    socket.emit("message", "Welcome to chat room yourself");

    socket.broadcast.to(value).emit("joined", "same within room");
    io.to(value).emit("roomUsers", {
      room: value,
      users: "hi",
    });
  });
});

httpServer.listen(port, () => {
  console.log("server running " + port);
});
