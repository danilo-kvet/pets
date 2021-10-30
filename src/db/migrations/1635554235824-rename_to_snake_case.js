const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class renameToSnakeCase1635554235824 {
    name = 'renameToSnakeCase1635554235824'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "groupId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_animal"("id", "name", "genre", "age", "weight", "groupId") SELECT "id", "name", "genre", "age", "weight", "groupId" FROM "animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal" RENAME TO "animal"`);
        await queryRunner.query(`CREATE TABLE "temporary_animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "group_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_animal"("id", "name", "genre", "age", "weight", "group_id") SELECT "id", "name", "genre", "age", "weight", "groupId" FROM "animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal" RENAME TO "animal"`);
        await queryRunner.query(`CREATE TABLE "temporary_animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "group_id" integer, CONSTRAINT "FK_4e0ccf4369d283a39645be1dfe5" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_animal"("id", "name", "genre", "age", "weight", "group_id") SELECT "id", "name", "genre", "age", "weight", "group_id" FROM "animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal" RENAME TO "animal"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "animal" RENAME TO "temporary_animal"`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "group_id" integer)`);
        await queryRunner.query(`INSERT INTO "animal"("id", "name", "genre", "age", "weight", "group_id") SELECT "id", "name", "genre", "age", "weight", "group_id" FROM "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "temporary_animal"`);
        await queryRunner.query(`ALTER TABLE "animal" RENAME TO "temporary_animal"`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "groupId" integer)`);
        await queryRunner.query(`INSERT INTO "animal"("id", "name", "genre", "age", "weight", "groupId") SELECT "id", "name", "genre", "age", "weight", "group_id" FROM "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "temporary_animal"`);
        await queryRunner.query(`ALTER TABLE "animal" RENAME TO "temporary_animal"`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "genre" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "groupId" integer, CONSTRAINT "FK_1579543be06f244b0eaa5cd91d1" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "animal"("id", "name", "genre", "age", "weight", "groupId") SELECT "id", "name", "genre", "age", "weight", "groupId" FROM "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "temporary_animal"`);
    }
}
