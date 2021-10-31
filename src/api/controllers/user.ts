import { User } from "../../db/entities";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this.repository.findOneOrFail({
        where: { username },
        select: ["password", "id"],
      });

      const isCorrectPassword = bcrypt.compareSync(password, user.password);

      if (!isCorrectPassword) {
        return res.status(401).send({ error: "Incorrect Password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET as string);

      return res.send({ token });
    } catch (ex) {
      return res.send(ex);
    }
  }
}
