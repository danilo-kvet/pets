import { Animal, Characteristic, Group, User } from "../../db/entities";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import animalSchema from "../validators/animal";

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
      await animalSchema.validate(req.body, {
        abortEarly: false,
      });

      const animal = this.animalRepository.create(req.body);
      await this.animalRepository.save(animal);

      return res.send(animal);
    } catch (ex) {
      return res.send(ex);
    }
  }

  async list(req: Request, res: Response) {
    try {
      const animals = await this.animalRepository.find();

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

      return res.send(animal);
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
