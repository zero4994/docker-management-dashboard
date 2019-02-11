const { docker } = require("./server/config");
const { schema: schemaDef } = require("./server/schema");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const root = require("./server/resolvers")(docker);
const app = express();

const schema = buildSchema(schemaDef);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.use(express.static(`${__dirname}/app`));
const port = 3000;

app.listen(port, () => {
  console.log(`Server is up an running on port ${port}`);
});
