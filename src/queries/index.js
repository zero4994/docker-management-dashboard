module.exports = {
  allImages: `{ 
                Images {
                    Id
                    Name
                    Created
                }
            }`,
  allContainers: `{
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
            }`
};
