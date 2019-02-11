const Docker = require("dockerode");

module.exports = {
  Containers: request => {
    const docker = new Docker({
      socketPath: "/var/run/docker.sock",
      version: "v1.24"
    });
    return docker.listImages({ all: true }).then(containers => {
      console.log(containers[0]);
      return containers.map(container => {
        return {
          created: new Date(container.created),
          id: container.Id,
          name: container.RepoTags[0]
        };
      });
    });
  }
};
