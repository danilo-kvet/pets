import { Router } from "express";
import { getRepository } from "typeorm";
import { Animal, Characteristic, Group } from "../../db/entities";
import { AnimalController } from "../controllers";
import { superUser } from "../middlewares/permission";

export default function () {
  const animalRepository = getRepository(Animal);
  const groupRepository = getRepository(Group);
  const characteristicRepository = getRepository(Characteristic);
  const controller = new AnimalController(
    animalRepository,
    groupRepository,
    characteristicRepository
  );
  const router = Router();

  router.post("/", superUser, controller.create.bind(controller));
  router.get("/", controller.list.bind(controller));
  router.get("/:animal_id", controller.retrieve.bind(controller));
  router.put("/:animal_id", superUser, controller.update.bind(controller));
  router.delete("/:animal_id", superUser, controller.delete.bind(controller));

  return router;
}
