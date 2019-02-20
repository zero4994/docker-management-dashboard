const express = require("express");
const app = require("./server")();
const path = require("path");
const socket = require("socket.io");

app.use(express.static(path.resolve(__dirname, ".", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, ".", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is up an running on port ${PORT}`);
});

const io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  socket.on("logs", data => {
    io.sockets.emit("logs", data);
  });
});
