const allImages = `{ 
                    Images {
                        Id
                        Name
                        Created
                    }
                }`;

const allContainers = `{
    Containers {
        Created
        Image
        Id
        Command
        State
        Status
        Ports {
            IP
            PrivatePort
            PublicPort
            Type
          }
    }
}`;

const runContainer = image => {
  let hostConfig = "";

  if (image.ContainerPort && image.HostPort) {
    hostConfig = `,
        HostConfig: {
            PortBindings: {
                port: {
                    name: "${image.ContainerPort}/tcp",
                    binding: {
                        HostPort: "${image.HostPort}"
                    }
                }
            }
        }`;
  }

  return `mutation {
       CreateContainer(container: { Image: "${image.Name}" ${hostConfig} })
    }`;
};

const stopContainer = id => {
  return `mutation {
        StopContainer(id: "${id}")
    }`;
};

module.exports = { allImages, allContainers, runContainer, stopContainer };
