// index.js
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 1) Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// 2) Real-time message handling
io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  socket.on("message", ({ username, text }) => {
    io.emit("message", {
      username,
      text,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected");
  });
});

// 3) Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
