/*
  Warnings:

  - You are about to drop the column `curso` on the `tb_users` table. All the data in the column will be lost.
  - You are about to drop the column `id_instituicao` on the `tb_users` table. All the data in the column will be lost.
  - You are about to drop the column `matricula` on the `tb_users` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `tb_users` table. All the data in the column will be lost.
  - You are about to drop the `tb_concedentes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_instituicao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_termo_compromisso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[academicRegistrationCode]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthDate` to the `tb_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `tb_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_termo_compromisso" DROP CONSTRAINT "tb_alunos";

-- DropForeignKey
ALTER TABLE "tb_termo_compromisso" DROP CONSTRAINT "tb_concedentes";

-- DropForeignKey
ALTER TABLE "tb_users" DROP CONSTRAINT "tb_instituicao";

-- DropIndex
DROP INDEX "tb_users_matricula_key";

-- AlterTable
ALTER TABLE "tb_users" DROP COLUMN "curso",
DROP COLUMN "id_instituicao",
DROP COLUMN "matricula",
DROP COLUMN "telefone",
ADD COLUMN     "UF" VARCHAR(127),
ADD COLUMN     "academicRegistrationCode" VARCHAR(127),
ADD COLUMN     "address" VARCHAR(127),
ADD COLUMN     "birthDate" DATE NOT NULL,
ADD COLUMN     "city" VARCHAR(127),
ADD COLUMN     "courseStudy" VARCHAR(127),
ADD COLUMN     "district" VARCHAR(127),
ADD COLUMN     "id_institution" TEXT,
ADD COLUMN     "postalCode" VARCHAR(127),
ADD COLUMN     "rg" VARCHAR(127) NOT NULL,
ADD COLUMN     "telephone" VARCHAR(127) NOT NULL;

-- DropTable
DROP TABLE "tb_concedentes";

-- DropTable
DROP TABLE "tb_instituicao";

-- DropTable
DROP TABLE "tb_termo_compromisso";

-- DropTable
DROP TABLE "tb_token";

-- CreateTable
CREATE TABLE "tb_notifications" (
    "id" TEXT NOT NULL,
    "id_user" TEXT,
    "userRole" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_internshipProcess" TEXT,

    CONSTRAINT "tb_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_internship_process_files" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" VARCHAR(255) NOT NULL,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tb_internship_process_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_institution" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "campus" VARCHAR(127) NOT NULL,
    "cnpj" VARCHAR(127) NOT NULL,
    "UF" VARCHAR(127) NOT NULL,
    "city" VARCHAR(127) NOT NULL,
    "district" VARCHAR(127) NOT NULL,
    "address" VARCHAR(127) NOT NULL,
    "telephone" VARCHAR(127) NOT NULL,
    "postalCode" VARCHAR(127) NOT NULL,
    "legalRepresentative" VARCHAR(127) NOT NULL,
    "legalRepresentativeRole" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_termCommitment" (
    "id" TEXT NOT NULL,
    "insurancePolicyNumber" VARCHAR(63),
    "insuranceCompanyName" VARCHAR(127),
    "advisorProfessor" VARCHAR(127),
    "siapeCode" VARCHAR(127),
    "internshipStartDate" DATE NOT NULL,
    "internshipEndDate" DATE NOT NULL,
    "internshipStartTime" TIME(0) NOT NULL,
    "internshipEndTime" TIME(0) NOT NULL,
    "weeklyWorkload" DOUBLE PRECISION NOT NULL,
    "isMandatory" BOOLEAN NOT NULL,
    "internshipGrant" DOUBLE PRECISION NOT NULL,
    "transportationAllowance" DOUBLE PRECISION NOT NULL,
    "internshipActivityPlan" TEXT NOT NULL,
    "grantingCompanyName" VARCHAR(127) NOT NULL,
    "grantingCompanyCNPJ" VARCHAR(14) NOT NULL,
    "grantingCompanyPostalCode" VARCHAR(63) NOT NULL,
    "grantingCompanyDistrict" VARCHAR(127) NOT NULL,
    "grantingCompanyCity" VARCHAR(127) NOT NULL,
    "grantingCompanyState" VARCHAR(127) NOT NULL,
    "grantingCompanyAddress" VARCHAR(127) NOT NULL,
    "grantingCompanyEmail" VARCHAR(127) NOT NULL,
    "grantingCompanyLegalRepresentative" VARCHAR(127) NOT NULL,
    "legalRepresentativeRole" VARCHAR(127) NOT NULL,
    "supervisor" VARCHAR(127) NOT NULL,
    "supervisorPosition" VARCHAR(127) NOT NULL,
    "filePath" VARCHAR(255),
    "id_user" TEXT NOT NULL,

    CONSTRAINT "tb_termCommitment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_internshipProcess" (
    "id" TEXT NOT NULL,
    "movement" VARCHAR(63) NOT NULL,
    "status" VARCHAR(127) NOT NULL,
    "startDateProcess" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDateProcess" TIMESTAMP(0),
    "id_termCommitment" TEXT,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "tb_internshipProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_internshipProcessStatusHistory" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(0),
    "status" VARCHAR(127) NOT NULL,
    "movement" VARCHAR(127) NOT NULL,
    "description" TEXT,
    "observations" TEXT,
    "idInternshipProcess" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_internshipProcessStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcessHistoryFiles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProcessHistoryFiles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_internship_process_files_filePath_key" ON "tb_internship_process_files"("filePath");

-- CreateIndex
CREATE UNIQUE INDEX "tb_internshipProcess_id_termCommitment_key" ON "tb_internshipProcess"("id_termCommitment");

-- CreateIndex
CREATE INDEX "_ProcessHistoryFiles_B_index" ON "_ProcessHistoryFiles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_academicRegistrationCode_key" ON "tb_users"("academicRegistrationCode");

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_institution" FOREIGN KEY ("id_institution") REFERENCES "tb_institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_notifications" ADD CONSTRAINT "tb_notifications_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_notifications" ADD CONSTRAINT "tb_notifications_id_internshipProcess_fkey" FOREIGN KEY ("id_internshipProcess") REFERENCES "tb_internshipProcess"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_termCommitment" ADD CONSTRAINT "tb_termCommitment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_internshipProcess" ADD CONSTRAINT "tb_internshipProcess_id_termCommitment_fkey" FOREIGN KEY ("id_termCommitment") REFERENCES "tb_termCommitment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_internshipProcess" ADD CONSTRAINT "tb_internshipProcess_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_internshipProcessStatusHistory" ADD CONSTRAINT "tb_internshipProcessStatusHistory_idInternshipProcess_fkey" FOREIGN KEY ("idInternshipProcess") REFERENCES "tb_internshipProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessHistoryFiles" ADD CONSTRAINT "_ProcessHistoryFiles_A_fkey" FOREIGN KEY ("A") REFERENCES "tb_internship_process_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessHistoryFiles" ADD CONSTRAINT "_ProcessHistoryFiles_B_fkey" FOREIGN KEY ("B") REFERENCES "tb_internshipProcessStatusHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
