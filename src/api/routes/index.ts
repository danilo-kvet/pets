import { Router, Express } from "express";
import userRoutesInitializator from "./user";

export default function initialize(app: Express) {
  const routes = Router();

  routes.use("/user", userRoutesInitializator());

  app.use(routes);
}
