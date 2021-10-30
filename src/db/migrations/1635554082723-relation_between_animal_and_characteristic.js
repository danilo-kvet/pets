const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class relationBetweenAnimalAndCharacteristic1635554082723 {
    name = 'relationBetweenAnimalAndCharacteristic1635554082723'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "animal_characteristic" ("animal_id" integer NOT NULL, "characteristic_id" integer NOT NULL, PRIMARY KEY ("animal_id", "characteristic_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14d7f928bb6e784be9534a34f1" ON "animal_characteristic" ("animal_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e365b39695ea8bc7b9c9111f2" ON "animal_characteristic" ("characteristic_id") `);
        await queryRunner.query(`DROP INDEX "IDX_14d7f928bb6e784be9534a34f1"`);
        await queryRunner.query(`DROP INDEX "IDX_0e365b39695ea8bc7b9c9111f2"`);
        await queryRunner.query(`CREATE TABLE "temporary_animal_characteristic" ("animal_id" integer NOT NULL, "characteristic_id" integer NOT NULL, CONSTRAINT "FK_14d7f928bb6e784be9534a34f13" FOREIGN KEY ("animal_id") REFERENCES "animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_0e365b39695ea8bc7b9c9111f2a" FOREIGN KEY ("characteristic_id") REFERENCES "characteristic" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("animal_id", "characteristic_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_animal_characteristic"("animal_id", "characteristic_id") SELECT "animal_id", "characteristic_id" FROM "animal_characteristic"`);
        await queryRunner.query(`DROP TABLE "animal_characteristic"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal_characteristic" RENAME TO "animal_characteristic"`);
        await queryRunner.query(`CREATE INDEX "IDX_14d7f928bb6e784be9534a34f1" ON "animal_characteristic" ("animal_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e365b39695ea8bc7b9c9111f2" ON "animal_characteristic" ("characteristic_id") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_0e365b39695ea8bc7b9c9111f2"`);
        await queryRunner.query(`DROP INDEX "IDX_14d7f928bb6e784be9534a34f1"`);
        await queryRunner.query(`ALTER TABLE "animal_characteristic" RENAME TO "temporary_animal_characteristic"`);
        await queryRunner.query(`CREATE TABLE "animal_characteristic" ("animal_id" integer NOT NULL, "characteristic_id" integer NOT NULL, PRIMARY KEY ("animal_id", "characteristic_id"))`);
        await queryRunner.query(`INSERT INTO "animal_characteristic"("animal_id", "characteristic_id") SELECT "animal_id", "characteristic_id" FROM "temporary_animal_characteristic"`);
        await queryRunner.query(`DROP TABLE "temporary_animal_characteristic"`);
        await queryRunner.query(`CREATE INDEX "IDX_0e365b39695ea8bc7b9c9111f2" ON "animal_characteristic" ("characteristic_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_14d7f928bb6e784be9534a34f1" ON "animal_characteristic" ("animal_id") `);
        await queryRunner.query(`DROP INDEX "IDX_0e365b39695ea8bc7b9c9111f2"`);
        await queryRunner.query(`DROP INDEX "IDX_14d7f928bb6e784be9534a34f1"`);
        await queryRunner.query(`DROP TABLE "animal_characteristic"`);
    }
}
