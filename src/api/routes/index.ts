import { Router, Express } from "express";
import userRoutesInitializator from "./user";
import animalRoutesInitializator from "./animal";
import passport from "../middlewares/authentication";

export default function initialize(app: Express) {
  const routes = Router();

  routes.use("/user", userRoutesInitializator());
  routes.use(
    "/api/animals",
    passport.authenticate("jwt", { session: false }),
    animalRoutesInitializator()
  );

  app.use(routes);
}
