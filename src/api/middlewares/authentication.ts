import { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { User } from "../../db/entities";
import { getRepository } from "typeorm";

dotenv.config();

const passport = new Passport();

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (jtw_payload, done) {
      const repository = getRepository(User);
      const user = await repository.findOne(jtw_payload.id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    }
  )
);

export default passport;
