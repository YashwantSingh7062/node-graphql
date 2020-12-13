const express = require("express");
require("dotenv").config();
require("./config/database");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema, rootValue } = require("./schema/schema");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, rootValue, graphiql: true }));

app.listen(PORT, () => console.log(`Now listening to port ${PORT}`));
