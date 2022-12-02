import prisma from "../../src/db/prisma-instance";

async function main() {
  const result = await prisma.pokemon.findMany({
    where: {
      stats: {
        path: ["hp"],
        gt: 50,
      },
    },
  });

 //  console.log({ result: result.map((r) => r.stats) });
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
