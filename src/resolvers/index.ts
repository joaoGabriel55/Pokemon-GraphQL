import { PokemonRepository } from "../repositories/PokemonRepository";
import { QueryCursorPokemons } from "../use-cases/QueryCursorPokemons";
import { QueryPokemons } from "../use-cases/QueryPokemons";
import { convertCursorToNodeId, convertNodeIdToCursor } from "./pagination";
import { randomUUID } from "crypto";
import { AuthContext } from "../types";

export const createResolvers = (repository: PokemonRepository) => ({
  Query: {
    viewer: (parent: unknown, args: unknown, context: AuthContext) => {
      if (context.authorization !== "token") throw Error("Invalid token");

      return {
        id: randomUUID(),
        userName: "Zeca",
        lastName: "Pagadinho",
      };
    },
    pokemons: () => {
      return new QueryPokemons(repository).call();
    },
    pokemonsCursor: async (
      _: any,
      args: { first: number; afterCursor: string; beforeCursor: string }
    ) => {
      let { first, afterCursor, beforeCursor } = args;

      const cursor = afterCursor ? afterCursor : beforeCursor;
      const queryCursor = new QueryCursorPokemons(repository);

      const result = await queryCursor.call({
        after: afterCursor ? Number(convertCursorToNodeId(afterCursor)) : 0,
        before: beforeCursor ? Number(convertCursorToNodeId(beforeCursor)) : 0,
        pageSize: first > 0 ? first + 1 : null,
      });

      const batch = result.slice(0, first);
      const lastItem = batch[batch.length - 1];
      const hasNextPage = Boolean(result[first]);
      const hasPreviousPage = Boolean(cursor);

      return {
        totalCount: batch.length,
        edges: batch.map((node) => ({
          node,
          cursor: convertNodeIdToCursor({ id: String(node.id) }),
        })),
        pageInfo: {
          ...(hasPreviousPage && {
            startCursor: convertNodeIdToCursor({ id: String(batch[0].id) }),
          }),
          ...(hasNextPage && {
            endCursor: convertNodeIdToCursor({ id: String(lastItem.id) }),
          }),
          hasPreviousPage,
          hasNextPage,
        },
      };
    },
  },
});

export const resolvers = createResolvers(new PokemonRepository());
