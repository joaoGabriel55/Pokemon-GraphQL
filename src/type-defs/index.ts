import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { join } from "node:path";

export const loadTypeDefs = loadSchema(join(__dirname, "../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});
