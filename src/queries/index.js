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
  return `{
       CreateContainer(name:"${image}")
    }`;
};

module.exports = { allImages, allContainers, runContainer };
