const express = require("express");
const callback = require("./callbacks");

const initializeServer = () => {
  const app = express();

  app.get("/api/images", async (req, res) => {
    const images = await callback.allImages();
    res.json(images);
  });

  app.get("/api/containers", async (req, res) => {
    const containers = await callback.allContainers();
    res.json(containers);
  });

  return app;
};

module.exports = initializeServer;
