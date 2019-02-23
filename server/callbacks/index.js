const { docker } = require("../config");
const io = require("socket.io-client");

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

const getContainerById = id => {
  console.log(`Getting container with id ${id}...`);
  return docker.listContainers({ all: true }).then(container => {
    return container.filter(element => {
      return element.Id === id;
    });
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

const removeContainer = id => {
  console.log(`Removing container with id: ${id}..`);
  const container = docker.getContainer(id);
  return container
    .remove({ force: true })
    .then(() => {
      return `Container removed`;
    })
    .catch(error => {
      console.error("Error=>", error);
      return `Error: ${error.json.message}`;
    });
};

const createContainer = container => {
  console.log(`Creating container`);
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
};

const pauseContainer = id => {
  console.log(`Pausing container with id: ${id}..`);
  const container = docker.getContainer(id);
  return container
    .pause()
    .then(() => {
      return `Container paused`;
    })
    .catch(error => {
      console.error("Error=>", error);
      return `Error: ${error.json.message}`;
    });
};

const unpauseContainer = id => {
  console.log(`Unpausing container with id: ${id}..`);
  const container = docker.getContainer(id);
  return container
    .unpause()
    .then(() => {
      return `Container unpaused`;
    })
    .catch(error => {
      console.error("Error=>", error);
      return `Error: ${error.json.message}`;
    });
};

const inspectContainer = id => {
  console.log(`Inspecting container with id: ${id}`);
  const container = docker.getContainer(id);
  return container
    .inspect()
    .then(result => {
      console.log("Container found");
      return result;
    })
    .catch(error => {
      console.error("Error=>", error);
      return `Error: ${error.json.message}`;
    });
};

const getContainerStats = id => {
  console.log(`Getting stats for container with id ${id}`);
  const container = docker.getContainer(id);
  return container.stats({ stream: false }).then(stats => {
    return stats;
  });
};

const getContainerLogs = async id => {
  console.log("trying to start a socket");
  const socket = io.connect("http://localhost:3000");
  const container = docker.getContainer(id);
  container.logs({ follow: true, stdout: true, stderr: true }).then(stream => {
    readStream(stream, socket, id);
  });
};

const readStream = (stream, socket, id) => {
  var header = null;

  stream.on("readable", () => {
    header = header || stream.read(8);
    while (header !== null) {
      var payload = stream.read(header.readUInt32BE(4));
      if (payload === null) break;
      socket.emit("logs", {
        id,
        message: payload.toString("utf8")
      });
      header = stream.read(8);
    }
  });
};

module.exports = {
  allImages,
  allContainers,
  getContainerById,
  stopContainer,
  createContainer,
  removeContainer,
  pauseContainer,
  unpauseContainer,
  inspectContainer,
  getContainerStats,
  getContainerLogs
};
