import { User } from "../../db/entities";
import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";

export default class UserController {
  repository!: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async create(req: Request, res: Response) {
    try {
      const user = this.repository.create(req.body);
      await this.repository.save(user);

      const { password: removedPassword, ...payload } = user as unknown as User;

      return res.send(payload);
    } catch (ex) {
      return res.send(ex);
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await this.repository.find();

      return res.send(users);
    } catch (ex) {
      return res.send(ex);
    }
  }
}
