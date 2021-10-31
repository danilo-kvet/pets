import config from "./db/ormconfig";
import app from "./app";
import { createConnection } from "typeorm";
import RoutesInitializator from "./api/routes";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    await createConnection(config);
    RoutesInitializator(app);
    app.listen(process.env.PORT, () => {
      console.log(`Running at http://localhost:${process.env.PORT}`);
    });
  } catch (ex) {
    console.log(ex);
  }
}

run();
