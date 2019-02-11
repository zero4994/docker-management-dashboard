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
    },
    CreateContainer: request => {
      return docker
        .createContainer({
          Image: request.name,
          AttachStdin: false,
          AttachStdout: true,
          AttachStderr: true
        })
        .then(container => {
          console.log("container created with id: ", container.id);
          return container.start();
        })
        .then(process => {
          return process.id;
        })
        .catch(error => {
          console.error(error.json.message);
          return error.json.message;
        });
    }
  };
};
