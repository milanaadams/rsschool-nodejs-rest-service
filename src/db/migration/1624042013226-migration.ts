import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1624042013226 implements MigrationInterface {
    name = 'migration1624042013226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "column_id" uuid NOT NULL, CONSTRAINT "PK_9e7ce5aa2a39756c62f3090dcc6" PRIMARY KEY ("id", "column_id"))`);
        await queryRunner.query(`CREATE TABLE "Boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "columns" character varying NOT NULL, CONSTRAINT "PK_5be7b56e2c14342b973e2569668" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" character varying NOT NULL, "boardId" character varying NOT NULL, "columnId" character varying NOT NULL, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Columns" ADD CONSTRAINT "FK_6e189834e5bbd186de2b995368f" FOREIGN KEY ("column_id") REFERENCES "Boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Columns" DROP CONSTRAINT "FK_6e189834e5bbd186de2b995368f"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
        await queryRunner.query(`DROP TABLE "Boards"`);
        await queryRunner.query(`DROP TABLE "Columns"`);
    }

}
