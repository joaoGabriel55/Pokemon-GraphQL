import { QueryPokemons } from "../../use-cases/QueryPokemons";
import { MockPokemonRepository } from "../repositories/MockPokemonRepository";

describe("QueryPokemons", () => {
  it("Should list all pokemons", async () => {
    const pokemons = [
      {
        id: 2,
        name: "Pikachu",
        priceCents: 300,
        stats: {
          total: 2,
          hp: 2,
          attack: 2,
          defense: 2,
          spAtk: 2,
          spDef: 2,
          speed: 2,
        },
        type: ["fire"],
      },
      {
        id: 2,
        name: "Pikachu",
        priceCents: 300,
        stats: {
          total: 2,
          hp: 2,
          attack: 2,
          defense: 2,
          spAtk: 2,
          spDef: 2,
          speed: 2,
        },
        type: ["fire"],
      },
    ];

    const repository = new MockPokemonRepository();
    repository.setPokemons(pokemons);

    const result = await new QueryPokemons(repository).call();

    expect(result).toEqual(pokemons);
  });

  it("Retrieves empty pokemon list", async () => {
    const repository = new MockPokemonRepository();

    const result = await new QueryPokemons(repository).call();

    expect(result).toEqual([]);
  });
});
