const express = require("express");
const callback = require("./callbacks");

const initializeServer = () => {
  const app = express();

  app.get("/api/images", async (req, res) => {
    const images = await callback.allImages();
    res.send(images);
  });

  return app;
};

module.exports = initializeServer;
