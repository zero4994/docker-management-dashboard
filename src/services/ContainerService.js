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
