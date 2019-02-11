module.exports = docker => {
  return {
    Images: request => {
      return docker.listImages({ all: true }).then(containers => {
        return containers.map(container => {
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - container.Created;
          return {
            created_at: new Date(timeDiff),
            id: container.Id,
            name: container.RepoTags[0]
          };
        });
      });
    }
  };
};
