import { PokemonRepository } from "../repositories/PokemonRepository";

type CursorArgs = {
  after: number;
  before: number;
  pageSize: number | null;
};

export class QueryCursorPokemons {
  private repository;

  constructor(repository: PokemonRepository) {
    this.repository = repository;
  }

  call({ after, before, pageSize }: CursorArgs) {
    return this.repository.findAllByCursor(after, before, pageSize);
  }
}
