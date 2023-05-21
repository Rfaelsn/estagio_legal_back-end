-- CreateTable
CREATE TABLE "tb_alunos" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "cpf" VARCHAR(127) NOT NULL,
    "matricula" VARCHAR(127) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "telefone" VARCHAR(127) NOT NULL,
    "curso" VARCHAR(127) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_instituicao" BIGINT,

    CONSTRAINT "tb_alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_funcionarios" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "cpf" VARCHAR(127) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_instituicao" BIGINT,

    CONSTRAINT "tb_funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_instituicao" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "campus" VARCHAR(127) NOT NULL,
    "cnpj" VARCHAR(127) NOT NULL,
    "UF" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_concedentes" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "endereco" VARCHAR(127) NOT NULL,
    "cnpj" VARCHAR(127) NOT NULL,
    "cep" VARCHAR(127) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "telefone" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_concedentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_termo_compromisso" (
    "id" BIGSERIAL NOT NULL,
    "numApoliceSeguro" VARCHAR(63) NOT NULL,
    "nomeSeguradora" VARCHAR(127) NOT NULL,
    "profOrientador" VARCHAR(127) NOT NULL,
    "codSiape" VARCHAR(127) NOT NULL,
    "dataInicioEstagio" TIMESTAMP(0) NOT NULL,
    "dataFimEstagio" TIMESTAMP(0) NOT NULL,
    "horaInicioEstagio" TIMESTAMP(0) NOT NULL,
    "horaFimEstagio" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_aluno" BIGINT,
    "id_concedente" BIGINT,

    CONSTRAINT "tb_termo_compromisso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_alunos" ADD CONSTRAINT "tb_instituicao" FOREIGN KEY ("id_instituicao") REFERENCES "tb_instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_funcionarios" ADD CONSTRAINT "tb_instituicao" FOREIGN KEY ("id_instituicao") REFERENCES "tb_instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_termo_compromisso" ADD CONSTRAINT "tb_alunos" FOREIGN KEY ("id_aluno") REFERENCES "tb_alunos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_termo_compromisso" ADD CONSTRAINT "tb_concedentes" FOREIGN KEY ("id_concedente") REFERENCES "tb_concedentes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
