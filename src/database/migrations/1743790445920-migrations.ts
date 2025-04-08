import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1743790445920 implements MigrationInterface {
    name = 'Migrations1743790445920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 16:58:33.638009+00'`);
    }

}
