import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntidadesBase1786990206744 implements MigrationInterface {
    name = 'CreateEntidadesBase1786990206744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."movimentacao_tipo_enum" AS ENUM('entrada', 'saida')`);
        await queryRunner.query(`CREATE TABLE "movimentacao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" "public"."movimentacao_tipo_enum" NOT NULL, "motivo" character varying(100), "quantidade" numeric NOT NULL, "registrado_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "loja_id" uuid, "produto_id" uuid, CONSTRAINT "PK_623863f0070f0cf47efcc0fb7c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo" character varying(50) NOT NULL, "nome" character varying(150) NOT NULL, "descricao" text, "unidade_medida" character varying(10) NOT NULL, "preco_venda" numeric NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "fornecedor_id" uuid, "loja_id" uuid, CONSTRAINT "UQ_a244b6d0eef318fac173e7c01e1" UNIQUE ("loja_id", "codigo"), CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fornecedor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(255) NOT NULL, "cnpj" character varying(18) NOT NULL, "telefone" character varying(20), "email" character varying(254), "criado_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "loja_id" uuid, CONSTRAINT "UQ_825a84042d130b4d3d7baacbaa8" UNIQUE ("loja_id", "email"), CONSTRAINT "UQ_9dd67ca3c63492e1847fd4a385c" UNIQUE ("loja_id", "cnpj"), CONSTRAINT "PK_5bff2d88b4e0ef84a6444b786a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."nota_fiscal_forma_pagamento_enum" AS ENUM('a_vista', 'a_prazo', 'cartao_credito', 'cartao_debito', 'boleto_bancario', 'transferencia_bancaria', 'pix')`);
        await queryRunner.query(`CREATE TYPE "public"."nota_fiscal_status_enum" AS ENUM('aberta', 'concluida', 'cancelada', 'pendente')`);
        await queryRunner.query(`CREATE TABLE "nota_fiscal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numero" character varying(20) NOT NULL, "natureza_operacao" character varying(50) NOT NULL, "forma_pagamento" "public"."nota_fiscal_forma_pagamento_enum" NOT NULL, "status" "public"."nota_fiscal_status_enum" NOT NULL, "valor_total" numeric NOT NULL, "consumidor_final" boolean NOT NULL DEFAULT true, "emitida_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "loja_id" uuid, "cliente_id" uuid, CONSTRAINT "UQ_5fc4cf2fdc78ce3b69eafd8aa18" UNIQUE ("loja_id", "numero"), CONSTRAINT "PK_f3fa78925a31acc82a8dd3a5031" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cliente_tipo_doc_enum" AS ENUM('cpf', 'cnpj')`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "tipo_doc" "public"."cliente_tipo_doc_enum", "doc" character varying(18), "email" character varying(254), "telefone" character varying(20), "criado_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "loja_id" uuid, CONSTRAINT "UQ_116105b153997814ba8cf043f13" UNIQUE ("loja_id", "doc"), CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_nota_fiscal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" numeric NOT NULL, "valor_unitario" numeric NOT NULL, "nota_fiscal_id" uuid, "produto_id" uuid, CONSTRAINT "PK_8287cd8f4c1a6bde9feee76af13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loja" ADD "telefone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "loja" ADD "email" character varying(254) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loja" ADD CONSTRAINT "UQ_8eb9cf24e5e5607c32709fb088f" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "loja" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "loja" ADD "criado_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "movimentacao" ADD CONSTRAINT "FK_8023ac9676497c8167f267ae333" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimentacao" ADD CONSTRAINT "FK_1c4a5c90d181bd2a753900e169f" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto" ADD CONSTRAINT "FK_3b8c0aa3f111916ce1f7ec3acc6" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto" ADD CONSTRAINT "FK_23bcebdcc57ea321c8cd6f53e08" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedor" ADD CONSTRAINT "FK_929e4e4b55b64d32929b597c4ea" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nota_fiscal" ADD CONSTRAINT "FK_9e2d96327097ec982d9d7fae1df" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nota_fiscal" ADD CONSTRAINT "FK_5ecff54a4722d3b2b8fd4a79ba5" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD CONSTRAINT "FK_6baae8a67f51f850ed13264d1ff" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_nota_fiscal" ADD CONSTRAINT "FK_b710db2603bce5747d925f001c9" FOREIGN KEY ("nota_fiscal_id") REFERENCES "nota_fiscal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_nota_fiscal" ADD CONSTRAINT "FK_a629ffd9de1807c0bb8966b3371" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_nota_fiscal" DROP CONSTRAINT "FK_a629ffd9de1807c0bb8966b3371"`);
        await queryRunner.query(`ALTER TABLE "item_nota_fiscal" DROP CONSTRAINT "FK_b710db2603bce5747d925f001c9"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "FK_6baae8a67f51f850ed13264d1ff"`);
        await queryRunner.query(`ALTER TABLE "nota_fiscal" DROP CONSTRAINT "FK_5ecff54a4722d3b2b8fd4a79ba5"`);
        await queryRunner.query(`ALTER TABLE "nota_fiscal" DROP CONSTRAINT "FK_9e2d96327097ec982d9d7fae1df"`);
        await queryRunner.query(`ALTER TABLE "fornecedor" DROP CONSTRAINT "FK_929e4e4b55b64d32929b597c4ea"`);
        await queryRunner.query(`ALTER TABLE "produto" DROP CONSTRAINT "FK_23bcebdcc57ea321c8cd6f53e08"`);
        await queryRunner.query(`ALTER TABLE "produto" DROP CONSTRAINT "FK_3b8c0aa3f111916ce1f7ec3acc6"`);
        await queryRunner.query(`ALTER TABLE "movimentacao" DROP CONSTRAINT "FK_1c4a5c90d181bd2a753900e169f"`);
        await queryRunner.query(`ALTER TABLE "movimentacao" DROP CONSTRAINT "FK_8023ac9676497c8167f267ae333"`);
        await queryRunner.query(`ALTER TABLE "loja" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "loja" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "loja" DROP CONSTRAINT "UQ_8eb9cf24e5e5607c32709fb088f"`);
        await queryRunner.query(`ALTER TABLE "loja" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "loja" DROP COLUMN "telefone"`);
        await queryRunner.query(`DROP TABLE "item_nota_fiscal"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TYPE "public"."cliente_tipo_doc_enum"`);
        await queryRunner.query(`DROP TABLE "nota_fiscal"`);
        await queryRunner.query(`DROP TYPE "public"."nota_fiscal_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."nota_fiscal_forma_pagamento_enum"`);
        await queryRunner.query(`DROP TABLE "fornecedor"`);
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "movimentacao"`);
        await queryRunner.query(`DROP TYPE "public"."movimentacao_tipo_enum"`);
    }

}
