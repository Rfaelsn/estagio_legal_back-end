-- CreateTable
CREATE TABLE "tb_users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "cpf" VARCHAR(127) NOT NULL,
    "rg" VARCHAR(127) NOT NULL,
    "academicRegistrationCode" VARCHAR(127),
    "birthDate" DATE NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "telephone" VARCHAR(127) NOT NULL,
    "courseStudy" VARCHAR(127),
    "password" VARCHAR(127) NOT NULL,
    "role" VARCHAR(127) NOT NULL,
    "UF" VARCHAR(127),
    "city" VARCHAR(127),
    "district" VARCHAR(127),
    "address" VARCHAR(127),
    "postalCode" VARCHAR(127),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_institution" TEXT,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "tb_users_cpf_key" ON "tb_users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_academicRegistrationCode_key" ON "tb_users"("academicRegistrationCode");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_internship_process_files_filePath_key" ON "tb_internship_process_files"("filePath");

-- CreateIndex
CREATE UNIQUE INDEX "tb_internshipProcess_id_termCommitment_key" ON "tb_internshipProcess"("id_termCommitment");

-- CreateIndex
CREATE INDEX "_ProcessHistoryFiles_B_index" ON "_ProcessHistoryFiles"("B");

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
