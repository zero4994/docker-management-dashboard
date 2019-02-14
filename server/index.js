const express = require("express");
const callback = require("./callbacks");

const initializeServer = () => {
  const app = express();

  app.get("/api/images", async (req, res) => {
    const images = await callback.allImages();
    console.log(`Found ${images.length} images`);
    res.json(images);
  });

  app.get("/api/containers", async (req, res) => {
    const containers = await callback.allContainers();
    console.log(`Found ${containers.length} containers`);
    res.json(containers);
  });

  app.delete("/api/containers/:id", async (req, res) => {
    const containerId = req.params.id;
    const message = await callback.stopContainer(containerId);
    res.json(message);
  });

  return app;
};

module.exports = initializeServer;
