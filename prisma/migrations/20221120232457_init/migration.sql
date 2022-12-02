-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "hstore";

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "stats" JSONB NOT NULL,
    "type" TEXT[],

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
