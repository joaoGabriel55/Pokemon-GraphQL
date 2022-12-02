import prisma from "../../src/db/prisma-instance";

async function main() {
  await prisma.pokemon.deleteMany({});
  console.log('database cleaned!')
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
