const { docker } = require("../config");
const axios = require("axios");

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

const getContainerLogs = async (id, lastUpdateTime) => {
  console.log(`Getting logs for container with id ${id}`);
  try {
    const { data } = await getLogsRaw(id, lastUpdateTime);
    //return JSON.parse(JSON.stringify(data.data));
    return String(data);
  } catch (error) {
    //console.error(error);
  }
};

const getLogsRaw = (id, lastUpdateTime) => {
  const params = {
    follow: false,
    stdout: true,
    stderr: true,
    since: lastUpdateTime
  };

  return axios({
    socketPath: "/var/run/docker.sock",
    url: `http:/v1.24/containers/${id}/logs`,
    params,
    method: "get",
    headers: {
      "Content-Type": "application/json"
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
