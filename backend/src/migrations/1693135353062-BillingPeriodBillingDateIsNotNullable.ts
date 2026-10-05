import { MigrationInterface, QueryRunner } from 'typeorm';

export class BillingPeriodBillingDateIsNotNullable1693135353062 implements MigrationInterface {
  name = 'BillingPeriodBillingDateIsNotNullable1693135353062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "billing_period" ALTER COLUMN "billingDate" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "billing_period" ALTER COLUMN "billingDate" DROP NOT NULL`);
  }
}
