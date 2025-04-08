import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1743792794664 implements MigrationInterface {
    name = 'Migrations1743792794664'

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
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "updated_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04 18:50:27.017167+00'`);
    }

}
