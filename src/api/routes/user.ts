import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entities";
import { UserController } from "../controllers";
import passport from "../middlewares/authentication";
import { superUser } from "../middlewares/permission";

export default function () {
  const repository = getRepository(User);
  const controller = new UserController(repository);
  const router = Router();

  router.post("/register", controller.create.bind(controller));
  router.post("/login", controller.login.bind(controller));
  router.get(
    "/list",
    passport.authenticate("jwt", { session: false }),
    superUser,
    controller.list.bind(controller)
  );

  return router;
}
