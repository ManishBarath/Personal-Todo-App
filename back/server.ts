import "reflect-metadata";
import express from 'express';
import { buildSchema } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import sequelize from "./database";
import { TodoResolver } from "./resolvers/Todoresolvers";
import { AuthResolver } from "./resolvers/Authresolver";

const app = express();

app.use(express.json());
// app.use(authMid);

const startserver = async () => {
  try {
    const schema = await buildSchema({
      resolvers: [TodoResolver, AuthResolver]
    });

    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req })
    });
    await server.start();
    server.applyMiddleware({ app:(app as any) });
    await sequelize.sync();
    app.listen(8000, () => {
      console.log("Listening on port 8000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startserver();
