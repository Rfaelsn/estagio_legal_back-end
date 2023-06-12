/*
  Warnings:

  - The primary key for the `tb_concedentes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_instituicao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_termo_compromisso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "tb_termo_compromisso" DROP CONSTRAINT "tb_alunos";

-- DropForeignKey
ALTER TABLE "tb_termo_compromisso" DROP CONSTRAINT "tb_concedentes";

-- DropForeignKey
ALTER TABLE "tb_users" DROP CONSTRAINT "tb_instituicao";

-- AlterTable
ALTER TABLE "tb_concedentes" DROP CONSTRAINT "tb_concedentes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tb_concedentes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tb_concedentes_id_seq";

-- AlterTable
ALTER TABLE "tb_instituicao" DROP CONSTRAINT "tb_instituicao_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tb_instituicao_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tb_instituicao_id_seq";

-- AlterTable
ALTER TABLE "tb_termo_compromisso" DROP CONSTRAINT "tb_termo_compromisso_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_aluno" SET DATA TYPE TEXT,
ALTER COLUMN "id_concedente" SET DATA TYPE TEXT,
ADD CONSTRAINT "tb_termo_compromisso_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tb_termo_compromisso_id_seq";

-- AlterTable
ALTER TABLE "tb_users" DROP CONSTRAINT "tb_users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "curso" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "id_instituicao" SET DATA TYPE TEXT,
ADD CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tb_users_id_seq";

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_instituicao" FOREIGN KEY ("id_instituicao") REFERENCES "tb_instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_termo_compromisso" ADD CONSTRAINT "tb_alunos" FOREIGN KEY ("id_aluno") REFERENCES "tb_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_termo_compromisso" ADD CONSTRAINT "tb_concedentes" FOREIGN KEY ("id_concedente") REFERENCES "tb_concedentes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
