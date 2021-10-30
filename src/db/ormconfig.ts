import { ConnectionOptions } from "typeorm";

export default {
  type: "sqlite",
  database: `database.sqlite`,
  entities: [`src/db/entities/*.ts`],
  synchronize: false,
  migrations: [`src/db/migrations/*.js`],
  cli: {
    entitiesDir: "src/db/entities",
    migrationsDir: "src/db/migrations",
  },
} as ConnectionOptions;
