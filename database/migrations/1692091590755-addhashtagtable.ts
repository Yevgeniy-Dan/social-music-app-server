import { MigrationInterface, QueryRunner } from "typeorm";

export class Addhashtagtable1692091590755 implements MigrationInterface {
    name = 'Addhashtagtable1692091590755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hashtag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, CONSTRAINT "PK_cb36eb8af8412bfa978f1165d78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_hashtag" ("userId" uuid NOT NULL, "hashtagId" uuid NOT NULL, CONSTRAINT "PK_ee8db8f2beb388d787f599841ea" PRIMARY KEY ("userId", "hashtagId"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "musicGenres"`);
        await queryRunner.query(`ALTER TABLE "user_hashtag" ADD CONSTRAINT "FK_9f804a776c9444ec19d8fde9459" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_hashtag" ADD CONSTRAINT "FK_d8e54648f69e461e1530d888772" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_hashtag" DROP CONSTRAINT "FK_d8e54648f69e461e1530d888772"`);
        await queryRunner.query(`ALTER TABLE "user_hashtag" DROP CONSTRAINT "FK_9f804a776c9444ec19d8fde9459"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "musicGenres" character varying`);
        await queryRunner.query(`DROP TABLE "user_hashtag"`);
        await queryRunner.query(`DROP TABLE "hashtag"`);
    }

}
