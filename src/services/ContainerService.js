import axios from "axios";

export const allContainers = () => {
  return axios({
    method: "get",
    url: "api/containers",
    headers: {
      "Content-Type": "application/json"
    }
  });
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
