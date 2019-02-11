module.exports = {
  schema: `
    scalar Date

    type Image {
        created_at: Date
        name: String
        id: String
    }
    
    type Query {
        Images: [Image]
    }
    `
};
