import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1686251730409 implements MigrationInterface {
  name = "Initial1686251730409";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_balance" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "amount" numeric(5,2) NOT NULL, "subject" character varying NOT NULL, CONSTRAINT "PK_bd893045760f719e24a95a42562" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_balance" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "amount" numeric(5,2) NOT NULL, "userId" uuid, CONSTRAINT "PK_f3edf5a1907e7b430421b9c2ddd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "grocery" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "amount" numeric(5,2) NOT NULL, "billingPeriodId" uuid, CONSTRAINT "PK_5d6e3f6a4ee62fe0379b6f94858" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "salad" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userId" uuid, "billingPeriodId" uuid, CONSTRAINT "PK_bdbdd624d8ce33a89aaa88452cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "billing_period" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "billingDate" date, "saladPrice" numeric(5,2) NOT NULL, CONSTRAINT "PK_676b9e853d3eb7e232d1de387c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_groceries_grocery" ("userId" uuid NOT NULL, "groceryId" uuid NOT NULL, CONSTRAINT "PK_6cdab291e308859f03e872a2206" PRIMARY KEY ("userId", "groceryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e73b0fb93b38f2f1c143cfe6c5" ON "user_groceries_grocery" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4628dace35d4cb283e7b16096f" ON "user_groceries_grocery" ("groceryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_balance" ADD CONSTRAINT "FK_4cac061e709256ecb43cc39d3f4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grocery" ADD CONSTRAINT "FK_3e984b3faa64df7d17e317b1735" FOREIGN KEY ("billingPeriodId") REFERENCES "billing_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "salad" ADD CONSTRAINT "FK_4d5294620799812710fb42c5a56" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "salad" ADD CONSTRAINT "FK_c97caa1a71c4f6c02b6ebfe0d60" FOREIGN KEY ("billingPeriodId") REFERENCES "billing_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groceries_grocery" ADD CONSTRAINT "FK_e73b0fb93b38f2f1c143cfe6c5f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groceries_grocery" ADD CONSTRAINT "FK_4628dace35d4cb283e7b16096f7" FOREIGN KEY ("groceryId") REFERENCES "grocery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_groceries_grocery" DROP CONSTRAINT "FK_4628dace35d4cb283e7b16096f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groceries_grocery" DROP CONSTRAINT "FK_e73b0fb93b38f2f1c143cfe6c5f"`,
    );
    await queryRunner.query(`ALTER TABLE "salad" DROP CONSTRAINT "FK_c97caa1a71c4f6c02b6ebfe0d60"`);
    await queryRunner.query(`ALTER TABLE "salad" DROP CONSTRAINT "FK_4d5294620799812710fb42c5a56"`);
    await queryRunner.query(
      `ALTER TABLE "grocery" DROP CONSTRAINT "FK_3e984b3faa64df7d17e317b1735"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_balance" DROP CONSTRAINT "FK_4cac061e709256ecb43cc39d3f4"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_4628dace35d4cb283e7b16096f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e73b0fb93b38f2f1c143cfe6c5"`);
    await queryRunner.query(`DROP TABLE "user_groceries_grocery"`);
    await queryRunner.query(`DROP TABLE "billing_period"`);
    await queryRunner.query(`DROP TABLE "salad"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "grocery"`);
    await queryRunner.query(`DROP TABLE "user_balance"`);
    await queryRunner.query(`DROP TABLE "account_balance"`);
  }
}
