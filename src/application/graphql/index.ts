import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "@/application/graphql/schema";
import { resolvers } from "@/application/graphql/resolver";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT) || 3000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};
