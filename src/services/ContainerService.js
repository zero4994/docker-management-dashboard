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
    const config = {
      text: error.toString(),
      title: "Error loading Containers"
    };
    this.$dialog.error(config);
  }
  return [];
};

export const containerById = id => {
  return axios({
    method: "get",
    url: `api/containers/${id}`,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const stopContainer = id => {
  return axios({
    method: "delete",
    url: `/api/containers/${id}/stop`,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const deleteContainer = id => {
  return axios({
    method: "delete",
    url: `/api/containers/${id}/remove`,
    headers: {
      "Content-Type": "application/json"
    }
  });
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

export const inspectContainer = id => {
  return axios({
    method: "get",
    url: `/api/containers/${id}/inspect`,
    headers: {
      "Content-Type": "application/json"
    }
  });
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
