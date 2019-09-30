import { docker } from "./config";

export const allContainers = async function() {
  try {
    console.log("Querying all containers...");
    const containers = await docker.listContainers({ all: true });
    console.debug("Containers: ", containers);
    return containers;
  } catch (error) {
    console.error(error);
    this.$dialog.message.error(error.toString(), { position: "top" });
  }
  return [];
};

export const createContainer = async function(options) {
  console.log(`Creating container`);
  const container = await docker.createContainer(options);
  const process = await container.start();

  return process.id;
};

export const containerById = async function(id) {
  console.debug(`fetching container: ${id}`);
  const containers = await docker.listContainers({ all: true });
  return containers.filter(element => element.Id === id);
};

export const stopContainer = async function(id) {
  console.log(`Stopping container with id: ${id}...`);
  const container = await docker.getContainer(id);
  const response = await container.stop();

  if (typeof respose !== "undefined") {
    throw new Error(response);
  }
};

export const deleteContainer = async function(id, force = true) {
  console.log(`Removing container with id: ${id}...`);
  const container = await docker.getContainer(id);
  const response = await container.remove({ force });

  if (typeof respose !== "undefined") {
    throw new Error(response);
  }
};

export const pauseContainer = async function(id) {
  console.log(`Pausing container with id: ${id}...`);
  const container = docker.getContainer(id);
  await container.pause();
};

export const unpauseContainer = async function(id) {
  console.log(`Unpausing container with id: ${id}`);
  const container = docker.getContainer(id);
  await container.unpause();
};

export const inspectContainer = async function(id) {
  console.log(`Inspecting container with id: ${id}`);
  const container = await docker.getContainer(id);
  return await container.inspect();
};

export const getContainerLogs = async function(id, setLogs) {
  console.log(`Fetching logs for container with id: ${id}`);
  const container = docker.getContainer(id);

  let stream = require("stream");
  let logStream = new stream.PassThrough();
  logStream.on("data", function(chunk) {
    setLogs(chunk.toString("utf8"));
  });

  let currentStream = await container.logs({
    follow: true,
    stdout: true,
    stderr: true
  });

  container.modem.demuxStream(currentStream, logStream, logStream);

  // stream.on("end", function() {
  //   logStream.end("en");
  // });
};

export const getContainersByStatus = async function() {
  console.debug("Querying all containers by status...");
  const containers = await docker.listContainers({ all: true });
  const status = {
    running: 0,
    paused: 0,
    exited: 0
  };
  for (let i = 0; i < containers.length; i++) {
    status[containers[i].State] += 1;
  }
  console.debug("Containers: ", containers);
  console.debug(status);
  return status;
};
