import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699916583648 implements MigrationInterface {
    name = 'Init1699916583648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, "image" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "content" text NOT NULL, "user_id" integer, "post_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "image" text NOT NULL, "category_id" integer, "user_id" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_tags" ("post_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_ab48f2c0184cd3367465effc5d3" PRIMARY KEY ("post_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a6b232c89aa1c442b7a6ef0211" ON "posts_tags" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a4f5ee04a91077ddb93526a60" ON "posts_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_a6b232c89aa1c442b7a6ef02110" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_0a4f5ee04a91077ddb93526a605" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_0a4f5ee04a91077ddb93526a605"`);
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_a6b232c89aa1c442b7a6ef02110"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a4f5ee04a91077ddb93526a60"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6b232c89aa1c442b7a6ef0211"`);
        await queryRunner.query(`DROP TABLE "posts_tags"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
