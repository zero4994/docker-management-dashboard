import axios from "axios";

export const allImages = () => {
  return axios({
    method: "get",
    url: "api/images",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
