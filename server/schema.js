module.exports = {
  schema: `
    scalar Date

    type Image {
        Created: Date
        Name: String
        Id: String
    }

    type Port {
        IP: String
        PrivatePort: Int
        PublicPort: Int
        Type: String
    }

    type Container {
        Created: Date
        Image: String
        Id: String
        Command: String
        State: String
        Status: String
        Ports: [Port]
    }
    
    type Query {
        Images: [Image]
        Containers: [Container]
        CreateContainer(name: String): String
    }
    `
};
