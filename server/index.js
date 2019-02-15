const express = require("express");
const callback = require("./callbacks");
const morgan = require("morgan");

const initializeServer = () => {
  const app = express();
  app.use(morgan("combined"));

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

  app.delete("/api/containers/:id/stop", async (req, res) => {
    const containerId = req.params.id;
    const message = await callback.stopContainer(containerId);
    res.json(message);
  });

  app.post("/api/containers/create", express.json(), async (req, res) => {
    const container = req.body;
    const message = await callback.createContainer(container);
    res.json(message);
  });

  app.delete("/api/containers/:id/remove", async (req, res) => {
    const containerId = req.params.id;
    const message = await callback.removeContainer(containerId);
    res.json(message);
  });

  return app;
};

module.exports = initializeServer;
