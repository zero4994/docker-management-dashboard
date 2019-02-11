module.exports = docker => {
  return {
    Images: request => {
      return docker.listImages({ all: true }).then(images => {
        return images.map(image => {
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - image.Created;
          return {
            ...image,
            Created: new Date(timeDiff),
            Name: image.RepoTags[0]
          };
        });
      });
    },
    Containers: request => {
      return docker.listContainers({ all: true }).then(containers => {
        return containers.map(container => {
          return {
            ...container,
            Created: new Date(container.Created)
          };
        });
      });
    }
  };
};
