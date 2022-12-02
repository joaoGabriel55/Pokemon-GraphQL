import fastifyApollo, {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import Fastify from "fastify";
import { resolvers } from "./resolvers";
import { AuthContext } from "./types";
import createServer from "./utils/createServer";

const authContext: ApolloFastifyContextFunction<AuthContext> = async (
  request
) => {
  return {
    authorization: request.headers.authorization ?? false,
  };
};

const main = async () => {
  const fastify = Fastify();

  const server = await createServer<AuthContext>(resolvers, [
    fastifyApolloDrainPlugin(fastify),
  ]);

  await server.start();
  await fastify.register(fastifyApollo(server), {
    context: authContext,
  });
  await fastify.listen({ port: 8080 });

  console.log(`Graphql Server is ready!!!`);
};

main();
