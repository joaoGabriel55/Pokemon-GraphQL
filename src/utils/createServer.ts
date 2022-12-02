import { ApolloServer, BaseContext,  } from "@apollo/server";
import { loadTypeDefs } from "../type-defs";

export default async function createServer<T extends BaseContext>(resolvers: any, plugins?: any[]) {
  return new ApolloServer<T>({
    typeDefs: await loadTypeDefs,
    resolvers,
    plugins,
  });
}
