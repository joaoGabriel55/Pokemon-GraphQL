import { Pokemon } from "@prisma/client";
import prisma from "../db/prisma-instance";
import { Repository } from "./Repository";

type Stats =
  | "hp"
  | "spAtk"
  | "spDef"
  | "speed"
  | "total"
  | "attack"
  | "defense";

export class PokemonRepository implements Repository<Pokemon> {
  create(pokemon: Omit<Pokemon, "id">): Promise<Pokemon> {
    return prisma.pokemon.create({
      data: {
        name: pokemon.name,
        priceCents: pokemon.priceCents,
        stats: pokemon.stats ?? {},
        type: pokemon.type,
      },
    });
  }

  findAll(): Promise<Pokemon[]> {
    return prisma.pokemon.findMany();
  }

  findAllByCursor(
    after: number,
    before: number,
    pageSize: number | null
  ): Promise<Pokemon[]> {
    let cursor = {};

    if (after && !before) cursor = { gt: after };
    if (!after && before) cursor = { lt: before };

    return prisma.pokemon.findMany({
      where: { id: cursor },
      ...(pageSize && { take: pageSize }),
    });
  }

  findByStats(
    stat: Stats,
    sort: "gt" | "lt",
    value: number | string
  ): Promise<Pokemon[]> {
    return prisma.pokemon.findMany({
      where: {
        stats: {
          path: [stat],
          ...(sort === "gt" ? { gt: value } : { lt: value }),
        },
      },
    });
  }
}
