const Docker = require("dockerode");
const docker = new Docker({
  socketPath: "/var/run/docker.sock"
  //version: "v1.24"
});

module.exports = { docker };
