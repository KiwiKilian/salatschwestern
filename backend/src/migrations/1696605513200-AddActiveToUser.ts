import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveToUser1696605513200 implements MigrationInterface {
    name = 'AddActiveToUser1696605513200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    }

}
