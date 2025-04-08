import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1743860623421 implements MigrationInterface {
    name = 'Migrations1743860623421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "created_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "created_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "created_at" SET DEFAULT '2025-04-05 13:43:19.618628+00'`);
    }

}
