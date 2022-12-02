import db from "../../db.json";
import prisma from "../../src/db/prisma-instance";

async function main() {
  const pokemons = db.map((pokemon) => ({
    name: pokemon.name,
    stats: pokemon.stats,
    priceCents: pokemon.price ? pokemon.price * 100 : 0,
    type: pokemon.type,
  }));

  const result = await prisma.pokemon.createMany({ data: pokemons });

  console.log({ result });
  console.log("database populated!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
