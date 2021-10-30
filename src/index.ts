import config from "./db/ormconfig";
import app from "./app";
import { createConnection } from "typeorm";
import RoutesInitializator from "./api/routes";

const PORT = 3000;

async function run() {
  try {
    await createConnection(config);
    RoutesInitializator(app);
    app.listen(PORT, () => {
      console.log(`Running at http://localhost:${PORT}`);
    });
  } catch (ex) {
    console.log(ex);
  }
}

run();
