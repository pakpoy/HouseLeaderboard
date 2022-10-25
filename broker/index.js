const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*", credentials: true } });
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("missioncontrol", (data) => {
    console.log(data);
    socket.broadcast.emit("fromMissionControl", data)
  })
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
