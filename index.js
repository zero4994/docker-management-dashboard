//const { docker } = require("./server/config");
const express = require("express");
//const root = require("./server/resolvers")(docker);

const app = require("./server")();
const path = require("path");

app.use(express.static(path.resolve(__dirname, ".", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, ".", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up an running on port ${PORT}`);
});
