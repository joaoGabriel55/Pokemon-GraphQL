import { Pokemon } from "@prisma/client";
import { Repository } from "../repositories/Repository";
import { createResolvers } from "../resolvers";
import createServer from "../utils/createServer";

class PokemonMockRepository implements Repository<Pokemon> {
  findAll(): Promise<Pokemon[]> {
    return Promise.resolve([
      {
        id: 1,
        name: "Bulbasaur",
        priceCents: 0,
        type: ["grass", "poison"],
        stats: {
          total: 318,
          hp: 45,
          attack: 49,
          defense: 49,
          spAtk: 65,
          spDef: 65,
          speed: 45,
        },
      },
    ]);
  }
  findAllByCursor(
    after: number,
    before: number,
    pageSize: number
  ): Promise<Pokemon[]> {
    return Promise.resolve([]);
  }
  findByStats(): Promise<Pokemon[]> {
    return Promise.resolve([]);
  }
}

describe("GraphQL server", () => {
  describe("Queries", () => {
    describe("Pokemons", () => {
      it("returns all pokemons", async () => {
        const testServer = await createServer(
          createResolvers(new PokemonMockRepository())
        );

        const response = await testServer.executeOperation({
          query: "query Query { pokemons { name } }",
          variables: { name: "world" },
        });

        expect(response.body).toStrictEqual(
          expect.objectContaining({
            singleResult: { data: { pokemons: [{ name: "Bulbasaur" }] } },
          })
        );
      });
    });
  });
});
