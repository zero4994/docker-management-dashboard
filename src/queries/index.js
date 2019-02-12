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
  console.log(image);
  return `mutation {
       CreateContainer(container: { Image: "${image.Name}",
                                    HostConfig: {
                                        PortBindings: {
                                            port: {
                                                name: "${
                                                  image.ContainerPort
                                                }/tcp",
                                                binding: {
                                                    HostPort: "${
                                                      image.HostPort
                                                    }"
                                                }
                                            }
                                        }
                                    } })
    }`;
};

module.exports = { allImages, allContainers, runContainer };
