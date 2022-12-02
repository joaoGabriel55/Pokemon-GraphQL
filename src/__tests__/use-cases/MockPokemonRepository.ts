import { Pokemon } from "@prisma/client";
import { PokemonRepository } from "../../repositories/PokemonRepository";

export class MockPokemonRepository implements PokemonRepository {
  private pokemons: Pokemon[] = [];

  findAll(): Promise<Pokemon[]> {
    return Promise.resolve(this.pokemons);
  }

  findAllByCursor(
    after: number,
    before: number,
    pageSize: number
  ): Promise<Pokemon[]> {
    return Promise.resolve(this.pokemons.slice(0, pageSize));
  }

  findByStats(
    stat: "hp" | "spAtk" | "spDef" | "speed" | "total" | "attack" | "defense",
    sort: "gt" | "lt",
    value: string | number
  ): Promise<Pokemon[]> {
    throw new Error("Method not implemented.");
  }

  setPokemons(pokemons: Pokemon[]) {
    this.pokemons = pokemons;
  }
}
