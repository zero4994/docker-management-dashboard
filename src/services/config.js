import Docker from "dockerode";

export const docker = new Docker({
  socketPath: "/var/run/docker.sock"
  //version: "v1.24"
});
