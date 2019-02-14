const { docker } = require("../config");

const allImages = () => {
  console.log("Querying all images...");
  return docker.listImages({ all: false }).then(images => {
    return images;
  });
};

const allContainers = () => {
  console.log("Querying all containers...");
  return docker.listContainers({ all: true }).then(containers => {
    return containers;
  });
};

module.exports = { allImages, allContainers };
