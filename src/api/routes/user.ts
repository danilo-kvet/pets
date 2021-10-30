import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entities";
import UserController from "../controllers/user";

export default function () {
  const repository = getRepository(User);
  const controller = new UserController(repository);
  const router = Router();

  router.post("/register", controller.create.bind(controller));
  router.get("/list", controller.list.bind(controller));

  return router;
}
