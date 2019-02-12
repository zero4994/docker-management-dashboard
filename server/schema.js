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

    input InputBindPort {
        HostPort: String
    }

    input InputPort {
        name: String
        binding: [InputBindPort]
    }

    input InputPortBindings {
        port: [InputPort]
    }

    input InputHostConfig {
        PortBindings: InputPortBindings
    }

    input InputContainer {
        Image: String
        HostConfig: InputHostConfig
    }
    
    type Query {
        Images: [Image]
        Containers: [Container]
    }

    type Mutation {
        CreateContainer(container: InputContainer): String
        StopContainer(id: String!): String
        RemoveContainer(id: String!): String
    }
    `
};
