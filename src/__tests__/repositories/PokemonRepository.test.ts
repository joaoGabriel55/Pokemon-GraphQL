import { PokemonRepository } from "../../repositories/PokemonRepository";

describe("PokemonRepository", () => {
  it("create new pokemon", async () => {
    const result = await new PokemonRepository().create({
      name: "Pikachu",
      priceCents: 300,
      type: ["electric"],
      stats: {
        atk: 3,
      },
    });

    expect(result).toEqual({
      id: 1,
      name: "Pikachu",
      priceCents: 300,
      stats: {
        atk: 3,
      },
      type: ["electric"],
    });
  });
});
