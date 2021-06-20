import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1624201816708 implements MigrationInterface {
    name = 'migration1624201816708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Columns" ("id" uuid DEFAULT uuid_generate_v4(), "title" character varying, "order" integer, "board_column" uuid, CONSTRAINT "PK_8d790543677f644f770ff91cb68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_5be7b56e2c14342b973e2569668" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer, "description" character varying NOT NULL, "userId" character varying, "boardId" character varying, "columnId" character varying, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Columns" ADD CONSTRAINT "FK_de40b39f36c897d592aae8cbed8" FOREIGN KEY ("board_column") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Columns" DROP CONSTRAINT "FK_de40b39f36c897d592aae8cbed8"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Boards"`);
        await queryRunner.query(`DROP TABLE "Columns"`);
    }

}
