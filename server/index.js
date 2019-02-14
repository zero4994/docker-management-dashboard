const express = require("express");

const initializeServer = () => {
  const app = express();

  app.get("/images", (req, res) => {
    console.log("This are all the images");
    return res.sendStatus(200);
  });

  return app;
};

module.exports = initializeServer;
