import { NextFunction, Request, Response } from "express";
import { User } from "../../db/entities";

export async function superUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user as User;
  if (!user.is_superuser) {
    return res.status(403).send({ error: "Permission not satisfied." });
  }

  return next();
}
