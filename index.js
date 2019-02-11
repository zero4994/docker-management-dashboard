const { docker } = require("./server/config");
const { schema: schemaDef } = require("./server/schema");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const root = require("./server/resolvers")(docker);
const app = express();
const path = require("path");

const schema = buildSchema(schemaDef);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.use(express.static(path.resolve(__dirname, ".", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, ".", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up an running on port ${PORT}`);
});
