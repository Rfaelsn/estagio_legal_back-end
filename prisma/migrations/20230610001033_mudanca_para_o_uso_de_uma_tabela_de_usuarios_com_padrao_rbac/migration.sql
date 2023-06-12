/*
  Warnings:

  - You are about to drop the `tb_alunos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_funcionarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_alunos" DROP CONSTRAINT "tb_instituicao";

-- DropForeignKey
ALTER TABLE "tb_funcionarios" DROP CONSTRAINT "tb_instituicao";

-- DropForeignKey
ALTER TABLE "tb_termo_compromisso" DROP CONSTRAINT "tb_alunos";

-- DropTable
DROP TABLE "tb_alunos";

-- DropTable
DROP TABLE "tb_funcionarios";

-- CreateTable
CREATE TABLE "tb_users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "cpf" VARCHAR(127) NOT NULL,
    "matricula" VARCHAR(127) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "telefone" VARCHAR(127) NOT NULL,
    "curso" VARCHAR(127) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "role" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_instituicao" BIGINT,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_instituicao" FOREIGN KEY ("id_instituicao") REFERENCES "tb_instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_termo_compromisso" ADD CONSTRAINT "tb_alunos" FOREIGN KEY ("id_aluno") REFERENCES "tb_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
