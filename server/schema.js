module.exports = {
  schema: `
    type Container {
        name: String
        id: String
    }
    
    type Query {
        Containers: [Container]
    }
    `
};
