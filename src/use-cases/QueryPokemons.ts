import { PokemonRepository } from "../repositories/PokemonRepository";

export class QueryPokemons {
  private repository;

  constructor(repository: PokemonRepository) {
    this.repository = repository;
  }

  call() {
    return this.repository.findAll();
  }
}
