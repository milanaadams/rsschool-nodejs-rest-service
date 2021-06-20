import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1624197568113 implements MigrationInterface {
    name = 'migration1624197568113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Columns" ("id" uuid DEFAULT uuid_generate_v4(), "title" character varying, "order" integer, "board_id" uuid, CONSTRAINT "PK_65e7b017ace71452304a69e4582" PRIMARY KEY ("id", "board_id"))`);
        await queryRunner.query(`CREATE TABLE "Boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "columns" character varying, CONSTRAINT "PK_5be7b56e2c14342b973e2569668" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" character varying, "boardId" character varying, "columnId" character varying, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Columns" ADD CONSTRAINT "FK_fe2085f3838b10dde0580243071" FOREIGN KEY ("board_id") REFERENCES "Boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Columns" DROP CONSTRAINT "FK_fe2085f3838b10dde0580243071"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Boards"`);
        await queryRunner.query(`DROP TABLE "Columns"`);
    }

}
