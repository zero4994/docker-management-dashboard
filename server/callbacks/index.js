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

const stopContainer = id => {
  console.log(`Stopping container with id: ${id}...`);
  const container = docker.getContainer(id);
  return container
    .stop()
    .then(() => {
      return "Container Stop process initiated";
    })
    .catch(error => {
      console.log("Error=>", error);
      return `Error: ${error.reason}`;
    });
};

module.exports = { allImages, allContainers, stopContainer };
