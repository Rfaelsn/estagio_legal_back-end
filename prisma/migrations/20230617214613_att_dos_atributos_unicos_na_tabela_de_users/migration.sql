/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricula]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `createdAt` on table `tb_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `tb_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tb_users" ALTER COLUMN "matricula" DROP NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_cpf_key" ON "tb_users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_matricula_key" ON "tb_users"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");
