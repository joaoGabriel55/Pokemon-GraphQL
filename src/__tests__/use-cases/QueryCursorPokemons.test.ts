import { QueryCursorPokemons } from "../../use-cases/QueryCursorPokemons";
import { MockPokemonRepository } from "../repositories/MockPokemonRepository";

describe("QueryCursorPokemons", () => {
  it("Should first 2 pokemons", async () => {
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
      {
        id: 4,
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
        id: 9,
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

    const result = await new QueryCursorPokemons(repository).call({
      after: 0,
      before: 0,
      pageSize: 2,
    });

    expect(result).toHaveLength(2);
    expect(result).toEqual(pokemons.slice(0, 2));
  });
});
