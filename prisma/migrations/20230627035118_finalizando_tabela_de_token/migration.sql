/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Token";

-- CreateTable
CREATE TABLE "tb_token" (
    "id" TEXT NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,

    CONSTRAINT "tb_token_pkey" PRIMARY KEY ("id")
);
