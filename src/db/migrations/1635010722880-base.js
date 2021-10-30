const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class base1635010722880 {
    name = 'base1635010722880'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "is_superuser" boolean NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "scientific_name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "characteristic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "groupId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "groupId" integer, CONSTRAINT "FK_1579543be06f244b0eaa5cd91d1" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_animal"("id", "name", "genre", "age", "weight", "groupId") SELECT "id", "name", "genre", "age", "weight", "groupId" FROM "animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal" RENAME TO "animal"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "animal" RENAME TO "temporary_animal"`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "groupId" integer)`);
        await queryRunner.query(`INSERT INTO "animal"("id", "name", "genre", "age", "weight", "groupId") SELECT "id", "name", "genre", "age", "weight", "groupId" FROM "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TABLE "characteristic"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
