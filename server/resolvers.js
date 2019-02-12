const { containerObjectParser } = require("./utils/container.js");

module.exports = docker => {
  return {
    Images: () => {
      return docker.listImages({ all: false }).then(images => {
        return images.map(image => {
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - image.Created;
          return {
            ...image,
            Created: new Date(timeDiff),
            Name: image.RepoTags[0]
          };
        });
      });
    },
    Containers: () => {
      return docker.listContainers({ all: true }).then(containers => {
        return containers.map(container => {
          return {
            ...container,
            Created: new Date(container.Created)
          };
        });
      });
    },
    CreateContainer: request => {
      const container = containerObjectParser(request.container);
      let containerId = "";
      return docker
        .createContainer(container)
        .then(container => {
          console.log("container created with id: ", container.id);
          containerId = container.id;
          return container.start();
        })
        .then(process => {
          return `Container created with id: ${process.id}`;
        })
        .catch(error => {
          console.log("===>Container id", containerId);
          console.error("Error:", error.json.message);
          return `Container created with id: ${containerId}
             
          Error: ${error.json.message}`;
        });
    },
    StopContainer: request => {
      console.log("request", request.id);
      const container = docker.getContainer(request.id);
      return container
        .stop()
        .then(data => {
          console.log("This is the data from the container", data);
          return `Container Stop process initiated`;
        })
        .catch(error => {
          console.error("Error=>", error);
          return error.reason;
        });
    }
  };
};
