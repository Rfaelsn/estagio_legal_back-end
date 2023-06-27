-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);
