// @ts-nocheck
import { Animal, Characteristic, Group } from "../../db/entities";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import animalSchema from "../validators/animal";
import { AnimalPayload } from "../types/animal";
import redis from "redis";
import getRedisClient from "../../loaders/redis";
const { promisify } = require("util");
export default class AnimalController {
  animalRepository!: Repository<Animal>;
  groupRepository!: Repository<Group>;
  characteristicRepository!: Repository<Characteristic>;

  constructor(
    animalRepository: Repository<Animal>,
    groupRepository: Repository<Group>,
    characteristicRepository: Repository<Characteristic>
  ) {
    this.animalRepository = animalRepository;
    this.groupRepository = groupRepository;
    this.characteristicRepository = characteristicRepository;
  }

  async create(req: Request, res: Response) {
    try {
      const { group, characteristics, ...animal } = req.body as AnimalPayload;
      await animalSchema.validate(req.body, {
        abortEarly: false,
      });

      const animalInstance = this.animalRepository.create(animal) as Animal;
      let groupInstance = await this.groupRepository.findOne(group);

      if (!groupInstance) {
        groupInstance = this.groupRepository.create(group);
        await this.groupRepository.save(groupInstance);
      }

      const characteristicsInstances = await Promise.all(
        characteristics.map(async (characteristic) => {
          let characteristicInstance =
            await this.characteristicRepository.findOne(characteristic);

          if (!characteristicInstance) {
            characteristicInstance =
              this.characteristicRepository.create(characteristic);
            await this.characteristicRepository.save(characteristicInstance);
          }

          return characteristicInstance;
        })
      );

      animalInstance.characteristics = characteristicsInstances;
      animalInstance.group = groupInstance;
      await this.animalRepository.save(animalInstance);
      const animals = await this.animalRepository.find({
        relations: ["characteristics", "group"],
      });
      const redisClient = await getRedisClient();
      redisClient.set("animals", JSON.stringify(animals), redis.print);

      return res.send(animalInstance);
    } catch (ex) {
      return res.send(ex);
    }
  }

  async list(req: Request, res: Response) {
    try {
      const redisClient = await getRedisClient();
      const getAsync = promisify(redisClient.get).bind(redisClient);

      let animals = await getAsync("animals");

      if (!animals) {
        animals = await this.animalRepository.find({
          relations: ["characteristics", "group"],
        });
      }

      return res.send(animals);
    } catch (ex) {
      return res.send(ex);
    }
  }

  async retrieve(req: Request, res: Response) {
    const { animal_id } = req.params;

    try {
      const animal = await this.animalRepository.findOne(animal_id);

      if (!animal) {
        res.status(404).send({ error: "Not found" });
      }

      return res.send(animal);
    } catch (ex) {
      return res.send(ex);
    }
  }

  async update(req: Request, res: Response) {
    const { animal_id } = req.params;

    try {
      const animal = await this.animalRepository.findOne(animal_id);

      if (!animal) {
        res.status(404).send({ error: "Not found" });
      }

      const { group, characteristics, ...animalPayload } =
        req.body as AnimalPayload;

      const animalInstance = this.animalRepository.merge(
        animal,
        animalPayload
      ) as Animal;
      let groupInstance = await this.groupRepository.findOne(group);

      if (!groupInstance) {
        groupInstance = this.groupRepository.create(group);
        await this.groupRepository.save(groupInstance);
      }

      const characteristicsInstances = await Promise.all(
        characteristics.map(async (characteristic) => {
          let characteristicInstance =
            await this.characteristicRepository.findOne(characteristic);

          if (!characteristicInstance) {
            characteristicInstance =
              this.characteristicRepository.create(characteristic);
            await this.characteristicRepository.save(characteristicInstance);
          }

          return characteristicInstance;
        })
      );

      animalInstance.characteristics = characteristicsInstances;
      animalInstance.group = groupInstance;
      await this.animalRepository.save(animalInstance);

      return res.send(animalInstance);
    } catch (ex) {
      return res.send(ex);
    }
  }

  async delete(req: Request, res: Response) {
    const { animal_id } = req.params;

    try {
      const animal = await this.animalRepository.findOne(animal_id);

      if (!animal) {
        res.status(404).send({ error: "Not found" });
      }

      await this.animalRepository.remove(animal as Animal);

      return res.status(204).send("");
    } catch (ex) {
      return res.send(ex);
    }
  }
}
