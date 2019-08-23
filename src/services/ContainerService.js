import axios from "axios";
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
  console.log(`fetching container: ${id}`);
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

export const pauseContainer = id => {
  return axios({
    method: "post",
    url: `/api/containers/${id}/pause`,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const unpauseContainer = id => {
  return axios({
    method: "post",
    url: `/api/containers/${id}/unpause`,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const inspectContainer = async function(id) {
  console.log(`Inspecting container with id: ${id}`);
  const container = await docker.getContainer(id);
  return await container.inspect();
};

export const getContainerLogs = (id, lastUpdateTime) => {
  return axios({
    method: "get",
    url: `/api/containers/${id}/logs`,
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      lastUpdateTime
    }
  });
};
